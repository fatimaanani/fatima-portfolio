"use client";

import { motion } from "motion/react";

import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span>fatima.anani</span>
          <span>© 2026</span>
        </div>

        <p className="footer-center">
          designed &amp; built with curiosity ✦
        </p>

        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span>back to top</span>

          <motion.span
            className="back-to-top-arrow"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↑
          </motion.span>
        </button>
      </div>
    </footer>
  );
}