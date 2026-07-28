import type { ReactNode } from "react";
import Link from "next/link";

import type { ComponentMeta } from "@/lib/components";
import { squircle, stage } from "@/lib/style";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/icons";

export function FeaturedComponentCard({
  item,
  children,
  className,
  previewClassName,
}: {
  item: ComponentMeta;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
}) {
  return (
    <article
      className={cn(
        "group rounded-[36px] border border-border/60 bg-card/60 p-2 shadow-sm backdrop-blur-md transition-colors hover:border-border",
        className,
      )}
      style={squircle}
    >
      <div
        className={cn(
          stage,
          "flex min-h-80 items-center justify-center overflow-hidden rounded-[30px] border border-border/50 px-6 sm:min-h-96",
          previewClassName,
        )}
        style={squircle}
      >
        {children}
      </div>

      <Link
        href={item.href}
        className="flex justify-between rounded-[28px] px-3 py-2 pt-4 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        <span className="text-lg font-semibold tracking-tight">
          {item.title}
        </span>
        <ArrowUpRightIcon
          className="size-5 shrink-0 text-kiln"
          strokeWidth={3}
        />
      </Link>
    </article>
  );
}
