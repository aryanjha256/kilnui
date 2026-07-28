import { readFile } from "node:fs/promises";
import path from "node:path";

type RegistryItem = {
  files?: { type?: string; content?: string }[];
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

// the file the cli would install, for anyone copying it by hand
export async function readComponentSource(name: string) {
  const file = path.join(process.cwd(), "public", "r", `${name}.json`);
  try {
    const item: RegistryItem = JSON.parse(await readFile(file, "utf8"));
    const ui = item.files?.find((entry) => entry.type === "registry:ui");
    return ui?.content?.trimEnd() ?? null;
  } catch {
    return null;
  }
}
