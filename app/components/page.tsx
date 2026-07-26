import type { Metadata } from "next";
import Link from "next/link";

import { components, type ComponentMeta } from "@/lib/components";
import { demos } from "@/lib/demos";
import { SITE_KEYWORDS } from "@/lib/seo";
import { dotGrid, panel, squircle } from "@/lib/style";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Components | Kiln UI",
  description:
    "Every component in the Kiln UI registry. Browse the live demo, then install with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/components" },
};

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-2.5 px-1.5 pt-20 pb-1.5 md:gap-3 md:px-2.5 md:pt-24 md:pb-2.5">
      <SiteHeader />
      <div
        className={cn(panel, "px-6 py-7 md:px-9 md:py-9")}
        style={squircle}
      >
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Components
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Every component in the registry. Try the live demo, then install with
          the shadcn CLI.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {components.length} components
        </p>
      </div>

      <div className="grid gap-2.5 md:gap-3 lg:grid-cols-2">
        {components.map((item) => (
          <ComponentCard key={item.name} item={item} />
        ))}
      </div>
    </main>
  );
}

function ComponentCard({ item }: { item: ComponentMeta }) {
  return (
    <article
      className={cn(panel, "group relative flex flex-col overflow-hidden")}
      style={squircle}
    >
      <div
        className="flex h-56 items-center justify-center bg-background/40 px-6 transition-colors group-hover:bg-background/60"
        style={dotGrid}
      >
        <div inert className="pointer-events-none select-none">
          {demos[item.name]}
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight">
          <Link
            href={item.href}
            className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </article>
  );
}
