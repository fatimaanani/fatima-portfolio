"use client";

import { motion } from "motion/react";

import "./HeroSnapshot.css";

const viewportSettings = {
  once: false,
  amount: 0.35,
};

export default function HeroSnapshot() {
  return (
    <section className="hero-snapshot">
      <motion.div
        className="snapshot-card"
        initial={{
          opacity: 0,
          y: 20,
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
        <div className="snapshot-item">
          <span className="snapshot-label">
            FOCUSED ON
          </span>

          <p>
            building useful things
            <br />
            with thoughtful interfaces
          </p>
        </div>

        <div className="snapshot-divider" />

        <div className="snapshot-item">
          <span className="snapshot-label">
            TECH I LOVE
          </span>

          <p>
            React · FastAPI · Python
            <br />
            PostgreSQL · Flutter · NLP
          </p>
        </div>

        <div className="snapshot-divider" />

        <div className="snapshot-item">
          <span className="snapshot-label">
            APPROACH
          </span>

          <p>
            intentional design,
            <br />
            meaningful experiences
          </p>
        </div>

        <div className="snapshot-divider" />

        <div className="snapshot-item snapshot-location">
          <div>
            <span className="snapshot-label">
              BASED IN
            </span>

            <p>
              Beirut, Lebanon
              <br />
              available for remote work
            </p>
          </div>

          <GlobeIcon />
        </div>
      </motion.div>

      <motion.div
        className="snapshot-footer"
        initial={{
          opacity: 0,
          y: 10,
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
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.a
          href="#about"
          className="scroll-explore"
          whileHover={{
            y: -2,
          }}
        >
          <span>scroll to explore</span>

          <span className="scroll-sparkle">
            ✦
          </span>
        </motion.a>

        <motion.span
          className="scroll-arrow"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ↓
        </motion.span>
      </motion.div>

      <div
        className="snapshot-flow-lines"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
        >
          <path d="M0 50 C100 15 170 100 270 62 C360 28 420 60 500 34" />

          <path d="M0 72 C110 38 170 110 275 76 C360 49 430 82 500 60" />

          <path d="M0 94 C120 69 190 118 285 92 C375 68 435 99 500 84" />

          <circle
            cx="60"
            cy="42"
            r="2.5"
          />

          <circle
            cx="145"
            cy="74"
            r="2"
          />

          <circle
            cx="238"
            cy="69"
            r="2.5"
          />
        </svg>
      </div>
    </section>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="snapshot-globe"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="23"
      />

      <ellipse
        cx="32"
        cy="32"
        rx="10"
        ry="23"
      />

      <path d="M10 32H54" />

      <path d="M15 20C25 25 39 25 49 20" />

      <path d="M15 44C25 39 39 39 49 44" />
    </svg>
  );
}