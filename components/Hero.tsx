"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import InteractivePlayground from "./InteractivePlayground";
import HeroSnapshot from "./HeroSnapshot";
import "./Hero.css";

const viewportSettings = {
  once: false,
  amount: 0.35,
};

type HeroProps = {
  startTyping: boolean;
};

export default function Hero({ startTyping }: HeroProps) {
  const terminalTextRef = useRef<HTMLSpanElement>(null);
  const terminalCursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startTyping) return;

    const textElement = terminalTextRef.current;
    const cursorElement = terminalCursorRef.current;

    if (!textElement || !cursorElement) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fullText = "> hello, i'm fatima.";

    if (reduceMotion) {
      textElement.textContent = fullText;
      return;
    }

    textElement.textContent = "";

    const ctx = gsap.context(() => {
      const typingState = {
        length: 0,
      };

      gsap.to(typingState, {
        length: fullText.length,
        duration: 1.65,
        ease: `steps(${fullText.length})`,
        delay: 0.2,
        onUpdate: () => {
          textElement.textContent = fullText.slice(
            0,
            Math.round(typingState.length),
          );
        },
      });

      gsap.to(cursorElement, {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    });

    return () => ctx.revert();
  }, [startTyping]);

  return (
    <section id="top" className="hero-shell">
      <nav className="nav">
        <a
          href="#top"
          className="brand"
          aria-label="Back to top"
        >
          <span>fatima.anani</span>

          <span
            className="brand-sparkle"
            aria-hidden="true"
          >
            ✦
          </span>
        </a>

        <div className="nav-links">
          <a href="#projects">
            &gt; projects
          </a>

          <a href="#about">
            &gt; about
          </a>

          <a
            href="/Fatima-Anani-CV.pdf"
            className="cv-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; CV ↗
          </a>
        </div>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="terminal-line"
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span ref={terminalTextRef} />

            <span
              ref={terminalCursorRef}
              className="hero-terminal-cursor"
              aria-hidden="true"
            >
              _
            </span>
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I design &amp; build
            <br />
            software that
            <br />
            feel <span>good</span> to use.
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.5,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Computer Science graduate working across web,
            mobile, AI &amp; full-stack development.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.5,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href="#projects"
              className="primary-btn"
            >
              [ explore my work ↘ ]
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              say hello →
            </a>
          </motion.div>

          {/* <motion.p
            className="status"
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewportSettings}
            transition={{
              duration: 0.45,
              delay: 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            &gt; currently: building{" "}
            <strong>Priona</strong> ✦
          </motion.p> */}
        </div>

        <motion.div
          className="playground"
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <InteractivePlayground />
        </motion.div>
      </div>

      <HeroSnapshot />
    </section>
  );
}