"use client";

import * as React from "react";

import { cn } from "@/registry/lib/utils";
import { usePrefersReducedMotion } from "@/registry/hooks/use-prefers-reduced-motion";

interface TextShimmerProps extends React.ComponentProps<"span"> {
  // seconds for one sweep
  duration?: number;
  // width of the bright band, scales with text length
  spread?: number;
}

export function TextShimmer({
  children,
  duration = 2,
  spread = 2,
  className,
  style,
  ...props
}: TextShimmerProps) {
  const reducedMotion = usePrefersReducedMotion();

  const band = React.useMemo(() => {
    const length = typeof children === "string" ? children.length : 6;
    return length * spread;
  }, [children, spread]);

  // static text when the user prefers reduced motion
  if (reducedMotion) {
    return (
      <span data-slot="text-shimmer" className={className} style={style} {...props}>
        {children}
      </span>
    );
  }

  return (
    <span
      data-slot="text-shimmer"
      className={cn("kiln-text-shimmer", className)}
      style={
        {
          "--kiln-shimmer-duration": `${duration}s`,
          "--kiln-shimmer-spread": `${band}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
