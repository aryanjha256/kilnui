import type { CSSProperties } from "react";

// cornerShape is missing from React's CSSProperties
export const squircle = { cornerShape: "squircle" } as CSSProperties;

export const dotGrid: CSSProperties = {
  backgroundImage:
    "radial-gradient(color-mix(in oklch, var(--foreground) 14%, transparent) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

export const panel =
  "rounded-[28px] border border-border/60 bg-card/60 shadow-sm backdrop-blur-md";
