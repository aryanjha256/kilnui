import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readDemoSource(name: string) {
  const file = path.join(process.cwd(), "components", "demos", `${name}-demo.tsx`);
  try {
    return (await readFile(file, "utf8")).trimEnd();
  } catch {
    return null;
  }
}
