import type { ReactNode } from "react";

import { TextShimmerDemo } from "@/components/demos/text-shimmer-demo";
import { DurationPickerDemo } from "@/components/demos/duration-picker-demo";

export const demos: Record<string, ReactNode> = {
  "text-shimmer": <TextShimmerDemo />,
  "duration-picker": <DurationPickerDemo />,
};
