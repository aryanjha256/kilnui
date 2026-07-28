import Image from "next/image";
import Link from "next/link";

import { GITHUB_URL, SITE_NAME, X_URL } from "@/lib/site";

const links = [
  { href: "/components", label: "Components", external: false },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: X_URL, label: "X", external: true },
];

export function SiteFooter() {
  return (
    <footer className="px-5 pb-8 sm:px-8 md:px-10 md:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2.5 rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <Image src="/logo.svg" alt="" width={20} height={20} aria-hidden />
          <span className="text-sm font-semibold tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
