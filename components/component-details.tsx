import type { ComponentMeta } from "@/lib/components";
import type { Snippet } from "@/lib/highlight";
import { eyebrow } from "@/lib/style";
import { UsageBlock } from "@/components/component-code";

export function ComponentDetails({
  meta,
  usage,
}: {
  meta: ComponentMeta;
  usage?: Snippet | null;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-6 xl:pt-20">
      <h2 className="text-xl font-semibold tracking-tight">{meta.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {meta.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {meta.categories.map((category) => (
          <li
            key={category}
            className="rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {category}
          </li>
        ))}
      </ul>

      <section className="mt-9">
        <h3 className={eyebrow}>Interaction</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {meta.interaction}
        </p>
      </section>

      <section className="mt-9">
        <h3 className={eyebrow}>Props</h3>
        <dl className="mt-3 flex flex-col gap-3.5">
          {meta.props.map((prop) => (
            <div key={prop.name}>
              <dt className="font-mono text-xs">{prop.name}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {usage && (
        <section className="mt-9">
          <UsageBlock snippet={usage} />
        </section>
      )}
    </div>
  );
}
