"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";

type GlitchBlock = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
};

type LoadingScreenProps = {
  onComplete?: () => void;
};

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("> initializing interface...");
  const [blocks, setBlocks] = useState<GlitchBlock[]>([]);

  useEffect(() => {
    setBlocks(
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: 4 + Math.random() * 28,
        height: 2 + Math.random() * 10,
        delay: Math.random() * 1.2,
      }))
    );
  }, []);

  useEffect(() => {
    if (
      blocks.length === 0 ||
      !screenRef.current ||
      !progressRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });

      gsap.set(".loading-glitch-block", {
        opacity: 0,
        x: 0,
      });

      gsap.to(".loading-glitch-block", {
        opacity: () => gsap.utils.random(0.15, 0.9),
        duration: 0.06,
        stagger: {
          each: 0.01,
          from: "random",
        },
        repeat: 10,
        yoyo: true,
        ease: "none",
      });

      gsap.to(".loading-glitch-block", {
        x: () => gsap.utils.random(-18, 18),
        duration: 0.08,
        repeat: 9,
        yoyo: true,
        ease: "steps(1)",
      });

      tl.to(progressRef.current, {
        width: "38%",
        duration: 0.35,
        ease: "power2.out",
      });

      tl.call(() => {
        setStatus("> loading modules...");
      });

      tl.to(progressRef.current, {
        width: "68%",
        duration: 0.35,
        ease: "power2.out",
      });

      tl.call(() => {
        setStatus("> syncing interface...");
      });

      tl.to(progressRef.current, {
        width: "92%",
        duration: 0.3,
        ease: "power2.out",
      });

      tl.call(() => {
        setStatus("> system ready.");
      });

      tl.to(progressRef.current, {
        width: "100%",
        duration: 0.22,
        ease: "power2.out",
      });

      tl.to(".loading-terminal", {
        opacity: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
      });

      tl.to(screenRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }, screenRef);

    return () => ctx.revert();
  }, [blocks, onComplete]);

  if (!visible) return null;

  return (
    <div ref={screenRef} className="loading-screen">
      <div className="loading-noise" />

      <div className="loading-glitch-layer" aria-hidden="true">
        {blocks.map((block) => (
          <span
            key={block.id}
            className="loading-glitch-block"
            style={{
              left: `${block.left}%`,
              top: `${block.top}%`,
              width: `${block.width}px`,
              height: `${block.height}px`,
              animationDelay: `${block.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="loading-scanline" />

      <div className="loading-terminal">
        <div className="loading-terminal-top">
          <span>SYS / FATIMA.ANANI</span>
          <span>BOOT_01</span>
        </div>

        <div className="loading-terminal-body">
          <p className="loading-label">INITIALIZING PORTFOLIO</p>

          <div className="loading-bar-shell">
            <div ref={progressRef} className="loading-bar-fill" />
          </div>

          <p className="loading-status">{status}</p>
        </div>
      </div>
    </div>
  );
}