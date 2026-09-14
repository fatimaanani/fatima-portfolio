"use client";

import { motion } from "motion/react";

import "./CurrentProject.css";

const viewportSettings = {
  once: false,
  amount: 0.3,
};

export default function CurrentProject() {
  return (
    <section
      id="current"
      className="current-section"
    >
      <div className="current-inner">
        <motion.div
          className="current-copy"
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
          <p className="current-kicker">
            &gt; currently building _
          </p>

          <div className="current-title-row">
            <h2>PRIONA</h2>

            <span className="current-title-sparkle">
              ✦
            </span>
          </div>

          <p className="current-lead">
            A mobile checklist app for personal,
            collaborative, and shopping-style lists —
            designed to make everyday planning feel a
            little less boring.
          </p>

          <p className="current-description">
            I&apos;m building Priona in Flutter with
            adaptive list workflows, group assignments,
            quantity tracking, spending history, and
            custom list creation.
          </p>

          <div className="current-status-row">
            <span className="current-status">
              <span
                className="current-status-dot"
                aria-hidden="true"
              />
              in development
            </span>

            <span className="current-stack">
              Flutter · Dart
            </span>
          </div>

          <motion.div
            className="current-progress"
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
              amount: 0.55,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="current-progress-heading">
              <span>&gt; active build</span>
              <span>V1</span>
            </div>

            <div className="current-progress-track">
              <motion.span
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.7,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: "left",
                }}
              />
            </div>

            <div className="current-milestones">
              <span>flows</span>
              <span>UI</span>
              <span>logic</span>
              <span>polish</span>
            </div>
          </motion.div>

          <motion.a
            href="#contact"
            className="current-link"
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
              amount: 0.7,
            }}
            transition={{
              duration: 0.45,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>follow the build</span>
            <span>→</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="current-visual"
          initial={{
            opacity: 0,
            x: 28,
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
          <div className="current-window">
            <div className="current-window-top">
              <span>priona_v1</span>

              <div className="current-window-dots">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="current-phone-shell">
              <div className="current-phone-screen">
                <div className="current-phone-header">
                  <span>my lists</span>
                  <span>＋</span>
                </div>

                <div className="current-list-card">
                  <div>
                    <strong>
                      Village Overnight
                    </strong>

                    <span>12 items</span>
                  </div>

                  <span className="current-list-icon">
                    ✦
                  </span>
                </div>

                <div className="current-list-card">
                  <div>
                    <strong>
                      Shopping
                    </strong>

                    <span>8 items</span>
                  </div>

                  <span className="current-list-icon violet">
                    ○
                  </span>
                </div>

                <div className="current-list-card">
                  <div>
                    <strong>
                      Road Trip
                    </strong>

                    <span>15 items</span>
                  </div>

                  <span className="current-list-icon soft">
                    ◆
                  </span>
                </div>

                <div className="current-bottom-nav">
                  <span>lists</span>
                  <span>history</span>
                  <span>profile</span>
                </div>
              </div>
            </div>

            <span className="current-decor sparkle-a">
              ✦
            </span>

            <span className="current-decor sparkle-b">
              ✦
            </span>

            <span className="current-decor sparkle-c">
              ·
            </span>

            <svg
              className="current-wire"
              viewBox="0 0 120 90"
              aria-hidden="true"
            >
              <polygon points="14,45 36,18 68,26 91,55 64,75 29,68" />

              <line
                x1="14"
                y1="45"
                x2="68"
                y2="26"
              />

              <line
                x1="36"
                y1="18"
                x2="64"
                y2="75"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}