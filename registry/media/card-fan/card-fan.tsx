"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";

import { cn } from "@/registry/lib/utils";

const WIDTH = "var(--kiln-fan-width, 14rem)";

const SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 26,
  mass: 0.8,
};

// the card lands before its content arrives
const REVEAL_DELAY = 0.08;

interface FanContextValue {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  count: number;
  rotate: number;
  overlap: number;
  arc: number;
  lift: number;
  scale: number;
  blur: number;
  transition: Transition;
  revealDelay: number;
}

interface ItemContextValue {
  index: number;
}

const FanContext = React.createContext<FanContextValue | null>(null);
const ItemContext = React.createContext<ItemContextValue | null>(null);

function useFan(part: string) {
  const fan = React.useContext(FanContext);
  const item = React.useContext(ItemContext);
  if (!fan || !item) throw new Error(`${part} must be used inside CardFanItem`);
  return { ...fan, index: item.index, active: fan.activeIndex === item.index };
}

interface CardFanProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  // resting tilt in degrees, alternating left and right
  rotate?: number;
  // how much of a card the next one covers, as a fraction of its width
  overlap?: number;
  // card width; falls back to the --kiln-fan-width css var, then 14rem
  width?: number | string;
  // px the outermost cards sit below the middle of the fan
  arc?: number;
  // px the open card rises out of the fan
  lift?: number;
  scale?: number;
  blur?: number;
  activeIndex?: number | null;
  defaultActiveIndex?: number | null;
  onActiveIndexChange?: (index: number | null) => void;
  transition?: Transition;
}

export function CardFan({
  rotate = 8,
  overlap = 0.35,
  width,
  arc = 16,
  lift = 10,
  scale = 1.08,
  blur = 8,
  activeIndex,
  defaultActiveIndex = null,
  onActiveIndexChange,
  transition,
  children,
  className,
  style,
  ...props
}: CardFanProps) {
  const isControlled = activeIndex !== undefined;
  const [internal, setInternal] = React.useState(defaultActiveIndex);
  const active = isControlled ? activeIndex : internal;
  const reducedMotion = useReducedMotion();
  const count = React.Children.count(children);

  const setActiveIndex = React.useCallback(
    (index: number | null) => {
      if (!isControlled) setInternal(index);
      onActiveIndexChange?.(index);
    },
    [isControlled, onActiveIndexChange],
  );

  const value = React.useMemo<FanContextValue>(
    () => ({
      activeIndex: active,
      setActiveIndex,
      count,
      rotate,
      overlap,
      arc,
      lift,
      scale,
      blur,
      transition: reducedMotion ? { duration: 0 } : (transition ?? SPRING),
      revealDelay: reducedMotion ? 0 : REVEAL_DELAY,
    }),
    [
      active,
      setActiveIndex,
      count,
      rotate,
      overlap,
      arc,
      lift,
      scale,
      blur,
      reducedMotion,
      transition,
    ],
  );

  return (
    <FanContext value={value}>
      <div
        data-slot="card-fan"
        onKeyDown={(event) => {
          if (event.key === "Escape") setActiveIndex(null);
        }}
        className={cn("flex items-center justify-center", className)}
        style={
          {
            ...(width !== undefined && {
              "--kiln-fan-width":
                typeof width === "number" ? `${width}px` : width,
            }),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <ItemContext value={{ index }}>{child}</ItemContext>
        ))}
      </div>
    </FanContext>
  );
}

interface CardFanItemProps extends HTMLMotionProps<"div"> {
  // signed override for this card's resting tilt
  rotate?: number;
}

export function CardFanItem({
  rotate,
  className,
  style,
  ...props
}: CardFanItemProps) {
  const { index, active, count, ...fan } = useFan("CardFanItem");
  const angle = rotate ?? (index % 2 === 0 ? -fan.rotate : fan.rotate);

  // shallow curve, so the row reads as a fan instead of a stripe
  const center = (count - 1) / 2;
  const restY = center === 0 ? 0 : fan.arc * ((index - center) / center) ** 2;

  // hold the closing card above its neighbors until it has settled back
  const [raised, setRaised] = React.useState(false);
  if (active && !raised) setRaised(true);

  return (
    <motion.div
      data-slot="card-fan-item"
      data-active={active ? "true" : undefined}
      tabIndex={0}
      initial={false}
      animate={{
        rotate: active ? 0 : angle,
        scale: active ? fan.scale : 1,
        y: active ? -fan.lift : restY,
      }}
      transition={fan.transition}
      onAnimationComplete={() => {
        if (!active) setRaised(false);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") fan.setActiveIndex(index);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        // keep the card open while focus is still inside it
        if (event.currentTarget.contains(document.activeElement)) return;
        fan.setActiveIndex(null);
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch")
          fan.setActiveIndex(active ? null : index);
      }}
      onFocus={() => fan.setActiveIndex(index)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          fan.setActiveIndex(null);
      }}
      className={cn(
        "group relative aspect-3/4 shrink-0 overflow-hidden rounded-2xl bg-muted outline-none",
        "shadow-lg shadow-black/25 ring-1 ring-black/10 ring-inset transition-shadow duration-300 dark:ring-white/10",
        "data-[active=true]:shadow-2xl data-[active=true]:shadow-black/50 dark:data-[active=true]:ring-white/20",
        "focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
        className,
      )}
      style={{
        width: WIDTH,
        zIndex: raised ? count : index,
        marginLeft: index === 0 ? 0 : `calc(${WIDTH} * -${fan.overlap})`,
        ...style,
      }}
      {...props}
    />
  );
}

export function CardFanBackground({
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { active, ...fan } = useFan("CardFanBackground");

  return (
    <motion.div
      data-slot="card-fan-background"
      initial={false}
      // the scale keeps blurred edges from pulling transparency inward
      animate={{ filter: `blur(${active ? fan.blur : 0}px)`, scale: active ? 1.1 : 1 }}
      transition={fan.transition}
      className={cn(
        "absolute inset-0 *:size-full [&>img,&>video]:object-cover",
        className,
      )}
      {...props}
    />
  );
}

export function CardFanOverlay({
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { active, ...fan } = useFan("CardFanOverlay");

  return (
    <motion.div
      data-slot="card-fan-overlay"
      inert={!active}
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
      transition={{ ...fan.transition, delay: active ? fan.revealDelay : 0 }}
      className={cn(
        // a media scrim, not a themed surface: it sits on the image, not on the page
        "absolute inset-0 flex flex-col justify-end gap-1 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 text-white",
        className,
      )}
      {...props}
    />
  );
}
