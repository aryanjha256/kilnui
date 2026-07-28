"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "@/components/icons";

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

  // the component name is interchangeable, so it reads dimmed
  const split = command.lastIndexOf("/");
  const head = command.slice(0, split + 1);
  const tail = command.slice(split + 1);

  return (
    <div
      className={cn(
        "flex h-12 items-center gap-2 rounded-full border border-border/60 bg-background/70 pr-2 pl-5 shadow-sm backdrop-blur-md",
        className,
      )}
    >
      <code className="min-w-0 flex-1 truncate font-mono text-sm">
        {head}
        <span className="text-muted-foreground">{tail}</span>
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
