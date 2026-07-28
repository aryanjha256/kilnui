import Image from "next/image";

import { components, installCommand } from "@/lib/components";
import { HeroActions } from "@/components/hero-actions";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="relative w-full p-1.5 md:p-2.5">
      <SiteHeader />
      <div
        className="relative flex min-h-[calc(100svh-0.75rem)] w-full items-center justify-center overflow-hidden rounded-[45px] md:min-h-[calc(100svh-1.25rem)]"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        <Image
          src="/heroimage.webp"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          priority
          className="pointer-events-none absolute inset-0 size-full rounded-[inherit] object-cover"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-t from-background from-6% to-transparent" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 pb-32 pt-24 text-center sm:gap-4 sm:px-6">
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Beautiful Components, Crafted with Care.
          </h1>
          <p className="max-w-xl font-medium sm:text-lg">
            A curated collection of animated, production-ready components.
            Browse them live, then install with the shadcn CLI.
          </p>
          <HeroActions
            className="mt-6"
            command={installCommand(components[0].name)}
          />
        </div>
      </div>
    </main>
  );
}
