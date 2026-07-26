"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", match: [] as string[] },
  { href: "/components", label: "Components", match: ["/components"] },
];

export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className={cn(
        "flex h-10 items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur-md",
        className,
      )}
    >
      {links.map((link) => {
        const active = link.match.length
          ? link.match.some((prefix) => pathname.startsWith(prefix))
          : pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
