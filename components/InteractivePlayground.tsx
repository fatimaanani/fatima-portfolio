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

import { gsap } from "gsap";

import "./InteractivePlayground.css";

type NavNode = {
  id: string;
  title: string;
  description: string;
  target: string;
  x: string;
  y: string;
  variant:
    | "mulberry"
    | "rose"
    | "violet"
    | "soft"
    | "neutral";
  tooltipPosition?:
    | "bottom"
    | "top"
    | "left"
    | "right";
};

type ClickBurst = {
  id: number;
  x: number;
  y: number;
};

const navNodes: NavNode[] = [
  {
    id: "projects",
    title: "projects",
    description: "view selected work",
    target: "#projects",
    x: "39%",
    y: "27%",
    variant: "mulberry",
    tooltipPosition: "right",
  },
  {
    id: "about",
    title: "about",
    description: "a little about me",
    target: "#about",
    x: "63%",
    y: "47%",
    variant: "rose",
    tooltipPosition: "bottom",
  },
  {
    id: "contact",
    title: "contact",
    description: "say hello",
    target: "#contact",
    x: "81%",
    y: "53%",
    variant: "soft",
    tooltipPosition: "left",
  },
  {
    id: "cv",
    title: "cv",
    description: "open my résumé",
    target: "/Fatima-Anani-CV.pdf",
    x: "57%",
    y: "16%",
    variant: "neutral",
    tooltipPosition: "right",
  },
  /*
  {
    id: "current",
    title: "current",
    description: "see what I'm building",
    target: "#current",
    x: "56%",
    y: "77%",
    variant: "violet",
    tooltipPosition: "right",
  }, */
];

const burstOffsets = [
  { x: -25, y: -19, size: 10 },
  { x: -8, y: -29, size: 7 },
  { x: 19, y: -22, size: 9 },
  { x: 29, y: 2, size: 7 },
  { x: 17, y: 23, size: 10 },
  { x: -7, y: 28, size: 7 },
  { x: -27, y: 13, size: 9 },
];

