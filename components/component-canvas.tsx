"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { dotGrid, squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  CodeIcon,
  ContrastIcon,
  CopyIcon,
  ExpandIcon,
  ShrinkIcon,
} from "@/components/icons";
import { useWorkspace } from "@/components/workspace-shell";

const spring = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.9,
} as const;
const instant = { duration: 0 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function ComponentCanvas({
  title,
  caption,
  install,
  code,
  children,
}: {
  title: string;
  caption: string;
  install: string;
  code?: string | null;
  children: React.ReactNode;
}) {
  const { expanded, toggleExpanded, reduceMotion } = useWorkspace();
  const [showCode, setShowCode] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);
  const transition = reduceMotion ? instant : spring;

  const flipTheme = () => {
    const current =
      theme ??
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <motion.section
      initial={false}
      animate={{ borderRadius: expanded ? 0 : 28 }}
      transition={transition}
      style={{ borderRadius: 28, ...squircle }}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-border/60 bg-card/50 px-6 py-20 backdrop-blur-md",
        theme,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={dotGrid}
      />

      <h1 className="sr-only">{title}</h1>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-0.5 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-md">
        <ToolButton
          label={expanded ? "Exit full screen" : "Expand preview"}
          onClick={toggleExpanded}
          reduceMotion={reduceMotion}
        >
          {expanded ? (
            <ShrinkIcon className="size-4" />
          ) : (
            <ExpandIcon className="size-4" />
          )}
        </ToolButton>
        {code && (
          <ToolButton
            label={showCode ? "Hide code" : "Show code"}
            pressed={showCode}
            onClick={() => setShowCode((value) => !value)}
            reduceMotion={reduceMotion}
          >
            <CodeIcon className="size-4" />
          </ToolButton>
        )}
        <ToolButton
          label="Flip preview theme"
          onClick={flipTheme}
          reduceMotion={reduceMotion}
        >
          <ContrastIcon className="size-4" />
        </ToolButton>
      </div>

      <div className="relative flex w-full flex-col items-center gap-8">
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
          {caption}
        </motion.p>
      </div>

      <AnimatePresence>
        {showCode && code && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={transition}
            style={squircle}
            className="absolute inset-x-0 bottom-0 z-20 flex max-h-[70%] flex-col rounded-t-[28px] border-t border-border/60 bg-background/95 backdrop-blur-md"
          >
            <CodePanel install={install} code={code} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function CodePanel({ install, code }: { install: string; code: string }) {
  const [copied, setCopied] = React.useState<"install" | "code" | null>(null);

  const copy = async (value: string, key: "install" | "code") => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <div className="flex shrink-0 items-center gap-3 px-6 pt-5 pb-4">
        <code className="min-w-0 flex-1 truncate rounded-full border border-border/60 bg-muted/40 px-4 py-2 font-mono text-xs">
          {install}
        </code>
        <CopyButton
          copied={copied === "install"}
          onClick={() => copy(install, "install")}
          label="Copy install command"
        />
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-border/60 px-6 py-3">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Usage
        </p>
        <CopyButton
          copied={copied === "code"}
          onClick={() => copy(code, "code")}
          label="Copy example"
        />
      </div>

      <pre className="min-h-0 flex-1 overflow-auto px-6 pt-2 pb-6 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </>
  );
}

function CopyButton({
  copied,
  onClick,
  label,
}: {
  copied: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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
