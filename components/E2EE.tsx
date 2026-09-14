"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import "./E2EE.css";

export default function E2EE() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isInView = useInView(sectionRef, {
    amount: 0.45,
  });

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (isInView) {
      video.play().catch(() => {
        // Browser autoplay restrictions can occasionally reject play().
        // The video is muted, so this should normally succeed.
      });
    } else {
      video.pause();
    }
  }, [isInView, reduceMotion]);

  return (
    <motion.div
      ref={sectionRef}
      className="e2ee-demo"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="e2ee-window">
        <div className="e2ee-window-top">
          <div className="e2ee-window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="e2ee-window-title">
            e2ee visualizer / live demo
          </div>

          <div className="e2ee-window-status">
            <span
              className="e2ee-window-status-dot"
              aria-hidden="true"
            />
            encrypted
          </div>
        </div>

        <div className="e2ee-video-stage">
          <video
            ref={videoRef}
            className="e2ee-video"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="End-to-end encryption visualizer demonstration"
          >
            <source
              src="/Projects/E2EE/e2ee-demo.mp4"
              type="video/mp4"
            />

            Your browser does not support the video element.
          </video>

          <div
            className="e2ee-video-glow"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="e2ee-demo-footer">
        <div className="e2ee-demo-flow">
          <span>plaintext</span>
          <span aria-hidden="true">→</span>
          <span>encrypt</span>
          <span aria-hidden="true">→</span>
          <span>transmit</span>
          <span aria-hidden="true">→</span>
          <span>decrypt</span>
        </div>

        <span className="e2ee-demo-caption">
          interactive encryption flow
        </span>
      </div>
    </motion.div>
  );
}