export default function InteractivePlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const burstIdRef = useRef(0);

  const [hoveredNode, setHoveredNode] =
    useState<string | null>(null);

  const [bursts, setBursts] =
    useState<ClickBurst[]>([]);

  /* =========================
     GSAP AMBIENT MOTION
  ========================= */

  useEffect(() => {
    if (!sceneRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* =========================
         NAVIGATION NODE FLOAT
      ========================= */

      const floatingNodes =
        gsap.utils.toArray<HTMLElement>(
          ".navigation-node-float",
        );

      floatingNodes.forEach(
        (node, index) => {
          const direction =
            index % 2 === 0 ? 1 : -1;

          gsap.to(node, {
            x: direction * (2 + index * 0.45),
            y:
              direction *
              (3 + (index % 3) * 1.2),
            duration:
              4.4 + index * 0.65,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      );

      /* =========================
         GEOMETRIC SHAPES
      ========================= */

      gsap.to(".shape-left", {
        x: -3,
        y: 4,
        rotation: -2.2,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      gsap.to(".shape-gem", {
        x: 3,
        y: -3,
        rotation: 2.8,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      gsap.to(".shape-diamond", {
        x: 2,
        y: 4,
        rotation: -2,
        duration: 7.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      /* =========================
         STATIC NODE DRIFT
      ========================= */

      const staticNodes =
        gsap.utils.toArray<SVGCircleElement>(
          ".static-node",
        );

      staticNodes.forEach(
        (node, index) => {
          gsap.to(node, {
            x:
              index % 2 === 0
                ? 2.5
                : -2,
            y:
              index % 2 === 0
                ? -3
                : 3,
            duration:
              5.5 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      );

      /* =========================
         ACTIVE SIGNAL PATH
      ========================= */

      gsap.to(".playground-path.active", {
        strokeDashoffset: -22,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      /* =========================
         STAR TWINKLES
      ========================= */

      const sparkles =
        gsap.utils.toArray<SVGTextElement>(
          ".permanent-sparkle",
        );

      sparkles.forEach(
        (star, index) => {
          const tl = gsap.timeline({
            repeat: -1,
            delay: index * 0.55,
            repeatDelay:
              0.8 + (index % 3) * 0.35,
          });

          tl.set(star, {
            opacity: 0.2,
            scale: 0.78,
            transformOrigin: "50% 50%",
          });

          tl.to(star, {
            opacity: 0.7,
            scale: 0.96,
            duration:
              1.5 + (index % 3) * 0.2,
            ease: "sine.inOut",
          });

          tl.to(star, {
            opacity: 1,
            scale:
              index % 2 === 0
                ? 1.18
                : 1.12,
            rotation:
              index % 2 === 0
                ? 7
                : -7,
            duration: 0.4,
            ease: "power2.out",
          });

          tl.to(star, {
            opacity: 0.25,
            scale: 0.82,
            rotation: 0,
            duration:
              1.6 + (index % 4) * 0.15,
            ease: "sine.inOut",
          });
        },
      );

      /* =========================
         TERMINAL STATUS DOT
      ========================= */

      gsap.to(".terminal-status-dot", {
        opacity: 0.55,
        scale: 0.88,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  function getLocalPoint(
    event: React.PointerEvent<HTMLElement>,
  ) {
    const rect =
      sceneRef.current?.getBoundingClientRect();

    if (!rect) return null;

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function createBurst(
    event: React.PointerEvent<HTMLElement>,
  ) {
    const point = getLocalPoint(event);

    if (!point) return;

    burstIdRef.current += 1;

    const burst: ClickBurst = {
      id: burstIdRef.current,
      x: point.x,
      y: point.y,
    };

    setBursts((current) => [
      ...current,
      burst,
    ]);

    window.setTimeout(() => {
      setBursts((current) =>
        current.filter(
          (item) =>
            item.id !== burst.id,
        ),
      );
    }, 700);
  }

  function navigateTo(node: NavNode) {
    if (node.target.startsWith("#")) {
      const destination =
        document.querySelector(
          node.target,
        );

      destination?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.open(
      node.target,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleNodeClick(
    event: React.PointerEvent<HTMLButtonElement>,
    node: NavNode,
  ) {
    event.stopPropagation();

    createBurst(event);

    window.setTimeout(() => {
      navigateTo(node);
    }, 180);
  }

  return (
    <div
      ref={sceneRef}
      className="playground-scene"
    >
      {/* =====================
          TERMINAL
      ===================== */}

      <div className="mini-terminal">
        <div className="mini-terminal-header">
          <span>TERMINAL</span>

          <span
            className="terminal-status-dot"
            aria-hidden="true"
          />
        </div>

        <div className="mini-terminal-body">
          <p className="terminal-command">
            &gt; help
          </p>

          <p className="terminal-muted">
            available commands:
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .querySelector(
                  "#projects",
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
          >
            &gt; projects
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .querySelector(
                  "#about",
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
          >
            &gt; about
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .querySelector(
                  "#contact",
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
          >
            &gt; contact
          </button>

          <button
            type="button"
            onClick={() =>
              window.open(
                "/Fatima-Anani-CV.pdf",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            &gt; cv
          </button>

          <p className="terminal-input">
            &gt;
            <span className="terminal-block" />
          </p>
        </div>
      </div>

      {/* =====================
          CONSTELLATION ART
      ===================== */}

      <svg
        className="playground-art"
        viewBox="0 0 700 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* NETWORK PATHS */}

        <path
          d="M270 142 C335 140 360 103 410 82"
          className="playground-path"
        />

        <path
          d="M270 142 C335 165 386 213 447 246"
          className="playground-path active"
        />

        <path
          d="M270 142 C245 220 203 278 143 322"
          className="playground-path"
        />

        <path
          d="M143 322 C202 322 242 292 276 255"
          className="playground-path"
        />

        <path
          d="M447 246 C515 249 562 290 579 344"
          className="playground-path"
        />

        <path
          d="M579 344 C602 409 559 454 495 430"
          className="playground-path"
        />

        <path
          d="M495 430 C434 408 401 365 394 342"
          className="playground-path"
        />

        <path
          d="M447 246 C479 186 514 137 510 96"
          className="playground-path"
        />

        {/* POLYGON — LOWER LEFT */}

        <g className="playground-shape shape-left">
          <polygon
            points="88,316 116,292 153,299 169,332 148,365 108,370 79,343"
            className="shape-line rose"
          />

          <line
            x1="88"
            y1="316"
            x2="148"
            y2="365"
            className="shape-line rose"
          />

          <line
            x1="116"
            y1="292"
            x2="108"
            y2="370"
            className="shape-line rose"
          />

          <line
            x1="153"
            y1="299"
            x2="79"
            y2="343"
            className="shape-line rose"
          />

          <line
            x1="88"
            y1="316"
            x2="169"
            y2="332"
            className="shape-line rose"
          />
        </g>

        {/* LITTLE GEM */}

        <g className="playground-shape shape-gem">
          <polygon
            points="245,260 261,246 283,252 292,272 278,290 255,287 241,275"
            className="shape-line neutral"
          />

          <line
            x1="245"
            y1="260"
            x2="278"
            y2="290"
            className="shape-line neutral"
          />

          <line
            x1="261"
            y1="246"
            x2="255"
            y2="287"
            className="shape-line neutral"
          />

          <line
            x1="283"
            y1="252"
            x2="241"
            y2="275"
            className="shape-line neutral"
          />
        </g>

        {/* DIAMOND */}

        <g className="playground-shape shape-diamond">
          <polygon
            points="523,82 548,127 523,145 498,127"
            className="shape-line rose"
          />

          <line
            x1="523"
            y1="82"
            x2="523"
            y2="145"
            className="shape-line rose"
          />

          <line
            x1="498"
            y1="127"
            x2="548"
            y2="127"
            className="shape-line rose"
          />

          <line
            x1="523"
            y1="82"
            x2="498"
            y2="127"
            className="shape-line rose"
          />
        </g>

        {/* STATIC NODES */}

        <circle
          cx="410"
          cy="82"
          r="7"
          className="static-node neutral"
        />

        <circle
          cx="579"
          cy="344"
          r="10"
          className="static-node rose"
        />

        <circle
          cx="495"
          cy="430"
          r="6"
          className="static-node violet"
        />

        {/* PERMANENT SPARKLES */}

        <text
          x="318"
          y="81"
          className="permanent-sparkle rose"
        >
          ✦
        </text>

        <text
          x="231"
          y="109"
          className="permanent-sparkle violet"
        >
          ✦
        </text>

        <text
          x="588"
          y="93"
          className="permanent-sparkle soft"
        >
          ✦
        </text>

        <text
          x="401"
          y="186"
          className="permanent-sparkle rose"
        >
          ✦
        </text>

        <text
          x="336"
          y="225"
          className="permanent-sparkle soft tiny"
        >
          ✦
        </text>

        <text
          x="527"
          y="282"
          className="permanent-sparkle violet tiny"
        >
          ✦
        </text>

        <text
          x="193"
          y="402"
          className="permanent-sparkle soft"
        >
          ✦
        </text>
      </svg>

      {/* =====================
          NAVIGATION NODES
      ===================== */}

      {navNodes.map((node) => {
        const isTooltipVisible =
          node.id === "projects" ||
          hoveredNode === node.id;

        return (
          <div
            key={node.id}
            className={`navigation-node-wrap node-${node.id}`}
            style={{
              left: node.x,
              top: node.y,
            }}
          >
            <div className="navigation-node-float">
              <motion.button
                type="button"
                className={`navigation-node ${node.variant}`}
                aria-label={`${node.title}: ${node.description}`}
                onPointerEnter={() =>
                  setHoveredNode(node.id)
                }
                onPointerLeave={() =>
                  setHoveredNode(null)
                }
                onFocus={() =>
                  setHoveredNode(node.id)
                }
                onBlur={() =>
                  setHoveredNode(null)
                }
                onPointerDown={(event) =>
                  handleNodeClick(
                    event,
                    node,
                  )
                }
                whileHover={{
                  scale: 1.13,
                }}
                whileTap={{
                  scale: 0.93,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <span className="navigation-node-core" />
              </motion.button>

              <AnimatePresence>
                {isTooltipVisible && (
                  <motion.div
                    className={`node-tooltip tooltip-${
                      node.tooltipPosition ??
                      "bottom"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 4,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <span className="node-tooltip-dot" />

                    <strong>
                      {node.title}
                    </strong>

                    <span>
                      {
                        node.description
                      }
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {/* =====================
          NODE CLICK BURST
      ===================== */}

      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="node-click-burst"
            style={{
              left: burst.x,
              top: burst.y,
            }}
          >
            {burstOffsets.map(
              (piece, index) => (
                <motion.span
                  key={index}
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
                      1,
                      0,
                    ],
                    x: piece.x,
                    y: piece.y,
                    scale: [
                      0,
                      1,
                      0.8,
                      0.2,
                    ],
                  }}
                  transition={{
                    duration: 0.65,
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
        ))}
      </AnimatePresence>

      <div className="playground-hint">
        &gt; explore _
      </div>
    </div>
  );
}