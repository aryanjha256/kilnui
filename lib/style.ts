import type { CSSProperties } from "react";

// cornerShape is missing from React's CSSProperties
export const squircle = { cornerShape: "squircle" } as CSSProperties;

export const panel =
  "rounded-[28px] border border-border/60 bg-card/60 shadow-sm backdrop-blur-md";

// recessed surface a demo sits on
export const stage = "bg-linear-to-b from-muted/40 to-background/60";
