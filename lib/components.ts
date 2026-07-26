// docs metadata for the registry items; descriptions must match registry.json
export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  categories: string[];
  href: string;
}

export const components: ComponentMeta[] = [
  {
    name: "text-shimmer",
    title: "Text Shimmer",
    description: "Animated gradient sweep across text.",
    categories: ["text", "animation"],
    href: "/components/text-shimmer",
  },
  {
    name: "duration-picker",
    title: "Duration Picker",
    description:
      "Segmented hours, minutes, and seconds input backed by a total in seconds.",
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
