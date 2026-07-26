"use client";

import * as React from "react";

import { cn } from "@/registry/lib/utils";
import { Input } from "@/components/ui/input";

const SEGMENTS = [
  { key: "hh", max: 99, label: "hours" },
  { key: "mm", max: 59, label: "minutes" },
  { key: "ss", max: 59, label: "seconds" },
] as const;

type SegmentKey = (typeof SEGMENTS)[number]["key"];
type Parts = Record<SegmentKey, number>;

function toParts(total: number): Parts {
  const t = Math.max(0, Math.floor(total));
  return {
    hh: Math.min(99, Math.floor(t / 3600)),
    mm: Math.floor((t % 3600) / 60),
    ss: t % 60,
  };
}

function toSeconds(parts: Parts) {
  return parts.hh * 3600 + parts.mm * 60 + parts.ss;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

interface DurationPickerProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  // controlled total in seconds
  value?: number;
  // uncontrolled starting total in seconds
  defaultValue?: number;
  onValueChange?: (seconds: number) => void;
  disabled?: boolean;
}

export function DurationPicker({
  value,
  defaultValue = 0,
  onValueChange,
  disabled,
  className,
  ...props
}: DurationPickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const seconds = isControlled ? value : internal;
  const parts = toParts(seconds);

  const refs = React.useRef<Record<SegmentKey, HTMLInputElement | null>>({
    hh: null,
    mm: null,
    ss: null,
  });
  // digits typed into the focused segment since it was last committed
  const typed = React.useRef(0);

  const commit = (next: Parts) => {
    const total = toSeconds(next);
    if (!isControlled) setInternal(total);
    onValueChange?.(total);
  };

  const setSegment = (key: SegmentKey, val: number) => {
    const max = SEGMENTS.find((s) => s.key === key)!.max;
    const size = max + 1;
    // wrap within [0, max]
    const wrapped = ((val % size) + size) % size;
    commit({ ...parts, [key]: wrapped });
  };

  const focusIndex = (i: number) => {
    const seg = SEGMENTS[Math.min(SEGMENTS.length - 1, Math.max(0, i))];
    refs.current[seg.key]?.focus();
  };

  const handleKeyDown =
    (key: SegmentKey, index: number) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const max = SEGMENTS[index].max;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        typed.current = 0;
        setSegment(key, parts[key] + 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        typed.current = 0;
        setSegment(key, parts[key] - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        typed.current = 0;
        focusIndex(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        typed.current = 0;
        focusIndex(index - 1);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        typed.current = 0;
        setSegment(key, 0);
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault();
        const digit = Number(e.key);
        const base = typed.current === 0 ? 0 : parts[key];
        let next = base * 10 + digit;
        if (next > max) next = digit;
        setSegment(key, next);
        typed.current += 1;
        // auto-advance once the segment can hold no more digits
        if (typed.current >= 2 || digit > Math.floor(max / 10)) {
          typed.current = 0;
          focusIndex(index + 1);
        }
      }
    };

  return (
    <div
      role="group"
      aria-label="Duration"
      data-slot="duration-picker"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-input bg-transparent px-2 py-1 shadow-xs",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      {SEGMENTS.map((seg, i) => (
        <React.Fragment key={seg.key}>
          {i > 0 && (
            <span aria-hidden className="text-muted-foreground select-none">
              :
            </span>
          )}
          <Input
            ref={(el) => {
              refs.current[seg.key] = el;
            }}
            type="text"
            inputMode="numeric"
            readOnly
            disabled={disabled}
            role="spinbutton"
            aria-label={seg.label}
            aria-valuenow={parts[seg.key]}
            aria-valuemin={0}
            aria-valuemax={seg.max}
            aria-valuetext={`${parts[seg.key]} ${seg.label}`}
            value={pad(parts[seg.key])}
            onFocus={(e) => {
              typed.current = 0;
              e.currentTarget.select();
            }}
            onKeyDown={handleKeyDown(seg.key, i)}
            className="h-7 w-8 rounded-sm border-0 bg-transparent p-0 text-center font-mono tabular-nums shadow-none focus-visible:ring-1 dark:bg-transparent"
          />
        </React.Fragment>
      ))}
    </div>
  );
}
