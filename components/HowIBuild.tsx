"use client";

import { motion } from "motion/react";

import "./HowIBuild.css";
const buildGroups = [
  {
    number: "01",
    title: "Full-Stack Web",
    tools:
      "Python · JavaScript · TypeScript · React · Next.js · Node.js · FastAPI · Flask · .NET",
    accent: "mulberry",
  },
  {
    number: "02",
    title: "Mobile",
    tools: "Flutter · Dart",
    accent: "rose",
  },
  {
    number: "03",
    title: "AI / NLP",
    tools:
      "Whisper · Sentence Transformers · scikit-learn · embeddings",
    accent: "violet",
  },
  {
    number: "04",
    title: "Data & Search",
    tools:
      "PostgreSQL · MySQL · pgvector · Elasticsearch · Entity Framework Core",
    accent: "soft",
  },
  {
    number: "05",
    title: "Interface & Frontend",
    tools:
      "Figma · Tailwind CSS · GSAP · UI/UX · responsive design · wireframes · typography · design systems",
    accent: "mulberry",
  },
  {
    number: "06",
    title: "Build & Ship",
    tools:
      "Git · GitHub · Postman · Swagger · Netlify · Railway",
    accent: "violet",
  },
];

const viewportSettings = {
  once: false,
  amount: 0.3,
};

export default function HowIBuild() {
  return (
    <section id="how-i-build" className="build-section">
      <div className="build-inner">
        <motion.div
          className="build-heading"
          initial={{
            opacity: 0,
            y: 26,
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
          <p className="build-kicker">
            &gt; tools, systems &amp; tiny obsessions _
          </p>

          <h2>
            HOW I BUILD
            <span>✦</span>
          </h2>

          <p className="build-intro">
            I work across web, mobile, applied AI and interface design. 
            The tools I use depend on the project and what I’m trying to build.

          </p>
        </motion.div>

        <div className="build-grid">
          {buildGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className={`build-card ${group.accent}`}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.25,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="build-card-top">
                <span className="build-number">
                  {group.number}
                </span>

                <span className="build-marker">
                  {index % 2 === 0 ? "◆" : "○"}
                </span>
              </div>

              <h3>{group.title}</h3>

              <div className="build-line">
                <span />
              </div>

              <p>{group.tools}</p>

              <span className="build-card-sparkle">
                {index % 3 === 0 ? "✦" : "·"}
              </span>
            </motion.article>
          ))}
        </div>

        <motion.a
          href="#projects"
          className="build-next"
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
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>okay, show me the work</span>

          <span>✦</span>

          <motion.span
            className="build-next-arrow"
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
        </motion.a>
      </div>

      <div
        className="build-doodle"
        aria-hidden="true"
      >
        <svg viewBox="0 0 260 120">
          <path d="M0 76 C45 20 85 105 132 55 C169 17 206 83 260 27" />

          <path d="M0 91 C42 48 88 112 139 72 C181 39 213 90 260 56" />

          <circle
            cx="58"
            cy="55"
            r="2.5"
          />

          <circle
            cx="177"
            cy="52"
            r="2"
          />

          <circle
            cx="223"
            cy="74"
            r="2.5"
          />
        </svg>
      </div>
    </section>
  );
}