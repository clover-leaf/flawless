"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  aspectRatio?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  aspectRatio = "aspect-[4/3]",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage
  const [dragging, setDragging] = useState(false);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.min(
      100,
      Math.max(0, (relativeX / rect.width) * 100),
    );
    setPosition(percentage);
  }, []);

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!dragging) return;
      updatePositionFromClientX(clientX);
    },
    [dragging, updatePositionFromClientX],
  );

  const beforeClipPath = `inset(0 ${100 - position}% 0 0)`;
  const afterClipPath = `inset(0 0 0 ${position}%)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border bg-muted/40",
        aspectRatio,
      )}
    >
      <Image
        src={beforeSrc}
        alt={`${alt} before cleaning`}
        fill
        style={{ clipPath: beforeClipPath, willChange: "clip-path" }}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <Image
        src={afterSrc}
        alt={`${alt} after cleaning`}
        fill
        style={{ clipPath: afterClipPath, willChange: "clip-path" }}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div
        className="absolute inset-0 cursor-ew-resize select-none touch-none"
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updatePositionFromClientX(event.clientX);
        }}
        onPointerMove={(event) => handlePointerMove(event.clientX)}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        onPointerLeave={() => setDragging(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            setPosition((prev) => Math.max(0, prev - 5));
          }
          if (event.key === "ArrowRight") {
            setPosition((prev) => Math.min(100, prev + 5));
          }
        }}
      >
        <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="relative h-full">
            <span className="pointer-events-none absolute inset-y-0 -left-0.5 w-px bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]" />
            <span
              className={cn(
                "pointer-events-none absolute top-1/2 -left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-xs font-semibold text-gray-900 shadow-md",
                dragging && "scale-110",
              )}
              aria-hidden="true"
            >
              ⇆
            </span>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-white">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-white">
          After
        </span>
      </div>
    </div>
  );
}
