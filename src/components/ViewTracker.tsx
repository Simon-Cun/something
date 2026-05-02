"use client";

import { useEffect } from "react";

export default function ViewTracker() {
  useEffect(() => {
    fetch("/api/track", { method: "POST" });
  }, []);

  return null;
}
