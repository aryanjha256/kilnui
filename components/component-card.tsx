"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import type { ComponentMeta } from "@/lib/components";
import { panel, squircle, stage } from "@/lib/style";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function ComponentCard({
  item,
  index,
  children,
}: {
  item: ComponentMeta;
  index: number;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease }}
      className={cn(
        panel,
        "group relative flex flex-col p-2 transition-colors hover:bg-card/80",
      )}
      style={squircle}
    >
      <div
        className={cn(
          stage,
          "flex h-56 items-center justify-center overflow-hidden rounded-[20px] border border-border/50 px-5",
        )}
        style={squircle}
      >
        <div inert className="pointer-events-none select-none">
          {children}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-3.5">
        <h2 className="min-w-0 truncate text-sm font-medium tracking-tight">
          <Link
            href={item.href}
            className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h2>
        <ArrowUpRightIcon
          className="size-4 shrink-0 text-kiln"
          strokeWidth={3}
        />
      </div>
    </motion.article>
  );
}
