"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Image from "next/image";
import FileUpload from "@/components/admin/FileUpload";

type HomeForm = {
  name: string;
  title: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  resumeUrl: string;
  profileImage: string;
};

const defaultForm: HomeForm = {
  name: "",
  title: "",
  bio: "",
  githubUrl: "",
  linkedinUrl: "",
  email: "",
  resumeUrl: "",
  profileImage: "",
};

export default function HomeAdminPage() {
  const [form, setForm] = useState<HomeForm>(defaultForm);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );

  useEffect(() => {
    fetch("/api/home")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name ?? "",
          title: data.title ?? "",
          bio: data.bio ?? "",
          githubUrl: data.githubUrl ?? "",
          linkedinUrl: data.linkedinUrl ?? "",
          email: data.email ?? "",
          resumeUrl: data.resumeUrl ?? "",
          profileImage: data.profileImage ?? "",
        });
      });
  }, []);

  function handleChange(field: keyof HomeForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="mb-1 text-2xl font-bold text-white">Home Content</h1>
        <p className="mb-8 text-sm text-gray-500">
          Edit the hero section of your portfolio
        </p>

        <form
          onSubmit={handleSave}
          className="mx-auto max-w-2xl space-y-5 rounded-xl border border-neutral-800 bg-neutral-950 p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            />
            <Field
              label="Title"
              value={form.title}
              onChange={(v) => handleChange("title", v)}
            />
          </div>

          <Field
            label="Bio"
            value={form.bio}
            onChange={(v) => handleChange("bio", v)}
            multiline
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="GitHub URL"
              value={form.githubUrl}
              onChange={(v) => handleChange("githubUrl", v)}
            />
            <Field
              label="LinkedIn URL"
              value={form.linkedinUrl}
              onChange={(v) => handleChange("linkedinUrl", v)}
            />
            <Field
              label="Email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />
            <FileUpload
              label="Resume (PDF)"
              accept=".pdf"
              currentUrl={form.resumeUrl}
              onUploaded={(url) => handleChange("resumeUrl", url)}
            />
          </div>

          <div>
            <FileUpload
              label="Profile Image"
              accept="image/*"
              currentUrl={form.profileImage}
              onUploaded={(url) => handleChange("profileImage", url)}
            />
            {form.profileImage && (
              <div className="mt-3 flex justify-center">
                <Image
                  src={form.profileImage}
                  alt="Profile preview"
                  width={120}
                  height={120}
                  className="rounded-xl object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "saving"}
              className="rounded-lg bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
            >
              {status === "saving" ? "Saving…" : "Save Changes"}
            </button>
            {status === "saved" && (
              <span className="text-sm text-emerald-400">Saved!</span>
            )}
            {status === "error" && (
              <span className="text-sm text-red-400">Save failed</span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
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
          rows={3}
          className={cls}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
