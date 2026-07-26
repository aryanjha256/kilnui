"use client";

import * as React from "react";

import { DurationPicker } from "@/registry/inputs/duration-picker/duration-picker";

export function DurationPickerDemo() {
  const [seconds, setSeconds] = React.useState(90);

  return (
    <div className="flex flex-col items-center gap-3">
      <DurationPicker value={seconds} onValueChange={setSeconds} />
      <p className="text-sm text-muted-foreground tabular-nums">
        {seconds} seconds
      </p>
    </div>
  );
}
