"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";

import "./About.css";

const viewportSettings = {
  once: false,
  amount: 0.35,
};

export default function About() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visualRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /* =========================
         ORBIT LINES
      ========================= */

      gsap.to(".orbit-one", {
        rotation: "+=360",
        duration: 32,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".orbit-two", {
        rotation: "-=360",
        duration: 42,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      /* =========================
         FLOATING CHIPS
      ========================= */

      const chips = gsap.utils.toArray<HTMLElement>(
        ".about-chip"
      );

      chips.forEach((chip, index) => {
        gsap.to(chip, {
          y: index % 2 === 0 ? -4 : 4,
          x: index % 2 === 0 ? 2 : -2,
          duration: 3.8 + index * 0.45,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* =========================
         CENTER NODE
      ========================= */

      gsap.to(".about-center-node", {
        scale: 1.035,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      /* =========================
         TWINKLING STARS
      ========================= */
const stars = gsap.utils.toArray<HTMLElement>(
  ".about-star"
);

stars.forEach((star, index) => {
  const tl = gsap.timeline({
    repeat: -1,
    delay: index * 0.9,
    repeatDelay: 0.8 + index * 0.25,
  });

  tl.set(star, {
    opacity: 0.22,
    scale: 0.78,
    rotation: index % 2 === 0 ? -4 : 4,
  });

  tl.to(star, {
    opacity: 0.72,
    scale: 0.95,
    rotation: 0,
    duration: 1.6 + index * 0.15,
    ease: "sine.inOut",
  });

  tl.to(star, {
    opacity: 1,
    scale: 1.16,
    rotation: index % 2 === 0 ? 7 : -7,
    duration: 0.45,
    ease: "power2.out",
  });

  tl.to(star, {
    opacity: 0.28,
    scale: 0.82,
    rotation: 0,
    duration: 1.7 + index * 0.2,
    ease: "sine.inOut",
  });
});
    }, visualRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <motion.div
          className="about-heading-row"
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={viewportSettings}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="about-kicker">
            &gt; a little context _
          </p>

          <h2>
            ABOUT

            <span className="about-heading-sparkle">
              ✦
            </span>
          </h2>
        </motion.div>

        <div className="about-grid">
          {/* LEFT — visual card */}

          <motion.div
            ref={visualRef}
            className="about-visual"
            initial={{
              opacity: 0,
              x: -24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="about-visual-label">
              &gt; builder_profile
            </div>

            <div className="about-orbit">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />

              <span className="about-chip chip-web">
                WEB
              </span>

              <span className="about-chip chip-mobile">
                MOBILE
              </span>

              <span className="about-chip chip-ai">
                AI / NLP
              </span>

              <span className="about-chip chip-design">
                UI / UX
              </span>

              <span className="about-center-node">
                FA
              </span>

              <span className="about-star star-one">
                ✦
              </span>

              <span className="about-star star-two">
                ✧
              </span>

              <span className="about-star star-three">
                ✦
              </span>
            </div>

            <p className="about-visual-footer">
              code · design · systems
            </p>
          </motion.div>

          {/* RIGHT — intro */}

          <motion.div
            className="about-copy"
            initial={{
              opacity: 0,
              x: 24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.6,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="about-lead">
              I&apos;m a Computer Science graduate who likes
              building things where{" "}
              <span>functionality</span> and{" "}
              <span>design</span> meet.
            </p>

            <p>
              My work spans full-stack web development,
              mobile applications, AI/NLP, and interface
              design. I enjoy working across both
              development and design, from the systems behind
              an application to the experience of using it.
            </p>

            <p>
              I&apos;m especially drawn to projects that give
              me room to experiment, solve problems, and
              learn new technologies along the way.
            </p>

            <div className="about-mini-facts">
              <span>&gt; web</span>
              <span>&gt; mobile</span>
              <span>&gt; AI / NLP</span>
              <span>&gt; UI / UX</span>
            </div>
          </motion.div>
        </div>

        {/* Transition into How I Build */}

        <motion.a
          href="#how-i-build"
          className="about-next"
          initial={{
            opacity: 0,
            y: 8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="about-next-text">
            see how I build
          </span>

          <span className="about-next-sparkle">
            ✦
          </span>

          <motion.svg
            className="about-next-arrow"
            viewBox="0 0 120 70"
            aria-hidden="true"
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M8 8 C48 8 70 20 87 39 C96 49 102 56 108 60" />
            <path d="M95 59 L108 60 L104 47" />
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}