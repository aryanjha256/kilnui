"use client";

import * as React from "react";

import type { PackageManager } from "@/lib/components";
import { installCommand, packageManagers } from "@/lib/components";
import { squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

export function InstallTabs({ name }: { name: string }) {
  const [manager, setManager] = React.useState<PackageManager>("npm");
  const command = installCommand(name, manager);

  return (
    <>
      <div className="flex flex-wrap items-center gap-1">
        {packageManagers.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setManager(item)}
            aria-pressed={item === manager}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-xs transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
              item === manager
                ? "bg-kiln/10 text-kiln"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        style={squircle}
        className="mt-3 flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/40 py-2 pr-2 pl-4"
      >
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">
          {command}
        </code>
        <CopyButton value={command} label="Copy install command" />
      </div>
    </>
  );
}
