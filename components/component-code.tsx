"use client";

import * as React from "react";

import type { Snippet } from "@/lib/highlight";
import { eyebrow, squircle } from "@/lib/style";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function ComponentCode({ snippet }: { snippet: Snippet }) {
  return (
    <>
      {/* pt clears the floating actions pinned to the window corner */}
      <div className="flex shrink-0 items-center justify-between px-6 pt-5 pb-3 xl:pt-20">
        <p className={eyebrow}>Source</p>
        <CopyButton code={snippet.code} label="Copy source" />
      </div>

      <div
        className="min-h-0 flex-1 overflow-auto px-6 pt-2 pb-6 font-mono text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      />
    </>
  );
}

export function UsageBlock({ snippet }: { snippet: Snippet }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className={eyebrow}>Usage</h3>
        <CopyButton code={snippet.code} label="Copy usage example" />
      </div>

      <div
        style={squircle}
        className="mt-3 overflow-x-auto rounded-2xl border border-border/60 bg-muted/40 p-4 font-mono text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      />
    </>
  );
}

function CopyButton({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  );
}
