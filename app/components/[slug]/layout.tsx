import type { ReactNode } from "react";

import { toSnippet } from "@/lib/highlight";
import { readComponentSource, readUsageSource } from "@/lib/source";
import { WorkspaceShell } from "@/components/workspace-shell";

export default async function ComponentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [source, usage] = await Promise.all([
    readComponentSource(slug).then(toSnippet),
    readUsageSource(slug).then(toSnippet),
  ]);

  return (
    <WorkspaceShell source={source} usage={usage}>
      {children}
    </WorkspaceShell>
  );
}
