"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Transition } from "motion/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { ComponentMeta } from "@/lib/components";
import { components } from "@/lib/components";
import type { Snippet } from "@/lib/highlight";
import { SITE_NAME } from "@/lib/site";
import { squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import { ComponentCode } from "@/components/component-code";
import { ComponentDetails } from "@/components/component-details";
import { PanelIcon } from "@/components/icons";

const RAIL = 300;
const DETAIL = RAIL * 2.5;
const GAP = 10;
const spring = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.8,
} as const;
// opening details moves both canvas edges at once, so it travels further and slower
const wide = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1,
} as const;
const instant = { duration: 0 } as const;
const CODE_DELAY = 0.22;

type Workspace = {
  detailsOpen: boolean;
  toggleDetails: () => void;
  codeOpen: boolean;
  toggleCode: () => void;
  hasCode: boolean;
};

const WorkspaceContext = React.createContext<Workspace | null>(null);

export function useWorkspace() {
  const workspace = React.useContext(WorkspaceContext);
  if (!workspace) throw new Error("useWorkspace needs a WorkspaceShell");
  return workspace;
}

export function WorkspaceShell({
  source,
  usage,
  dependencies,
  children,
}: {
  source?: Snippet | null;
  usage?: Snippet | null;
  dependencies?: string[];
  children: React.ReactNode;
}) {
  const [railOpen, setRailOpen] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [codeOpen, setCodeOpen] = React.useState(false);
  // the drawer waits for the column when both open at once
  const [codeDelayed, setCodeDelayed] = React.useState(false);
  const [coupled, setCoupled] = React.useState(false);
  const railWasOpen = React.useRef(true);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? instant : spring;
  const wideTransition = reduceMotion ? instant : wide;
  // both edges of the canvas move together, so they have to share one transition
  const railTransition = coupled ? wideTransition : transition;
  const pathname = usePathname();
  const meta = components.find((item) => item.href === pathname);

  const closeCode = React.useCallback(() => {
    setCodeOpen(false);
    setCodeDelayed(false);
  }, []);

  // the details column needs the rail's room, so it borrows it and gives it back
  const closeDetails = React.useCallback(() => {
    setDetailsOpen((open) => {
      if (open) {
        setCoupled(true);
        setRailOpen(railWasOpen.current);
      }
      return false;
    });
    closeCode();
  }, [closeCode]);

  const openDetails = React.useCallback(() => {
    railWasOpen.current = railOpen;
    setCoupled(true);
    setRailOpen(false);
    setDetailsOpen(true);
  }, [railOpen]);

  const toggleDetails = React.useCallback(() => {
    if (detailsOpen) closeDetails();
    else openDetails();
  }, [closeDetails, detailsOpen, openDetails]);

  // code rides inside the details column, so it opens that first
  const toggleCode = React.useCallback(() => {
    if (codeOpen) {
      closeCode();
      return;
    }
    setCodeDelayed(!detailsOpen);
    if (!detailsOpen) openDetails();
    setCodeOpen(true);
  }, [closeCode, codeOpen, detailsOpen, openDetails]);

  React.useEffect(() => {
    if (!drawerOpen && !detailsOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // innermost layer first
      if (codeOpen) {
        closeCode();
        return;
      }
      setDrawerOpen(false);
      closeDetails();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, detailsOpen, codeOpen, closeCode, closeDetails]);

  const workspace = React.useMemo(
    () => ({
      detailsOpen,
      toggleDetails,
      codeOpen,
      toggleCode,
      hasCode: Boolean(source),
    }),
    [detailsOpen, toggleDetails, codeOpen, toggleCode, source],
  );

  const toggleRail = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setCoupled(false);
      setRailOpen((open) => !open);
    } else {
      setDrawerOpen((open) => !open);
    }
  };

  return (
    <WorkspaceContext.Provider value={workspace}>
      <div className="flex h-svh w-full p-2.5">
        <AnimatePresence initial={false}>
          {railOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: RAIL + GAP, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={railTransition}
              className="hidden shrink-0 overflow-hidden lg:block"
            >
              <Rail
                id="rail"
                width={RAIL}
                onToggle={() => {
                  setCoupled(false);
                  setRailOpen(false);
                }}
              />
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
            )}
            style={squircle}
          >
            <PanelIcon className="size-4.5" />
          </motion.button>
          {children}
        </div>

        <AnimatePresence initial={false}>
          {detailsOpen && meta && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: DETAIL + GAP }}
              exit={{ width: 0 }}
              transition={wideTransition}
              className="hidden shrink-0 justify-end overflow-hidden xl:flex"
            >
              {/* shrink-0 keeps flex from squashing it, x slides it in as one block */}
              <motion.div
                initial={{ x: DETAIL }}
                animate={{ x: 0 }}
                exit={{ x: DETAIL }}
                transition={wideTransition}
                className="shrink-0"
              >
                <DetailRail
                  width={DETAIL}
                  meta={meta}
                  usage={usage}
                  dependencies={dependencies}
                  source={codeOpen ? source : null}
                  hasSource={Boolean(source)}
                  onViewSource={toggleCode}
                  codeDelay={codeDelayed ? CODE_DELAY : 0}
                  transition={transition}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {detailsOpen && meta && (
            <>
              <motion.button
                type="button"
                aria-label="Close details"
                onClick={closeDetails}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm xl:hidden"
              />
              <motion.div
                initial={{ x: "108%" }}
                animate={{ x: 0 }}
                exit={{ x: "108%" }}
                transition={transition}
                className="fixed inset-y-0 right-0 z-50 xl:hidden"
              >
                <DetailRail
                  width={DETAIL}
                  meta={meta}
                  usage={usage}
                  dependencies={dependencies}
                  source={codeOpen ? source : null}
                  hasSource={Boolean(source)}
                  onViewSource={toggleCode}
                  codeDelay={codeDelayed ? CODE_DELAY : 0}
                  transition={transition}
                  className="bg-background"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </WorkspaceContext.Provider>
  );
}

