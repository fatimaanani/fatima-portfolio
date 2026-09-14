"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import "./Recall.css";

type RecallMode = "user" | "admin";

type RecallScreen = {
  src: string;
  label: string;
  duration: number;
  transition?: "screen" | "scroll";
  cursor?: {
    x: string;
    y: string;
    click?: boolean;
  };
};

const userScreens: RecallScreen[] = [
  {
    src: "/Projects/Recall/splash.png",
    label: "splash",
    duration: 1800,
    transition: "screen",
    cursor: {
      x: "50%",
      y: "50%",
      click: false,
    },
  },

  {
    src: "/Projects/Recall/upload1.png",
    label: "upload",
    duration: 2100,
    transition: "screen",
    cursor: {
      x: "51%",
      y: "41%",
      click: true,
    },
  },
  {
    src: "/Projects/Recall/upload2.png",
    label: "upload",
    duration: 1800,
    transition: "screen",
    cursor: {
      x: "51%",
      y: "58%",
      click: true,
    },
  },
  {
    src: "/Projects/Recall/uploadScenario1.png",
    label: "upload",
    duration: 2200,
    transition: "screen",
    cursor: {
      x: "58%",
      y: "52%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/uploadScenario2.png",
    label: "upload",
    duration: 2200,
    transition: "screen",
    cursor: {
      x: "64%",
      y: "56%",
      click: true,
    },
  },

  {
    src: "/Projects/Recall/library.png",
    label: "library",
    duration: 2400,
    transition: "screen",
    cursor: {
      x: "42%",
      y: "45%",
      click: false,
    },
  },

  {
    src: "/Projects/Recall/uploadDetails.png",
    label: "details",
    duration: 2200,
    transition: "screen",
    cursor: {
      x: "72%",
      y: "47%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/uploadDetailsScroll.png",
    label: "details",
    duration: 2400,
    transition: "scroll",
    cursor: {
      x: "72%",
      y: "66%",
      click: false,
    },
  },

  {
    src: "/Projects/Recall/home.png",
    label: "home",
    duration: 2600,
    transition: "screen",
    cursor: {
      x: "59%",
      y: "42%",
      click: true,
    },
  },

  {
    src: "/Projects/Recall/result1.png",
    label: "results",
    duration: 2200,
    transition: "screen",
    cursor: {
      x: "35%",
      y: "70%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/resultscroll.png",
    label: "results",
    duration: 2400,
    transition: "scroll",
    cursor: {
      x: "36%",
      y: "66%",
      click: true,
    },
  },

  {
    src: "/Projects/Recall/SceneViewer1.png",
    label: "scene",
    duration: 2200,
    transition: "screen",
    cursor: {
      x: "46%",
      y: "51%",
      click: true,
    },
  },
  {
    src: "/Projects/Recall/SceneViewer2.png",
    label: "scene",
    duration: 1800,
    transition: "screen",
    cursor: {
      x: "48%",
      y: "47%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/SceneViewer3.png",
    label: "scene",
    duration: 2000,
    transition: "screen",
    cursor: {
      x: "75%",
      y: "73%",
      click: true,
    },
  },
];

const adminScreens: RecallScreen[] = [
  {
    src: "/Projects/Recall/AnalyticsAdmin.png",
    label: "analytics",
    duration: 2400,
    transition: "screen",
    cursor: {
      x: "56%",
      y: "48%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/AnalyticsAdminScroll.png",
    label: "analytics",
    duration: 2400,
    transition: "scroll",
    cursor: {
      x: "74%",
      y: "70%",
      click: false,
    },
  },
  {
    src: "/Projects/Recall/userManageAdmin.png",
    label: "users",
    duration: 2300,
    transition: "screen",
    cursor: {
      x: "55%",
      y: "45%",
      click: true,
    },
  },
  {
    src: "/Projects/Recall/userDetailsAdmin.png",
    label: "details",
    duration: 2300,
    transition: "screen",
    cursor: {
      x: "72%",
      y: "47%",
      click: true,
    },
  },
  {
    src: "/Projects/Recall/downloadsOfOtherUsersAdmin.png",
    label: "downloads",
    duration: 2600,
    transition: "screen",
    cursor: {
      x: "64%",
      y: "53%",
      click: false,
    },
  },
];

const userProgressSteps = [
  "splash",
  "upload",
  "library",
  "details",
  "home",
  "results",
  "scene",
];

const adminProgressSteps = [
  "analytics",
  "users",
  "details",
  "downloads",
];

export default function Recall() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    amount: 0.35,
  });

  const prefersReducedMotion = useReducedMotion();

  const [mode, setMode] = useState<RecallMode>("user");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showClick, setShowClick] = useState(false);

  const screens =
    mode === "user"
      ? userScreens
      : adminScreens;

  const progressSteps =
    mode === "user"
      ? userProgressSteps
      : adminProgressSteps;

  const currentScreen = screens[currentIndex];

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentIndex((previous) => {
        if (previous === screens.length - 1) {
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
    screens.length,
    mode,
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
    mode,
  ]);

  const activeProgressIndex = progressSteps.indexOf(
    currentScreen.label
  );

  const handleModeChange = (nextMode: RecallMode) => {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    setCurrentIndex(0);
    setShowClick(false);
  };

  const handleProgressClick = (step: string) => {
    const targetIndex = screens.findIndex(
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
      className="recall-demo"
      aria-label="Animated walkthrough of Recall"
    >
      <div className="recall-browser">
        <div className="recall-browser-top">
          <div
            className="recall-browser-dots"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div className="recall-browser-title">
            recall / product walkthrough
          </div>

          <div className="recall-browser-controls">
            <div
              className="recall-mode-toggle"
              aria-label="Recall demo mode"
            >
              <button
                type="button"
                className={
                  mode === "user"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleModeChange("user")
                }
                aria-pressed={
                  mode === "user"
                }
              >
                User
              </button>

              <button
                type="button"
                className={
                  mode === "admin"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleModeChange("admin")
                }
                aria-pressed={
                  mode === "admin"
                }
              >
                Admin
              </button>
            </div>

            <div className="recall-browser-status">
              <span className="recall-browser-status-dot" />
              live demo
            </div>
          </div>
        </div>

        <div className="recall-screen-viewport">
          <AnimatePresence mode="sync">
            <motion.img
              key={`${mode}-${currentScreen.src}-${currentIndex}`}
              src={currentScreen.src}
              alt={`Recall ${mode} ${currentScreen.label} screen`}
              className={`recall-screen ${
                currentScreen.transition === "scroll"
                  ? "recall-screen-scroll"
                  : ""
              }`}
              initial={
                prefersReducedMotion
                  ? false
                  : currentScreen.transition === "scroll"
                    ? {
                        opacity: 0,
                        y: 18,
                        scale: 1.006,
                      }
                    : {
                        opacity: 0,
                        scale: 1.012,
                      }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.998,
                    }
              }
              transition={{
                duration:
                  currentScreen.transition === "scroll"
                    ? 0.8
                    : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              draggable={false}
            />
          </AnimatePresence>

          {!prefersReducedMotion &&
            currentScreen.cursor && (
              <motion.div
                key={`${mode}-cursor-${currentIndex}`}
                className="recall-demo-cursor"
                initial={{
                  left: "82%",
                  top: "82%",
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
                  className="recall-demo-cursor-icon"
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
                      className="recall-click-pulse"
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
        className="recall-demo-progress"
        aria-label={`${mode} walkthrough sections`}
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
              className={`recall-progress-step ${
                isActive ? "active" : ""
              } ${
                isComplete ? "complete" : ""
              }`}
              aria-label={`Jump to ${step} section of Recall ${mode} demo`}
              aria-current={
                isActive
                  ? "step"
                  : undefined
              }
            >
              <span className="recall-progress-dot" />

              <span className="recall-progress-label">
                {step}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}