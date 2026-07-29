"use client";

import * as React from "react";
import Image from "next/image";

import type { PackageManager } from "@/lib/components";
import { installCommand, packageManagers } from "@/lib/components";
import { squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";

// written out rather than built from the key, so tailwind can find the classes
const accent: Record<PackageManager, string> = {
  npm: "bg-pm-npm/10 text-pm-npm",
  pnpm: "bg-pm-pnpm/10 text-pm-pnpm",
  yarn: "bg-pm-yarn/10 text-pm-yarn",
  bun: "bg-pm-bun/10 text-pm-bun",
};

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
              "group inline-flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2 font-mono text-xs transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
              item === manager
                ? accent[item]
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Image
              src={`/assets/package-managers/${item}.svg`}
              alt=""
              width={14}
              height={14}
              unoptimized
              className={cn(
                "size-3.5 transition duration-200",
                // brand color only on the active tab, so the row stays calm
                item === manager
                  ? "grayscale-0 opacity-100"
                  : "opacity-60 grayscale group-hover:opacity-100",
              )}
            />
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
