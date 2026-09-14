"use client";

import { motion } from "motion/react";

import Recall from "./Recall";
import Eunora from "./Eunora";
import E2EE from "./E2EE";
import EmotionClassifier from "./EmotionClassifier";

import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "Recall",
    type: "FLAGSHIP · AI / FULL-STACK",
    description:
      "A multimedia scene retrieval system that lets users locate moments inside video content using text or audio search.",
    stack:
      "React · FastAPI · PostgreSQL · pgvector · Elasticsearch · Whisper · Sentence Transformers · FFmpeg",
    href: "https://github.com/fatimaanani/Recall",
    featured: true,
  },
  {
    number: "02",
    title: "Eunora",
    type: "PRODUCTIVITY · .NET",
    description:
      "A database-backed productivity and study application with task management, search, status tracking and study-session tools.",
    stack:
      "C# · .NET · Windows Forms · Entity Framework Core · REST API · Swagger",
    href: "https://github.com/fatimaanani/Eunora",
  },
  {
    number: "03",
    title: "E2EE Visualizer",
    type: "EDUCATIONAL · WEB",
    description:
      "An interactive learning tool that visually explains how end-to-end encrypted messages move between sender, server and receiver.",
    stack:
      "Python · Flask · JavaScript · HTML · CSS",
    href: "https://github.com/fatimaanani/e2ee-visualizer",
  },
  {
    number: "04",
    title: "Emotion Classification",
    type: "NLP · MACHINE LEARNING",
    description:
      "A text-classification system trained to predict one of six emotion categories using classical machine-learning models.",
    stack:
      "Python · scikit-learn · Naive Bayes · Logistic Regression",
    href: "https://github.com/fatimaanani/nlp-emotion-classification",
  },
];

const viewportSettings = {
  once: false,
  amount: 0.3,
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-inner">
        <motion.div
          className="projects-heading"
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
          <p className="projects-kicker">
            &gt; selected work _
          </p>

          <h2>
            PROJECTS
            <span>✦</span>
          </h2>

          <p>
           Selected projects across full-stack development, mobile, and AI/NLP.
          </p>
        </motion.div>

        <div className="projects-layout">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className={`project-card ${
                project.featured ? "featured" : ""
              }`}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="project-card-header">
                <span className="project-number">
                  {project.number}
                </span>

                <span className="project-type">
                  {project.type}
                </span>
              </div>

              <div className="project-visual">
                {project.title === "Recall" ? (
                  <Recall />
                ) : project.title === "Eunora" ? (
                  <Eunora />
                ) : project.title === "E2EE Visualizer" ? (
                  <E2EE />
                ) : project.title === "Emotion Classification" ? (
                  <EmotionClassifier />
                ) : (
                  <div className="project-placeholder">
                    <span>{project.title}</span>

                    <span className="placeholder-cross">
                      +
                    </span>
                  </div>
                )}
              </div>

              <div className="project-copy">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-stack">
                  {project.stack}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  <span>view code</span>
                  <span>↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="projects-footer"
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.6,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>
            &gt; more experiments live on GitHub
          </span>

          <a
            href="https://github.com/fatimaanani"
            target="_blank"
            rel="noreferrer"
          >
            visit github ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}