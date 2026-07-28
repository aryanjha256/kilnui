"use client";

import type { Snippet } from "@/lib/highlight";
import { eyebrow, squircle } from "@/lib/style";
import { CopyButton } from "@/components/copy-button";

export function ComponentCode({ snippet }: { snippet: Snippet }) {
  return (
    <>
      {/* pt clears the floating actions pinned to the window corner */}
      <div className="flex shrink-0 items-center justify-between px-6 pt-5 pb-3 xl:pt-20">
        <p className={eyebrow}>Source</p>
        <CopyButton value={snippet.code} label="Copy source" />
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
    <div className="relative">
      <div
        style={squircle}
        className="overflow-x-auto rounded-2xl border border-border/60 bg-muted/40 p-4 pr-12 font-mono text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      />
      <CopyButton
        value={snippet.code}
        label="Copy usage example"
        className="absolute top-2 right-2 bg-background/60 backdrop-blur-md"
      />
    </div>
  );
}
