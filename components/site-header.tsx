import Image from "next/image";
import Link from "next/link";

import { GITHUB_REPO, GITHUB_URL, SITE_NAME } from "@/lib/site";
import { GitHubIcon } from "@/components/icons";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

const pill =
  "inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 shadow-sm backdrop-blur-md transition-colors hover:bg-muted/70 sm:px-4";

async function getStars() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

function formatStars(count: number) {
  if (count < 1000) return String(count);
  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

export async function SiteHeader() {
  const stars = await getStars();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-2">
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
            {stars ? (
              <span className="hidden text-sm font-medium tabular-nums sm:inline">
                {formatStars(stars)}
              </span>
            ) : null}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
