"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/admin/FileUpload";

export type ExperienceFormData = {
  title: string;
  role: string;
  location: string;
  dateRange: string;
  information: string;
  logoUrl: string;
  displayOrder: string;
};

const emptyForm: ExperienceFormData = {
  title: "",
  role: "",
  location: "",
  dateRange: "",
  information: "",
  logoUrl: "",
  displayOrder: "0",
};

type Props = {
  initial?: Partial<ExperienceFormData>;
  experienceId?: number;
};

export default function ExperienceForm({ initial, experienceId }: Props) {
  const [form, setForm] = useState<ExperienceFormData>({
    ...emptyForm,
    ...initial,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const router = useRouter();

  function set(field: keyof ExperienceFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const payload = {
      title: form.title,
      role: form.role,
      location: form.location,
      dateRange: form.dateRange,
      information: form.information
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      logoUrl: form.logoUrl,
      displayOrder: Number(form.displayOrder) || 0,
    };

    const url = experienceId
      ? `/api/experience/${experienceId}`
      : "/api/experience";
    const method = experienceId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("saved");
      setTimeout(() => router.push("/admin/experience"), 800);
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company / Title"
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
          label="Location"
          value={form.location}
          onChange={(v) => set("location", v)}
        />
        <Field
          label="Date Range"
          value={form.dateRange}
          onChange={(v) => set("dateRange", v)}
          placeholder="Jan 2025 – Present"
        />
      </div>

      <Field
        label="Bullet Points (one per line)"
        value={form.information}
        onChange={(v) => set("information", v)}
        multiline
        required
        placeholder={
          "Accomplished X by doing Y, resulting in Z\nAnother achievement here"
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FileUpload
          label="Company Logo"
          accept="image/*"
          currentUrl={form.logoUrl}
          onUploaded={(url) => set("logoUrl", url)}
        />
        <Field
          label="Display Order"
          value={form.displayOrder}
          onChange={(v) => set("displayOrder", v)}
          placeholder="0"
        />
      </div>

      {form.logoUrl && (
        <div className="flex justify-center">
          <Image
            src={form.logoUrl}
            alt={form.title || "logo preview"}
            width={100}
            height={100}
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
            : experienceId
              ? "Update Experience"
              : "Create Experience"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experience")}
          className="rounded-lg border border-neutral-800 px-5 py-2.5 text-sm text-gray-400 transition-colors hover:border-neutral-700 hover:text-white"
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
