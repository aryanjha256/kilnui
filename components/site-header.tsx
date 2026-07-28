"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { GITHUB_REPO, GITHUB_URL, SITE_NAME } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

const pill =
  "inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 shadow-sm backdrop-blur-md transition-colors hover:bg-muted/70 sm:px-4";

function formatStars(count: number) {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

export function SiteHeader() {
  const [stars, setStars] = React.useState<number | null>(null);
  const [compact, setCompact] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (position) => {
    setCompact((current) => {
      if (position <= 0) return false;
      if (position > 8) return true;
      return current;
    });
  });

  React.useEffect(() => {
    let active = true;

    fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (active && typeof data?.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
      <motion.div
        initial={false}
        animate={{ maxWidth: compact ? 640 : 1152 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative mx-auto flex w-full items-center justify-between gap-2"
      >
        <Link href="/" className={pill} aria-label={`${SITE_NAME} home`}>
          <Image src="/logo.svg" alt="" width={18} height={18} aria-hidden />
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        <NavLinks className="md:absolute md:left-1/2 md:-translate-x-1/2" />

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={pill}
            aria-label={`${SITE_NAME} on GitHub`}
          >
            <GitHubIcon className="size-4.5" />
            {stars !== null ? (
              <span className="text-sm font-medium tabular-nums">
                {formatStars(stars)}
              </span>
            ) : null}
          </a>
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
