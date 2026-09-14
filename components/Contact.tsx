"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  FormEventHandler,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { gsap } from "gsap";

import "./Contact.css";

const viewportSettings = {
  once: false,
  amount: 0.3,
};

export default function Contact() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const terminalRef =
    useRef<HTMLDivElement>(null);

  const hasAnimatedRef =
    useRef(false);

  /*
   * Default state:
   * interactive message form.
   */
  const [isWriting, setIsWriting] =
    useState(true);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  /* =========================
     INITIAL CONTACT ANIMATION
  ========================= */

  useEffect(() => {
    if (
      !sectionRef.current ||
      !terminalRef.current
    ) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) return;

    const terminal =
      terminalRef.current;

    const ctx = gsap.context(() => {
      /* =========================
         DECORATIVE SPARKLES
      ========================= */

      const sparkles =
        gsap.utils.toArray<HTMLElement>(
          ".contact-sparkle",
        );

      sparkles.forEach(
        (sparkle, index) => {
          const tl = gsap.timeline({
            repeat: -1,
            delay: index * 1.1,
            repeatDelay:
              1.1 + index * 0.4,
          });

          tl.set(sparkle, {
            opacity: 0.2,
            scale: 0.8,
            rotation:
              index % 2 === 0
                ? -4
                : 4,
          });

          tl.to(sparkle, {
            opacity: 0.72,
            scale: 0.96,
            rotation: 0,
            duration: 1.8,
            ease: "sine.inOut",
          });

          tl.to(sparkle, {
            opacity: 1,
            scale: 1.16,
            rotation:
              index % 2 === 0
                ? 7
                : -7,
            duration: 0.4,
            ease: "power2.out",
          });

          tl.to(sparkle, {
            opacity: 0.24,
            scale: 0.82,
            rotation: 0,
            duration: 1.8,
            ease: "sine.inOut",
          });
        },
      );

      /* =========================
         CURVE PREPARATION
      ========================= */

      const curvePath =
        terminal.querySelector<SVGPathElement>(
          ".contact-curve path",
        );

      const curveDots =
        terminal.querySelectorAll(
          ".contact-curve circle",
        );

      if (curvePath) {
        const pathLength =
          curvePath.getTotalLength();

        gsap.set(curvePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      if (curveDots.length) {
        gsap.set(curveDots, {
          opacity: 0,
          scale: 0,
          transformOrigin: "50% 50%",
        });
      }

      /* =========================
         TOP DOTS PREPARATION
      ========================= */

      const topDots =
        terminal.querySelectorAll(
          ".contact-terminal-dots span",
        );

      if (topDots.length) {
        gsap.set(topDots, {
          opacity: 0.35,
          scale: 0.7,
        });
      }

      /* =========================
         FORM PREPARATION
      ========================= */

      const formPieces =
        terminal.querySelectorAll(
          ".contact-field, .contact-form-actions",
        );

      if (formPieces.length) {
        gsap.set(formPieces, {
          opacity: 0,
          y: 7,
        });
      }
    }, terminal);

    /* =========================
       RUN WHEN CONTACT ENTERS
    ========================= */

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            !entry.isIntersecting ||
            hasAnimatedRef.current
          ) {
            return;
          }

          hasAnimatedRef.current = true;

          const curvePath =
            terminal.querySelector<SVGPathElement>(
              ".contact-curve path",
            );

          const curveDots =
            terminal.querySelectorAll(
              ".contact-curve circle",
            );

          const topDots =
            terminal.querySelectorAll(
              ".contact-terminal-dots span",
            );

          const formPieces =
            terminal.querySelectorAll(
              ".contact-field, .contact-form-actions",
            );

          const tl = gsap.timeline({
            defaults: {
              ease: "power2.out",
            },
          });

          /* terminal lights */

          if (topDots.length) {
            tl.to(topDots, {
              opacity: 1,
              scale: 1,
              duration: 0.32,
              stagger: 0.09,
            });
          }

          /* form fields appear */

          if (formPieces.length) {
            tl.to(
              formPieces,
              {
                opacity: 1,
                y: 0,
                duration: 0.38,
                stagger: 0.11,
              },
              "-=0.05",
            );
          }

          /* curve draws itself */

          if (curvePath) {
            tl.to(
              curvePath,
              {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.inOut",
              },
              0.3,
            );
          }

          /* curve dots appear */

          if (curveDots.length) {
            tl.to(
              curveDots,
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.15,
                ease: "power2.out",
              },
              1.1,
            );
          }

          observer.disconnect();
        },
        {
          threshold: 0.35,
        },
      );

    observer.observe(
      sectionRef.current,
    );

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  /* =========================
     STATUS SCREEN ANIMATION
  ========================= */

  useEffect(() => {
    if (
      isWriting ||
      !terminalRef.current
    ) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) return;

    const animationTimer =
      window.setTimeout(() => {
        if (!terminalRef.current) {
          return;
        }

        const lines =
          terminalRef.current.querySelectorAll(
            ".contact-terminal-line",
          );

        const cursor =
          terminalRef.current.querySelector(
            ".contact-terminal-cursor-mark",
          );

        if (!lines.length) {
          return;
        }

        const ctx = gsap.context(() => {
          gsap.fromTo(
            lines,
            {
              opacity: 0,
              y: 6,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.18,
              ease: "power2.out",
            },
          );

          if (cursor) {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.55,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)",
            });
          }
        }, terminalRef);

        return () => ctx.revert();
      }, 260);

    return () => {
      window.clearTimeout(
        animationTimer,
      );
    };
  }, [isWriting]);

  /* =========================
     CONTACT FORM SUBMIT
  ========================= */

  const handleSubmit:
    FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();

      setSubmitError("");
      setIsSubmitting(true);

      const form =
        event.currentTarget;

      const formData =
        new FormData(form);

      const payload = {
        name:
          formData
            .get("name")
            ?.toString()
            .trim() ?? "",

        email:
          formData
            .get("email")
            ?.toString()
            .trim() ?? "",

        message:
          formData
            .get("message")
            ?.toString()
            .trim() ?? "",
      };

      try {
        const response =
          await fetch(
            "/api/contact",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload,
                ),
            },
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to send message.",
          );
        }

        form.reset();

        setIsWriting(false);
      } catch (error) {
        console.error(
          "Contact form error:",
          error,
        );

        setSubmitError(
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
    >
      <div className="contact-inner">
        {/* =========================
            LEFT COPY
        ========================= */}

        <motion.div
          className="contact-copy"
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
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <p className="contact-kicker">
            &gt; one last thing _
          </p>

          <h2>
            LET&apos;S MAKE
            <br />
            SOMETHING
            <span>GOOD.</span>
          </h2>

          <p className="contact-lead">
            I&apos;m open to freelance
            work, remote opportunities,
            and interesting projects that
            need both thoughtful
            development and a good eye for
            the details.
          </p>

          {/* =========================
              SOCIAL LINKS
          ========================= */}

          <div className="contact-socials">
            <a
              href="https://github.com/fatimaanani"
              target="_blank"
              rel="noreferrer"
              className="contact-social contact-social-github"
              aria-label="GitHub"
            >
              <span className="contact-social-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
              </span>

              <span>github</span>

              <span
                className="contact-social-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/fatimaanani02/"
              target="_blank"
              rel="noreferrer"
              className="contact-social contact-social-linkedin"
              aria-label="LinkedIn"
            >
              <span className="contact-social-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M5.37 3.5A2.18 2.18 0 1 1 5.36 7.86 2.18 2.18 0 0 1 5.37 3.5ZM3.48 9.47h3.77V20.5H3.48V9.47Zm5.99 0h3.61v1.51h.05c.5-.95 1.73-1.96 3.56-1.96 3.81 0 4.51 2.51 4.51 5.77v5.71h-3.76v-5.06c0-1.21-.02-2.76-1.68-2.76-1.68 0-1.94 1.31-1.94 2.67v5.15H9.47V9.47Z"
                  />
                </svg>
              </span>

              <span>linkedin</span>

              <span
                className="contact-social-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>

          {/* =========================
              CONTACT DETAILS
          ========================= */}

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">
                email
              </span>

              <a href="mailto:fatimaanani02@gmail.com">
                fatimaanani02@gmail.com
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">
                phone
              </span>

              <a href="tel:+96181881046">
                +961 81 881 046
              </a>
            </div>
          </div>
        </motion.div>

        {/* =========================
            TERMINAL
        ========================= */}

        <motion.div
          className="contact-side"
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
            delay: 0.08,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <div
            ref={terminalRef}
            className="contact-terminal"
          >
            {/* TOP BAR */}

            <div className="contact-terminal-top">
              <span>
                {isWriting
                  ? "CONTACT / NEW_MESSAGE"
                  : "CONTACT"}
              </span>

              <div className="contact-terminal-dots">
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* TERMINAL BODY */}

            <div className="contact-terminal-body">
              <AnimatePresence mode="wait">
                {/* INTERACTIVE FORM */}

                {isWriting && (
                  <motion.form
                    key="form"
                    className="contact-form"
                    onSubmit={
                      handleSubmit
                    }
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                  >
                    <label className="contact-field">
                      <span>
                        <strong>
                          &gt;
                        </strong>{" "}
                        name
                      </span>

                      <input
                        type="text"
                        name="name"
                        placeholder="your name"
                        required
                        disabled={
                          isSubmitting
                        }
                      />
                    </label>

                    <label className="contact-field">
                      <span>
                        <strong>
                          &gt;
                        </strong>{" "}
                        email
                      </span>

                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        disabled={
                          isSubmitting
                        }
                      />
                    </label>

                    <label className="contact-field">
                      <span>
                        <strong>
                          &gt;
                        </strong>{" "}
                        message
                      </span>

                      <textarea
                        name="message"
                        placeholder="tell me about your project..."
                        rows={4}
                        required
                        disabled={
                          isSubmitting
                        }
                      />
                    </label>

                    <div className="contact-form-actions">
                      <button
                        type="submit"
                        className="contact-send"
                        disabled={
                          isSubmitting
                        }
                      >
                        {isSubmitting
                          ? "[ sending... ]"
                          : "[ send message ]"}
                      </button>

                      {submitError && (
                        <p className="contact-form-error">
                          {
                            submitError
                          }
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}

                {/* STATIC STATUS */}

                {!isWriting && (
                  <motion.div
                    key="static"
                    className="contact-terminal-content"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                  >
                    <p className="contact-terminal-line">
                      <span>
                        &gt;
                      </span>{" "}
                      status
                    </p>

                    <p className="terminal-response contact-terminal-line">
                      available for
                      interesting things ✦
                    </p>

                    <p className="contact-terminal-line">
                      <span>
                        &gt;
                      </span>{" "}
                      location
                    </p>

                    <p className="terminal-response contact-terminal-line">
                      Beirut, Lebanon
                    </p>

                    <p className="contact-terminal-line">
                      <span>
                        &gt;
                      </span>{" "}
                      currently_open_to
                    </p>

                    <p className="terminal-response contact-terminal-line">
                      freelance · remote
                      opportunities
                    </p>

                    <div className="contact-terminal-action contact-terminal-line">
                      <span
                        className="contact-terminal-prompt"
                        aria-hidden="true"
                      >
                        &gt;
                      </span>

                      <button
                        type="button"
                        className="contact-terminal-message-btn"
                        onClick={() => {
                          setSubmitError(
                            "",
                          );

                          setIsWriting(
                            true,
                          );
                        }}
                      >
                        [ send a message ]
                      </button>

                      <span
                        className="contact-terminal-cursor-mark"
                        aria-hidden="true"
                      >
                        _
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DECORATIONS */}

            <span className="contact-sparkle sparkle-one">
              ✦
            </span>

            <span className="contact-sparkle sparkle-two">
              ✧
            </span>

            <svg
              className="contact-curve"
              viewBox="0 0 180 120"
              aria-hidden="true"
            >
              <path d="M8 88 C44 14 101 119 170 35" />

              <circle
                cx="43"
                cy="49"
                r="3"
              />

              <circle
                cx="128"
                cy="69"
                r="2.5"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}