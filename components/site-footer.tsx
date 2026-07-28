import Image from "next/image";
import Link from "next/link";

import { GITHUB_URL, SITE_NAME, X_URL } from "@/lib/site";

const links = [
  { href: "/", label: "Home", external: false },
  { href: "/components", label: "Components", external: false },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: X_URL, label: "X", external: true },
];

export function SiteFooter() {
  return (
    <footer
      className="relative mx-1.5 mb-1.5 min-h-[42rem] overflow-hidden rounded-[45px] px-5 py-6 sm:mx-2.5 sm:mb-2.5 sm:min-h-[48rem] sm:px-8 sm:py-8 md:px-10 lg:min-h-[52rem]"
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="kiln-footer-gradient pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 58% at 14% 112%, rgb(244 63 94 / 0.95), transparent 72%), radial-gradient(ellipse 58% 52% at 58% 84%, rgb(159 18 57 / 0.78), transparent 74%), radial-gradient(ellipse 48% 46% at 96% 66%, rgb(76 5 25 / 0.72), transparent 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8vw] -bottom-[12vw] size-[min(42rem,55vw)] rounded-[30%] bg-kiln/20 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[calc(42rem-3rem)] max-w-7xl flex-col sm:min-h-[calc(48rem-4rem)] lg:min-h-[calc(52rem-4rem)]">
        <div className="flex flex-col gap-7 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2.5 rounded-md focus-visible:ring-[3px] focus-visible:ring-white/30 focus-visible:outline-none"
          >
            <Image src="/logo.svg" alt="" width={24} height={24} aria-hidden />
            <span className="text-sm font-semibold tracking-tight">
              {SITE_NAME}
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center py-16 sm:py-20">
          <p className="text-[clamp(3.35rem,12.5vw,11rem)] leading-[0.82] font-semibold tracking-tight">
            <span className="block">Crafted</span>
            <span className="block">with Care</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 pb-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE_NAME} &copy; 2026</p>
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="w-fit transition-colors"
          >
            Built by @aryaninsync
          </a>
        </div>
      </div>
    </footer>
  );
}
