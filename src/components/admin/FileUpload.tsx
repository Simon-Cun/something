"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

type Props = {
  label: string;
  accept: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
};

export default function FileUpload({
  label,
  accept,
  currentUrl,
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      const { url } = await res.json();
      onUploaded(url);
    } else {
      setError("Upload failed");
    }

    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wider text-gray-400 uppercase">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => onUploaded(e.target.value)}
          placeholder="Paste a URL or upload a file"
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-neutral-800 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white disabled:opacity-50"
        >
          <Upload size={14} />
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