// sits straight on the workspace background, no panel of its own
function DetailRail({
  width,
  meta,
  usage,
  dependencies,
  source,
  hasSource,
  onViewSource,
  codeDelay,
  transition,
  className,
}: {
  width: number;
  meta: ComponentMeta;
  usage?: Snippet | null;
  dependencies?: string[];
  source?: Snippet | null;
  hasSource?: boolean;
  onViewSource?: () => void;
  codeDelay: number;
  transition: Transition;
  className?: string;
}) {
  return (
    <div
      // matches the drawer's corners so the clip never squares them off mid-slide
      style={{ width, borderRadius: 28, ...squircle }}
      className={cn(
        "relative flex h-full min-h-0 max-w-[100vw] flex-col overflow-hidden",
        className,
      )}
    >
      <ComponentDetails
        meta={meta}
        usage={usage}
        dependencies={dependencies}
        hasSource={hasSource}
        onViewSource={onViewSource}
      />

      <AnimatePresence>
        {source && (
          <motion.aside
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ...transition, delay: codeDelay }}
            style={{ borderRadius: 28, ...squircle }}
            aria-label={`${meta.title} source`}
            className="absolute inset-0 z-20 flex flex-col border border-border/60 bg-card/95 backdrop-blur-md"
          >
            <ComponentCode snippet={source} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
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

      <nav
        aria-label="Components"
        className="min-h-0 flex-1 overflow-y-auto px-3 pb-4"
      >
        <ul className="flex flex-col h-full justify-center">
          {components.map((item, index) => {
            const active = pathname === item.href;

            return (
              <React.Fragment key={item.name}>
                {index > 0 && (
                  <li aria-hidden="true" className="flex flex-col pl-2">
                    <span className="flex h-2.5 items-center">
                      <span className="h-0.5 w-8 rounded-full bg-card-foreground/60" />
                    </span>
                    <span className="flex h-2.5 items-center">
                      <span className="h-0.5 w-8 rounded-full bg-card-foreground/60" />
                    </span>
                  </li>
                )}
                <li>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex h-2.5 items-center gap-1 pr-3 pl-2 text-sm transition-colors",
                      active
                        ? "font-medium text-kiln"
                        : "text-muted-foreground hover:text-kiln",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="relative flex h-2.5 shrink-0 items-center"
                    >
                      <span
                        className={cn(
                          "h-0.5 rounded-full bg-card-foreground/60 transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none",
                          active
                            ? "w-14"
                            : "w-8 group-hover:w-14 group-hover:bg-kiln",
                        )}
                      />
                      {active && (
                        <motion.span
                          layoutId={`${id}-marker`}
                          transition={reduceMotion ? instant : spring}
                          className="absolute left-0 h-0.5 w-14 rounded-full bg-kiln"
                        />
                      )}
                    </span>
                    <span className="whitespace-nowrap font-semibold text-lg leading-none tracking-tight">
                      {item.title}
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
