"use client";

import dynamic from "next/dynamic";

export const GlobalParticleBackground = dynamic(
  () => import("./GlobalParticleBackground").then((m) => ({ default: m.GlobalParticleBackground })),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
        }}
        aria-hidden
      />
    ),
  }
);
