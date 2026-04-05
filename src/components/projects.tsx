"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "RepoRAG",
    description:
      "RAG-based solution for repository-level code generation. Overcomes LLM context length limits for debugging and code synthesis.",
    tags: ["RAG", "LLMs", "Research"],
    note: "Paper under review",
  },
  {
    title: "IndicTranse",
    description:
      "Voice-to-voice translation for Indian languages. Fine-tuned phi-2 2.7B on AI4Bharat, with real-time ASR and TTS.",
    tags: ["Fine-tuning", "ASR", "TTS"],
  },
  {
    title: "IntellectRAG",
    description:
      "RAG-enhanced Q&A with Mistral 7B across documents, webpages, and YouTube transcripts.",
    tags: ["RAG", "Mistral 7B"],
  },
  {
    title: "NaturalSQL",
    description:
      "Transformer model trained from scratch on WikiSQL to convert natural language to SQL.",
    tags: ["Transformers", "NL2SQL"],
  },
  {
    title: "DetectGPT",
    description:
      "Zero-shot AI text detection using probability curvature. Implementation of the DetectGPT paper.",
    tags: ["Detection", "Zero-shot"],
  },
  {
    title: "FIRE Leaderboard",
    description:
      "Leaderboard platform for the FIRE conference. FastAPI + MySQL for model evaluation and ranking.",
    tags: ["FastAPI", "Full-stack"],
  },
];

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="pt-28 pb-24 max-w-2xl mx-auto px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-mono text-muted mb-10">Projects</h2>

        <div className="space-y-1">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.06,
                duration: 0.45,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="group py-5 border-b border-[rgba(255,255,255,0.05)] last:border-0"
            >
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                {project.note && (
                  <span className="text-[11px] font-mono text-accent/80 shrink-0 mt-0.5">
                    {project.note}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-2.5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-muted/50"
                  >
                    {tag}
                    {tag !== project.tags[project.tags.length - 1] && (
                      <span className="ml-1.5 text-[rgba(255,255,255,0.15)]">/</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
