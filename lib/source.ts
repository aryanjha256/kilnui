import { readFile } from "node:fs/promises";
import path from "node:path";

type RegistryItem = {
  files?: { type?: string; content?: string }[];
  dependencies?: string[];
  registryDependencies?: string[];
};

// the demo the docs render, shown as the usage example
export async function readUsageSource(name: string) {
  const file = path.join(
    process.cwd(),
    "components",
    "demos",
    `${name}-demo.tsx`,
  );
  try {
    return (await readFile(file, "utf8")).trimEnd();
  } catch {
    return null;
  }
}

// the built registry item, so the docs never drift from what the cli installs
export async function readRegistryItem(name: string) {
  const file = path.join(process.cwd(), "public", "r", `${name}.json`);
  try {
    const item: RegistryItem = JSON.parse(await readFile(file, "utf8"));
    const ui = item.files?.find((entry) => entry.type === "registry:ui");
    return {
      source: ui?.content?.trimEnd() ?? null,
      dependencies: [
        ...(item.dependencies ?? []),
        ...(item.registryDependencies ?? []),
      ],
    };
  } catch {
    return { source: null, dependencies: [] };
  }
}
