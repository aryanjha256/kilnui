import type { Metadata } from "next";

import { components } from "@/lib/components";
import { demos } from "@/lib/demos";
import { SITE_KEYWORDS } from "@/lib/seo";
import { ComponentCard } from "@/components/component-card";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Components | Kiln UI",
  description:
    "Every component in the Kiln UI registry. Try the live demo, then install with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/components" },
};

export default function ComponentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 md:px-6 md:pt-40 md:pb-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-kiln"
            />
            {components.length} components
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Components you own, not dependencies.
          </h1>

          <p className="mt-4 max-w-xl text-pretty font-medium text-muted-foreground md:text-lg">
            Every component is a single file. Add it with the shadcn CLI, then
            change anything you like.{" "}
            <span className="text-kiln">
              [Every card runs the live component]
            </span>
          </p>
        </div>

        <div className="mt-14 grid gap-2.5 md:mt-16 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((item, index) => (
            <ComponentCard key={item.name} item={item} index={index}>
              {demos[item.name]}
            </ComponentCard>
          ))}
        </div>
      </main>
    </>
  );
}
