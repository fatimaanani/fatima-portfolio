"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./GlobalSparkleTrail.css";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: "rose" | "violet" | "soft";
  size: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
};

const symbols = [
  "✦",
  "✧",
  "✦",
  "·",
];

const colors: Sparkle["color"][] = [
  "rose",
  "violet",
  "soft",
];

const burstPieces = [
  { x: -28, y: -19, size: 11 },
  { x: -10, y: -31, size: 8 },
  { x: 19, y: -25, size: 10 },
  { x: 31, y: -4, size: 8 },
  { x: 25, y: 20, size: 10 },
  { x: 5, y: 29, size: 8 },
  { x: -21, y: 24, size: 10 },
  { x: -31, y: 4, size: 7 },
];

export default function GlobalSparkleTrail() {
  const sparkleId = useRef(0);
  const burstId = useRef(0);

  const lastPoint = useRef({
    x: 0,
    y: 0,
  });

  const [sparkles, setSparkles] =
    useState<Sparkle[]>([]);

  const [bursts, setBursts] =
    useState<Burst[]>([]);

  useEffect(() => {
    function createSparkle(
      x: number,
      y: number,
      pointerType: string,
    ) {
      sparkleId.current += 1;

      const id = sparkleId.current;

      const isTouch =
        pointerType === "touch";

      const sparkle: Sparkle = {
        id,
        x,
        y,

        symbol:
          symbols[
            id % symbols.length
          ],

        color:
          colors[
            id % colors.length
          ],

        size: isTouch
          ? 11 + (id % 3) * 2
          : 10 + (id % 3) * 2,
      };

      setSparkles((current) => [
        ...current.slice(
          isTouch ? -16 : -22,
        ),
        sparkle,
      ]);

      window.setTimeout(() => {
        setSparkles((current) =>
          current.filter(
            (item) =>
              item.id !== id,
          ),
        );
      }, 720);
    }

    function createBurst(
      x: number,
      y: number,
    ) {
      burstId.current += 1;

      const id = burstId.current;

      const burst: Burst = {
        id,
        x,
        y,
      };

      setBursts((current) => [
        ...current,
        burst,
      ]);

      window.setTimeout(() => {
        setBursts((current) =>
          current.filter(
            (item) =>
              item.id !== id,
          ),
        );
      }, 720);
    }

    function handlePointerMove(
      event: PointerEvent,
    ) {
      if (!event.isPrimary) {
        return;
      }

      const x = event.clientX;
      const y = event.clientY;

      const dx =
        x - lastPoint.current.x;

      const dy =
        y - lastPoint.current.y;

      const distance = Math.sqrt(
        dx * dx + dy * dy,
      );

      /*
       * Mouse gets the fuller trail.
       *
       * Touch uses a wider spacing so dragging
       * or scrolling still feels subtle rather
       * than covering the screen in sparkles.
       */
      const minimumDistance =
        event.pointerType === "touch"
          ? 24
          : 12;

      if (
        distance <
        minimumDistance
      ) {
        return;
      }

      lastPoint.current = {
        x,
        y,
      };

      createSparkle(
        x,
        y,
        event.pointerType,
      );
    }

    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (!event.isPrimary) {
        return;
      }

      /*
       * Ignore non-primary mouse buttons.
       * Touch and pen normally report button 0.
       */
      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      /*
       * Reset the trail origin here.
       * This prevents a new touch starting far
       * away from the previous one from creating
       * a random connecting sparkle.
       */
      lastPoint.current = {
        x: event.clientX,
        y: event.clientY,
      };

      createBurst(
        event.clientX,
        event.clientY,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, []);

  return (
    <div
      className="global-sparkle-layer"
      aria-hidden="true"
    >
      <AnimatePresence>
        {sparkles.map(
          (sparkle) => (
            <motion.span
              key={sparkle.id}
              className={`global-sparkle global-sparkle-${sparkle.color}`}
              style={{
                left: sparkle.x,
                top: sparkle.y,
                fontSize:
                  sparkle.size,
              }}
              initial={{
                opacity: 0,
                scale: 0.35,
                rotate: -8,
              }}
              animate={{
                opacity: 0.88,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.4,
                y: -9,
                rotate: 8,
              }}
              transition={{
                duration: 0.55,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {sparkle.symbol}
            </motion.span>
          ),
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bursts.map(
          (burst) => (
            <div
              key={burst.id}
              className="global-click-burst"
              style={{
                left: burst.x,
                top: burst.y,
              }}
            >
              {burstPieces.map(
                (
                  piece,
                  index,
                ) => (
                  <motion.span
                    key={index}
                    className={
                      index % 3 ===
                      0
                        ? "burst-violet"
                        : index %
                              2 ===
                            0
                          ? "burst-soft"
                          : "burst-rose"
                    }
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [
                        0,
                        1,
                        0.85,
                        0,
                      ],
                      x: piece.x,
                      y: piece.y,
                      scale: [
                        0,
                        1,
                        0.85,
                        0.25,
                      ],
                    }}
                    transition={{
                      duration: 0.68,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    style={{
                      fontSize:
                        piece.size,
                    }}
                  >
                    ✦
                  </motion.span>
                ),
              )}
            </div>
          ),
        )}
      </AnimatePresence>
    </div>
  );
}