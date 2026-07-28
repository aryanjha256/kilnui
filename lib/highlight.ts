import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type Snippet = { code: string; html: string };

// one highlighter for the whole build, only the grammar and themes we ship
let highlighter: ReturnType<typeof createHighlighterCore> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [
      import("shiki/themes/min-light.mjs"),
      import("shiki/themes/min-dark.mjs"),
    ],
    langs: [import("shiki/langs/tsx.mjs")],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

export async function toSnippet(code: string | null): Promise<Snippet | null> {
  if (!code) return null;

  const shiki = await getHighlighter();
  // defaultColor false emits both themes as custom properties for the .dark swap
  const html = shiki.codeToHtml(code, {
    lang: "tsx",
    themes: { light: "min-light", dark: "min-dark" },
    defaultColor: false,
  });

  return { code, html };
}
