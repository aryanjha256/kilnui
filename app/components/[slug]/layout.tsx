import type { ReactNode } from "react";

import { toSnippet } from "@/lib/highlight";
import { readRegistryItem, readUsageSource } from "@/lib/source";
import { WorkspaceShell } from "@/components/workspace-shell";

export default async function ComponentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, usage] = await Promise.all([
    readRegistryItem(slug),
    readUsageSource(slug).then(toSnippet),
  ]);
  const source = await toSnippet(item.source);

  return (
    <WorkspaceShell
      source={source}
      usage={usage}
      dependencies={item.dependencies}
    >
      {children}
    </WorkspaceShell>
  );
}
