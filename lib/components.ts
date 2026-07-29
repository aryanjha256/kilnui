// docs metadata for the registry items; descriptions must match registry.json
export interface ComponentProp {
  name: string;
  description: string;
}

export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  interaction: string;
  props: ComponentProp[];
  notes: string[];
  categories: string[];
  href: string;
}

export const components: ComponentMeta[] = [
  {
    name: "text-shimmer",
    title: "Text Shimmer",
    description: "Animated gradient sweep across text.",
    interaction:
      "A bright band sweeps across the text and repeats. The text stays static for visitors who prefer reduced motion.",
    props: [
      { name: "duration", description: "Seconds for one sweep. Defaults to 2." },
      {
        name: "spread",
        description:
          "Width of the bright band, multiplied by the text length. Defaults to 2.",
      },
    ],
    notes: [
      "The sweep is a css animation, so it costs nothing on the main thread.",
      "The gradient clips to the text and sweeps currentColor, so it inherits whatever color you set.",
      "Reduced motion renders plain text with no gradient at all.",
    ],
    categories: ["text", "animation"],
    href: "/components/text-shimmer",
  },
  {
    name: "duration-picker",
    title: "Duration Picker",
    description:
      "Segmented hours, minutes, and seconds input backed by a total in seconds.",
    interaction:
      "Focus a segment, then type digits or step it with the up and down arrows. Focus moves on once a segment fills. Left and right arrows move between segments, backspace clears the focused one. Hours stop at 99, minutes and seconds at 59.",
    props: [
      { name: "value", description: "Controlled total in seconds." },
      {
        name: "defaultValue",
        description:
          "Starting total in seconds when uncontrolled. Defaults to 0.",
      },
      {
        name: "onValueChange",
        description: "Fires with the new total in seconds after every change.",
      },
      { name: "disabled", description: "Blocks input and dims the control." },
    ],
    notes: [
      "Segments are read-only inputs, so typing replaces digits instead of inserting them.",
      "Values wrap, so stepping past the top of a segment returns to zero.",
      "Each segment renders the shadcn input, so it picks up your input styles.",
    ],
    categories: ["inputs", "time"],
    href: "/components/duration-picker",
  },
  {
    name: "card-fan",
    title: "Card Fan",
    description:
      "Row of tilted, overlapping cards that straighten and reveal an overlay on hover.",
    interaction:
      "Cards lean left and right and overlap in order, each one sitting on the last. Hover, focus, or tap a card and it straightens, rises above its neighbors, and blurs its own background while the overlay fades in. The rest of the fan stays put. Escape closes the open card.",
    props: [
      {
        name: "rotate",
        description:
          "Resting tilt in degrees. Cards alternate left then right. Defaults to 8.",
      },
      {
        name: "overlap",
        description:
          "How much of a card the next one covers, as a fraction of its width. Defaults to 0.35.",
      },
      {
        name: "width",
        description:
          "Card width, as a number of pixels or a css length. Falls back to the --kiln-fan-width variable, then to 14rem.",
      },
      {
        name: "arc",
        description:
          "Pixels the outermost cards sit below the middle, curving the row. Defaults to 16.",
      },
      {
        name: "lift",
        description:
          "Pixels the open card rises out of the fan. Defaults to 10.",
      },
      {
        name: "scale",
        description: "How much the open card grows. Defaults to 1.08.",
      },
      {
        name: "blur",
        description:
          "Blur in pixels over the open card's background. Defaults to 8.",
      },
      {
        name: "activeIndex",
        description: "Controlled open card. Pass null for none.",
      },
      {
        name: "defaultActiveIndex",
        description:
          "Card that starts open when uncontrolled. Defaults to null.",
      },
      {
        name: "onActiveIndexChange",
        description: "Fires with the new index, or null when the fan closes.",
      },
      {
        name: "transition",
        description:
          "Motion transition shared by every animated part. Defaults to a spring.",
      },
      {
        name: "rotate (CardFanItem)",
        description:
          "Signed override for one card's resting tilt, ignoring the alternating pattern.",
      },
    ],
    notes: [
      "Cards stack in source order, so the last child sits on top until one opens. A closing card stays above its neighbors until it has settled back.",
      "The overlay is a dark media scrim with light text, because it sits on your image rather than on the page. Restyle it from className if your content needs otherwise.",
      "The overlay lands a beat after the card straightens, so the two reads do not compete.",
      "Direct children of CardFanBackground stretch to fill the card, so a bare img or video needs no classes.",
      "The overlay is inert while closed, so tab lands on the card first and reaches its buttons only once it opens.",
      "Set --kiln-fan-width from a class to size cards, ideally from a container query so the fan fits its box rather than the viewport. The width prop is an inline override that wins over both.",
      "Reduced motion keeps the tilt but drops the transition, so every state change lands instantly.",
    ],
    categories: ["media", "gallery"],
    href: "/components/card-fan",
  },
];

export function getComponent(name: string) {
  return components.find((c) => c.name === name);
}

export const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManager = (typeof packageManagers)[number];

const runners: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export function installCommand(name: string, manager: PackageManager = "npm") {
  return `${runners[manager]} shadcn@latest add @kiln/${name}`;
}
