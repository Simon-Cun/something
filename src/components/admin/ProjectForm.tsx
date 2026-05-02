"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/admin/FileUpload";

export type ProjectFormData = {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  features: string;
  role: string;
  date: string;
  status: string;
  color: string;
  imageUrl: string;
  imageAlt: string;
  displayOrder: string;
};

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  demoUrl: "",
  features: "",
  role: "",
  date: "",
  status: "",
  color: "bg-gray-700/20",
  imageUrl: "",
  imageAlt: "",
  displayOrder: "0",
};

const colorOptions = [
  { label: "Orange", value: "bg-orange-200/20" },
  { label: "Indigo", value: "bg-indigo-200/20" },
  { label: "Sky", value: "bg-sky-100/20" },
  { label: "Purple", value: "bg-purple-200/20" },
  { label: "Pink", value: "bg-pink-200/20" },
  { label: "Rose", value: "bg-rose-200/20" },
  { label: "Fuchsia", value: "bg-fuchsia-200/20" },
  { label: "Gray", value: "bg-gray-700/20" },
];

type Props = {
  initial?: Partial<ProjectFormData>;
  projectId?: number;
};

export default function ProjectForm({ initial, projectId }: Props) {
  const [form, setForm] = useState<ProjectFormData>({
    ...emptyForm,
    ...initial,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const router = useRouter();

  function set(field: keyof ProjectFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const payload = {
      title: form.title,
      description: form.description,
      techStack: form.techStack
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl,
      demoUrl: form.demoUrl || null,
      features: form.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      role: form.role,
      date: form.date,
      status: form.status,
      color: form.color,
      imageUrl: form.imageUrl,
      imageAlt: form.imageAlt,
      displayOrder: Number(form.displayOrder) || 0,
    };

    const url = projectId ? `/api/projects/${projectId}` : "/api/projects";
    const method = projectId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("saved");
      setTimeout(() => router.push("/admin/projects"), 800);
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Title"
          value={form.title}
          onChange={(v) => set("title", v)}
          required
        />
        <Field
          label="Role"
          value={form.role}
          onChange={(v) => set("role", v)}
          required
        />
        <Field
          label="Date"
          value={form.date}
          onChange={(v) => set("date", v)}
          placeholder="e.g. Jan 2025"
        />
        <Field
          label="Status"
          value={form.status}
          onChange={(v) => set("status", v)}
          placeholder="e.g. Complete"
        />
      </div>

      <Field
        label="Description"
        value={form.description}
        onChange={(v) => set("description", v)}
        multiline
        required
      />

      <Field
        label="Tech Stack (one per line)"
        value={form.techStack}
        onChange={(v) => set("techStack", v)}
        multiline
        placeholder={"React\nNext.js\nTailwindCSS"}
      />

      <Field
        label="Features (one per line)"
        value={form.features}
        onChange={(v) => set("features", v)}
        multiline
        placeholder={"Feature one\nFeature two"}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="GitHub URL"
          value={form.githubUrl}
          onChange={(v) => set("githubUrl", v)}
          required
        />
        <Field
          label="Demo URL (optional)"
          value={form.demoUrl}
          onChange={(v) => set("demoUrl", v)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium tracking-wider text-gray-400 uppercase">
            Card Color
          </label>
          <select
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white focus:border-gray-500 focus:outline-none"
          >
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Display Order"
          value={form.displayOrder}
          onChange={(v) => set("displayOrder", v)}
          placeholder="0"
        />
      </div>

      <FileUpload
        label="Project Image"
        accept="image/*"
        currentUrl={form.imageUrl}
        onUploaded={(url) => set("imageUrl", url)}
      />
      <Field
        label="Image Alt Text"
        value={form.imageAlt}
        onChange={(v) => set("imageAlt", v)}
      />

      {form.imageUrl && (
        <div className="flex justify-center">
          <Image
            src={form.imageUrl}
            alt={form.imageAlt || "preview"}
            width={300}
            height={180}
            className="rounded-lg object-contain"
            unoptimized
          />
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-lg bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
        >
          {status === "saving"
            ? "Saving…"
            : projectId
              ? "Update Project"
              : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-lg border border-neutral-800 px-5 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-white"
        >
          Cancel
        </button>
        {status === "saved" && (
          <span className="text-sm text-emerald-400">Saved!</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">Save failed</span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wider text-gray-400 uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={cls}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
