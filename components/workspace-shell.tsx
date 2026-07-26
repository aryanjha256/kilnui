"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { components } from "@/lib/components";
import { SITE_NAME } from "@/lib/site";
import { squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import { PanelIcon } from "@/components/icons";

const RAIL = 272;
const PAD = 10;
const spring = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.8,
} as const;
const instant = { duration: 0 } as const;

type Workspace = {
  expanded: boolean;
  toggleExpanded: () => void;
  reduceMotion: boolean | null;
};

const WorkspaceContext = React.createContext<Workspace | null>(null);

export function useWorkspace() {
  const workspace = React.useContext(WorkspaceContext);
  if (!workspace) throw new Error("useWorkspace needs a WorkspaceShell");
  return workspace;
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [railOpen, setRailOpen] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? instant : spring;

  React.useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const workspace = React.useMemo(
    () => ({
      expanded,
      toggleExpanded: () => setExpanded((value) => !value),
      reduceMotion,
    }),
    [expanded, reduceMotion],
  );

  const toggleRail = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setRailOpen((open) => !open);
    } else {
      setDrawerOpen((open) => !open);
    }
  };

  return (
    <WorkspaceContext.Provider value={workspace}>
      <motion.div
        animate={{ padding: expanded ? 0 : PAD }}
        transition={transition}
        className="flex h-svh w-full gap-2.5"
      >
        <AnimatePresence initial={false}>
          {railOpen && !expanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: RAIL, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={transition}
              className="hidden shrink-0 overflow-hidden lg:block"
            >
              <Rail id="rail" width={RAIL} onToggle={() => setRailOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close component list"
                onClick={() => setDrawerOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
              />
              <motion.div
                initial={{ x: "-108%" }}
                animate={{ x: 0 }}
                exit={{ x: "-108%" }}
                transition={transition}
                className="fixed inset-y-2.5 left-2.5 z-50 lg:hidden"
              >
                <Rail
                  id="drawer"
                  width={RAIL}
                  onNavigate={() => setDrawerOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="relative min-w-0 flex-1">
          <motion.button
            type="button"
            onClick={toggleRail}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            aria-label="Show component list"
            className={cn(
              "absolute top-4 left-4 z-30 inline-flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
              railOpen && "lg:hidden",
              expanded && "hidden",
            )}
            style={squircle}
          >
            <PanelIcon className="size-4.5" />
          </motion.button>
          {children}
        </div>
      </motion.div>
    </WorkspaceContext.Provider>
  );
}

function Rail({
  id,
  width,
  onToggle,
  onNavigate,
}: {
  id: string;
  width: number;
  onToggle?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <div
      style={{ width, ...squircle }}
      className="flex h-full flex-col rounded-[28px] border border-border/60 bg-card/60 shadow-sm backdrop-blur-md"
    >
      <div className="flex items-center gap-2 px-4 pt-4">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Hide component list"
          className="hidden size-10 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none lg:inline-flex"
          style={squircle}
        >
          <PanelIcon className="size-4.5" />
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1 text-sm font-semibold tracking-tight"
        >
          <Image src="/logo.svg" alt="" width={18} height={18} aria-hidden />
          {SITE_NAME}
        </Link>
      </div>

      <p className="px-6 pt-7 pb-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Components
      </p>

      <nav
        aria-label="Components"
        className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
      >
        <ul className="flex flex-col">
          {components.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative flex size-1.5 shrink-0 items-center justify-center">
                    {active && (
                      <motion.span
                        layoutId={`${id}-marker`}
                        transition={reduceMotion ? instant : spring}
                        className="absolute size-1.5 rounded-full bg-rose-600 dark:bg-rose-500"
                      />
                    )}
                  </span>
                  <span className="truncate">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
