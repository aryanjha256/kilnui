import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { components, getComponent, installCommand } from "@/lib/components";
import { readDemoSource } from "@/lib/demo-source";
import { demos } from "@/lib/demos";
import { componentPageMetadata } from "@/lib/seo";
import { ComponentCanvas } from "@/components/component-canvas";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getComponent(slug);
  return meta ? componentPageMetadata(meta.href) : {};
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getComponent(slug);
  if (!meta) notFound();

  const code = await readDemoSource(slug);

  return (
    <ComponentCanvas
      title={meta.title}
      caption={meta.description}
      install={installCommand(slug)}
      code={code}
    >
      {demos[slug]}
    </ComponentCanvas>
  );
}
