"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
  endpoint: string;
  label: string;
};

export default function DeleteButton({ id, endpoint, label }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="mr-1 text-xs text-gray-500">
          Delete &ldquo;{label.slice(0, 20)}&rdquo;?
        </span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md bg-red-600/20 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-600/30 disabled:opacity-50"
        >
          {loading ? "…" : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-white"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400"
    >
      Delete
    </button>
  );
}
