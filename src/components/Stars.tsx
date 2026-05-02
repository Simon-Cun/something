"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
};

export default function Stars() {
  const pathname = usePathname();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
      })),
    );
  }, []);

  if (pathname.startsWith("/admin") || stars.length === 0) return null;

  return (
    <>
      {stars.map(({ size, top, left, duration, id }) => (
        <div
          key={id}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animation: `twinkle ${duration}s infinite ease-in-out`,
          }}
        />
      ))}
    </>
  );
}
