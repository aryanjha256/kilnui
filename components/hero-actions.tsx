"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { InstallCommand } from "@/components/install-command";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroActions({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease }}
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-col items-stretch gap-2.5 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="peer/install min-w-0 flex-1">
        <InstallCommand command={command} className="w-full" />
      </div>

      <Link
        href="/components"
        className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-rose-700 px-6 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-[padding,background-color] duration-300 ease-out hover:px-10 peer-hover/install:px-4 focus-visible:ring-[3px] focus-visible:ring-rose-700/40 focus-visible:outline-none motion-reduce:transition-none"
      >
        See them live
      </Link>
    </motion.div>
  );
}
