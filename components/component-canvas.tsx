"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import type { ComponentMeta } from "@/lib/components";
import { squircle, stage } from "@/lib/style";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  CodeIcon,
  ContrastIcon,
  ExpandIcon,
  ShrinkIcon,
} from "@/components/icons";
import { useWorkspace } from "@/components/workspace-shell";

const ease = [0.22, 1, 0.36, 1] as const;

export function ComponentCanvas({
  meta,
  children,
}: {
  meta: ComponentMeta;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const { detailsOpen, toggleDetails, codeOpen, toggleCode, hasCode } =
    useWorkspace();

  return (
    <>
      {/* fixed to the window so no panel opening can shift it */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-0.5 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-md">
        <ToolButton
          label={detailsOpen ? "Hide details" : "Show details"}
          pressed={detailsOpen}
          onClick={toggleDetails}
          reduceMotion={reduceMotion}
        >
          {detailsOpen ? (
            <ShrinkIcon className="size-4" />
          ) : (
            <ExpandIcon className="size-4" />
          )}
        </ToolButton>
        {hasCode && (
          <ToolButton
            label={codeOpen ? "Hide code" : "Show code"}
            pressed={codeOpen}
            onClick={toggleCode}
            reduceMotion={reduceMotion}
          >
            <CodeIcon className="size-4" />
          </ToolButton>
        )}
        <ToolButton
          label="Toggle theme"
          onClick={toggleTheme}
          reduceMotion={reduceMotion}
        >
          <ContrastIcon className="size-4 transition-transform duration-300 ease-out dark:rotate-180 motion-reduce:transition-none" />
        </ToolButton>
      </div>

      <section
        style={{ borderRadius: 28, ...squircle }}
        className={cn(
          stage,
          "relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-border/60 px-6 py-20 backdrop-blur-md",
        )}
      >
        <h1 className="sr-only">{meta.title}</h1>

        {/* fixed width, so a resizing canvas moves this block without re-laying it out */}
        <div className="relative flex w-md max-w-full flex-col items-center gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="flex w-full flex-col items-center justify-center"
          >
            {children}
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12, ease }}
            className="max-w-md text-center text-sm text-muted-foreground"
          >
            {meta.description}
          </motion.p>
        </div>

      </section>
    </>
  );
}

function ToolButton({
  label,
  pressed,
  onClick,
  reduceMotion,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  reduceMotion: boolean | null;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        pressed
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
      )}
    >
      {children}
    </motion.button>
  );
}
