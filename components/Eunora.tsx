"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import "./Eunora.css";

type EunoraScreen = {
  src: string;
  label: string;
  duration: number;
  cursor?: {
    x: string;
    y: string;
    click?: boolean;
  };
};

const eunoraScreens: EunoraScreen[] = [
  {
    src: "/Projects/Eunora/Eunora Register.png",
    label: "register",
    duration: 2200,
    cursor: {
      x: "54%",
      y: "66%",
      click: true,
    },
  },
  {
    src: "/Projects/Eunora/Eunora Login.png",
    label: "login",
    duration: 2100,
    cursor: {
      x: "51%",
      y: "61%",
      click: true,
    },
  },
  {
    src: "/Projects/Eunora/Eunora dashboard.png",
    label: "dashboard",
    duration: 2400,
    cursor: {
      x: "46%",
      y: "49%",
      click: true,
    },
  },
  {
    src: "/Projects/Eunora/Eunora tasks.png",
    label: "tasks",
    duration: 2500,
    cursor: {
      x: "57%",
      y: "53%",
      click: true,
    },
  },
  {
    src: "/Projects/Eunora/Eunora focus session.png",
    label: "focus",
    duration: 2500,
    cursor: {
      x: "53%",
      y: "60%",
      click: true,
    },
  },
  {
    src: "/Projects/Eunora/Eunora records.png",
    label: "records",
    duration: 2600,
    cursor: {
      x: "52%",
      y: "48%",
      click: false,
    },
  },
];

const progressSteps = [
  "register",
  "login",
  "dashboard",
  "tasks",
  "focus",
  "records",
];

export default function Eunora() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    amount: 0.35,
  });

  const prefersReducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showClick, setShowClick] = useState(false);

  const currentScreen = eunoraScreens[currentIndex];

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentIndex((previous) => {
        if (previous === eunoraScreens.length - 1) {
          return 0;
        }

        return previous + 1;
      });
    }, currentScreen.duration);

    return () => window.clearTimeout(timer);
  }, [
    currentIndex,
    currentScreen.duration,
    isInView,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (
      !isInView ||
      prefersReducedMotion ||
      !currentScreen.cursor?.click
    ) {
      setShowClick(false);
      return;
    }

    setShowClick(false);

    const clickStart = window.setTimeout(() => {
      setShowClick(true);
    }, Math.max(currentScreen.duration - 650, 600));

    const clickEnd = window.setTimeout(() => {
      setShowClick(false);
    }, Math.max(currentScreen.duration - 250, 950));

    return () => {
      window.clearTimeout(clickStart);
      window.clearTimeout(clickEnd);
    };
  }, [
    currentIndex,
    currentScreen,
    isInView,
    prefersReducedMotion,
  ]);

  const activeProgressIndex = progressSteps.indexOf(
    currentScreen.label
  );

  const handleProgressClick = (step: string) => {
    const targetIndex = eunoraScreens.findIndex(
      (screen) => screen.label === step
    );

    if (targetIndex === -1) {
      return;
    }

    setShowClick(false);
    setCurrentIndex(targetIndex);
  };

  return (
    <div
      ref={containerRef}
      className="eunora-demo"
      aria-label="Animated walkthrough of Eunora"
    >
      <div className="eunora-window">
        <div className="eunora-window-top">
          <div
            className="eunora-window-dots"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div className="eunora-window-title">
            eunora.exe / desktop walkthrough
          </div>

          <div className="eunora-window-status">
            <span className="eunora-window-status-dot" />
            running
          </div>
        </div>

        <div className="eunora-screen-stage">
          <AnimatePresence mode="sync">
            <motion.img
              key={`${currentScreen.src}-${currentIndex}`}
              src={currentScreen.src}
              alt={`Eunora ${currentScreen.label} screen`}
              className="eunora-screen"
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 1.025,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.99,
                    }
              }
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              draggable={false}
            />
          </AnimatePresence>

          {!prefersReducedMotion &&
            currentScreen.cursor && (
              <motion.div
                key={`eunora-cursor-${currentIndex}`}
                className="eunora-demo-cursor"
                initial={{
                  left: "80%",
                  top: "78%",
                  opacity: 0,
                }}
                animate={{
                  left: currentScreen.cursor.x,
                  top: currentScreen.cursor.y,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.45,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 32 32"
                  className="eunora-demo-cursor-icon"
                >
                  <path
                    d="
                      M 11.6 7.6
                      C 10.7 7.2 9.6 7.9 9.6 8.9
                      L 10.2 21.6
                      C 10.3 22.5 11.3 23 12 22.4
                      L 14.7 20.2
                      C 15.2 19.8 15.9 19.9 16.3 20.4
                      L 18.4 23.2
                      C 19.3 24.3 20.9 24.5 22 23.7
                      L 22.2 23.5
                      C 23.3 22.7 23.6 21.1 22.7 20
                      L 20.6 17.2
                      C 20.2 16.7 20.4 16 21 15.7
                      L 24.4 14
                      C 25.2 13.6 25.3 12.5 24.5 11.9
                      Z
                    "
                  />
                </svg>

                <AnimatePresence>
                  {showClick && (
                    <motion.span
                      className="eunora-click-pulse"
                      initial={{
                        opacity: 0.75,
                        scale: 0.35,
                      }}
                      animate={{
                        opacity: 0,
                        scale: 1.7,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
        </div>
      </div>

      <div
        className="eunora-demo-progress"
        aria-label="Eunora walkthrough sections"
      >
        {progressSteps.map((step, index) => {
          const isActive =
            index === activeProgressIndex;

          const isComplete =
            index < activeProgressIndex;

          return (
            <button
              key={step}
              type="button"
              onClick={() =>
                handleProgressClick(step)
              }
              className={`eunora-progress-step ${
                isActive ? "active" : ""
              } ${
                isComplete ? "complete" : ""
              }`}
              aria-label={`Jump to ${step} section of Eunora demo`}
              aria-current={
                isActive ? "step" : undefined
              }
            >
              <span className="eunora-progress-dot" />

              <span className="eunora-progress-label">
                {step}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}