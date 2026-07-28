"use client";

import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ContrastIcon } from "@/components/icons";

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted/70 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <ContrastIcon className="size-4 transition-transform duration-300 ease-out dark:rotate-180 motion-reduce:transition-none" />
    </button>
  );
}
