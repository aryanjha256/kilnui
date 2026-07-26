"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function InstallCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-md border border-border bg-muted/40 px-4 py-3 font-mono text-sm",
        className,
      )}
    >
      <code className="truncate">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
