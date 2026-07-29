import type { ReactNode } from "react";

import { TextShimmerDemo } from "@/components/demos/text-shimmer-demo";
import { DurationPickerDemo } from "@/components/demos/duration-picker-demo";
import { CardFanDemo } from "@/components/demos/card-fan-demo";

export const demos: Record<string, ReactNode> = {
  "text-shimmer": <TextShimmerDemo />,
  "duration-picker": <DurationPickerDemo />,
  "card-fan": <CardFanDemo />,
};
