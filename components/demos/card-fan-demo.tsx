"use client";

import Image from "next/image";

import {
  CardFan,
  CardFanBackground,
  CardFanItem,
  CardFanOverlay,
} from "@/registry/media/card-fan/card-fan";
import { HeartIcon, ShareIcon } from "@/components/icons";

const shots = [
  {
    title: "Rental",
    stock: "Kodak Gold 200",
    src: "/assets/card-fan/1.jpg",
    alt: "A worn VHS tape lying on a sunlit wooden deck",
  },
  {
    title: "Last Call",
    stock: "Tri-X 400",
    src: "/assets/card-fan/2.jpg",
    alt: "A lit phone booth at night, shot in black and white",
  },
  {
    title: "Bouquet",
    stock: "Portra 400",
    src: "/assets/card-fan/3.jpg",
    alt: "A border collie sitting up with wildflowers in its mouth",
  },
  {
    title: "Long Shadow",
    stock: "Ektar 100",
    src: "/assets/card-fan/4.jpg",
    alt: "The photographer's shadow stretching across bright green grass",
  },
  {
    title: "Chrome",
    stock: "Portra 800",
    src: "/assets/card-fan/5.jpg",
    alt: "The tail light and chrome bumper of a red vintage car",
  },
];

const action =
  "inline-flex size-6 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white @md:size-8";

export function CardFanDemo() {
  return (
    // a container query sizes the fan to its box, not to the viewport
    <div className="@container w-full">
      <CardFan
        overlap={0.5}
        className="[--kiln-fan-width:5.5rem] @xs:[--kiln-fan-width:6.5rem] @sm:[--kiln-fan-width:7.5rem] @md:[--kiln-fan-width:9rem] @lg:[--kiln-fan-width:13rem]"
      >
        {shots.map((shot) => (
          <CardFanItem key={shot.title}>
            <CardFanBackground>
              <Image src={shot.src} alt={shot.alt} fill sizes="208px" />
            </CardFanBackground>
            <CardFanOverlay className="p-2.5 @md:p-4">
              <h3 className="text-sm leading-tight font-medium">
                {shot.title}
              </h3>
              <p className="text-xs text-white/70">{shot.stock}</p>
              <div className="mt-2 flex gap-1.5">
                <button
                  type="button"
                  aria-label={`Like ${shot.title}`}
                  className={action}
                >
                  <HeartIcon className="size-3 @md:size-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Share ${shot.title}`}
                  className={action}
                >
                  <ShareIcon className="size-3 @md:size-4" />
                </button>
              </div>
            </CardFanOverlay>
          </CardFanItem>
        ))}
      </CardFan>
    </div>
  );
}
