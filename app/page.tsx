import Image from "next/image";

import { components, installCommand } from "@/lib/components";
import { demos } from "@/lib/demos";
import { GITHUB_URL } from "@/lib/site";
import { FeaturedComponentCard } from "@/components/featured-component-card";
import { HeroActions } from "@/components/hero-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative w-full p-1.5 md:p-2.5">
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
        </section>

        <section
          aria-labelledby="featured-heading"
          className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-28 md:px-10 lg:py-32"
        >
          <div className="mb-14 sm:mb-16 text-center">
            <h2
              id="featured-heading"
              className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              Made one at a time.
            </h2>
            <p className="max-w-xl font-medium sm:text-lg text-center mx-auto mt-3 text-muted-foreground">
              A small collection of components, released when they are ready.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-12 lg:items-end">
            <FeaturedComponentCard
              item={components[0]}
              className="lg:col-span-7"
              previewClassName="lg:min-h-[34rem]"
            >
              {demos[components[0].name]}
            </FeaturedComponentCard>

            <FeaturedComponentCard
              item={components[1]}
              className="lg:col-span-5"
              previewClassName="lg:min-h-[27rem]"
            >
              {demos[components[1].name]}
            </FeaturedComponentCard>
          </div>
        </section>

        <section
          aria-labelledby="sponsors-heading"
          className="relative mx-1.5 mb-28 overflow-hidden rounded-[45px] px-5 py-28 sm:mx-2.5 sm:px-8 sm:py-32 md:px-10 lg:mb-36 lg:py-40"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="sponsors-heading"
                className="mt-5 text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
              >
                Support the project and showcase your brand.
              </h2>
            </div>

            <div className="mt-12 grid gap-2.5 sm:mt-20 md:grid-cols-3">
              {["01", "02", "03"].map((slot) => (
                <a
                  key={slot}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Sponsor Kiln UI, logo position ${slot}`}
                  className="group relative flex min-h-24 items-center justify-center overflow-hidden bg-foreground/10 px-8 text-sm text-foreground/70 transition-[border-color,background-color,color] sm:min-h-32 rounded-[28px] hover:bg-foreground/20 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                  style={{ cornerShape: "squircle" } as React.CSSProperties}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="text-lg font-light text-rose-400 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none">
                      +
                    </span>
                    Your logo here
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
