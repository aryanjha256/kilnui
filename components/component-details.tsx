"use client";

import type { ComponentMeta } from "@/lib/components";
import type { Snippet } from "@/lib/highlight";
import { eyebrow } from "@/lib/style";
import { UsageBlock } from "@/components/component-code";
import { InstallTabs } from "@/components/install-tabs";

export function ComponentDetails({
  meta,
  usage,
  dependencies,
  hasSource,
  onViewSource,
}: {
  meta: ComponentMeta;
  usage?: Snippet | null;
  dependencies?: string[];
  hasSource?: boolean;
  onViewSource?: () => void;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-56 pb-36">
      <h2 className={eyebrow}>{meta.title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-foreground/90 mb-32">
        {meta.description} {meta.interaction}
      </p>

      {dependencies && dependencies.length > 0 && (
        <Section label="Dependencies">
          <ul className="flex flex-wrap gap-1.5">
            {dependencies.map((dependency) => (
              <li
                key={dependency}
                className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {dependency}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            The cli pulls these in for you.
          </p>
        </Section>
      )}

      <Section label="Installation">
        <InstallTabs name={meta.name} />
      </Section>

      {usage && (
        <Section label="How to use">
          <UsageBlock snippet={usage} />
        </Section>
      )}

      <Section label="Props">
        <dl className="flex flex-col gap-3.5">
          {meta.props.map((prop) => (
            <div key={prop.name}>
              <dt className="font-mono text-xs">{prop.name}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Keep in mind">
        <ul className="flex flex-col gap-2.5">
          {meta.notes.map((note) => (
            <li
              key={note}
              className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-2.5 before:left-0 before:h-0.5 before:w-2 before:rounded-full before:bg-card-foreground/40 before:content-['']"
            >
              {note}
            </li>
          ))}
        </ul>
      </Section>

      {hasSource && (
        <Section label="Source">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Prefer to copy it by hand?{" "}
            <button
              type="button"
              onClick={onViewSource}
              className="text-kiln underline decoration-kiln/40 underline-offset-4 transition-colors hover:decoration-kiln focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Read the source
            </button>{" "}
            without the cli.
          </p>
        </Section>
      )}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h3 className={eyebrow}>{label}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
