"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  );
}
