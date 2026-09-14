"use client";

import { motion } from "motion/react";
import "./EmotionClassifier.css";

const emotions = [
  "sadness",
  "joy",
  "love",
  "anger",
  "fear",
  "surprise",
];

const models = [
  {
    name: "Logistic Regression",
    accuracy: "89.19%",
    weightedF1: "89.12%",
    macroF1: 85,
  },
  {
    name: "Naive Bayes",
    accuracy: "76.97%",
    weightedF1: "73.79%",
    macroF1: 51,
  },
];

export default function EmotionClassifier() {
  return (
    <motion.div
      className="emotion-demo"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="emotion-terminal">
        <div className="emotion-terminal-top">
          <div
            className="emotion-terminal-dots"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <span className="emotion-terminal-title">
            emotion_classifier.py
          </span>

          <span className="emotion-terminal-status">
            <span
              className="emotion-status-dot"
              aria-hidden="true"
            />
            trained
          </span>
        </div>

        <div className="emotion-terminal-body">
          <div className="emotion-command">
            <span className="emotion-prompt">&gt;</span>

            <span>evaluate_models()</span>
          </div>

          <div className="emotion-models">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                className={`emotion-model ${
                  index === 0 ? "best" : ""
                }`}
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
                  duration: 0.4,
                  delay: 0.08 + index * 0.08,
                }}
              >
                <div className="emotion-model-heading">
                  <span>{model.name}</span>

                  {index === 0 && (
                    <span className="emotion-best-label">
                      best model
                    </span>
                  )}
                </div>

                <div className="emotion-metrics">
                  <div>
                    <span>accuracy</span>
                    <strong>{model.accuracy}</strong>
                  </div>

                  <div>
                    <span>weighted f1</span>
                    <strong>{model.weightedF1}</strong>
                  </div>
                </div>

                <div className="emotion-score">
                  <div className="emotion-score-label">
                    <span>macro f1</span>
                    <span>{model.macroF1 / 100}</span>
                  </div>

                  <div className="emotion-score-track">
                    <motion.div
                      className="emotion-score-fill"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${model.macroF1}%`,
                      }}
                      viewport={{
                        once: false,
                        amount: 0.5,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="emotion-divider" />

          <div className="emotion-command">
            <span className="emotion-prompt">&gt;</span>

            <span>predict_emotion(sentence)</span>
          </div>

          <div className="emotion-prediction">
            <span className="emotion-input-label">
              input
            </span>

            <p>
              &quot;Something about walking through that
              empty building made me feel like I
              shouldn&apos;t be there&quot;
            </p>

            <div className="emotion-result">
              <span>Predicted Emotion:</span>

              <motion.strong
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.8,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.3,
                }}
              >
                fear
              </motion.strong>
            </div>
          </div>
        </div>
      </div>

      <div className="emotion-meta">
        <div className="emotion-classes">
          {emotions.map((emotion) => (
            <span key={emotion}>
              {emotion}
            </span>
          ))}
        </div>

        <span className="emotion-test-size">
          test set · 83,225 samples
        </span>
      </div>
    </motion.div>
  );
}