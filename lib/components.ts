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
    categories: ["inputs", "time"],
    href: "/components/duration-picker",
  },
];

export function getComponent(name: string) {
  return components.find((c) => c.name === name);
}

export function installCommand(name: string) {
  return `npx shadcn@latest add @kiln/${name}`;
}
