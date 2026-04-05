"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

const techStack = {
  "Machine Learning": [
    "PyTorch", "TensorFlow", "Transformers", "LangChain",
    "scikit-learn", "Spacy", "NLTK", "Hugging Face",
  ],
  "LLMs & GenAI": [
    "RAG", "RLHF", "Fine-tuning", "Prompt Engineering",
    "Mistral", "LLaMA", "GPT", "Phi-2",
  ],
  "Data & Infra": [
    "PostgreSQL", "MongoDB", "Pinecone", "ChromaDB",
    "Elasticsearch", "PySpark", "Kafka", "Redis",
  ],
  "Cloud & DevOps": [
    "AWS SageMaker", "Azure ML", "GCP Vertex AI",
    "Docker", "MLflow", "WandB", "Git", "Linux",
  ],
  "Languages & Web": [
    "Python", "JavaScript", "C++", "FastAPI",
    "Node.js", "Next.js", "Tailwind CSS",
  ],
};

export function About() {
  return (
    <section className="pt-28 pb-24 max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Identity block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-10">
          {/* Circular avatar placeholder — replace src with your photo */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] shrink-0">
            <Image
              src="/profile.png"
              alt="Ganesh Epili"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Ganesh Epili</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs font-mono text-muted/60">
              <span>Bengaluru, India</span>
              <span className="text-[rgba(255,255,255,0.15)]">/</span>
              <span>AI Engineer</span>
              <span className="text-[rgba(255,255,255,0.15)]">/</span>
              <span>NLP</span>
              <span className="text-[rgba(255,255,255,0.15)]">/</span>
              <span>LLMs</span>
              <span className="text-[rgba(255,255,255,0.15)]">/</span>
              <span>M.Tech @ DAIICT</span>
            </div>
          </div>
        </div>

        {/* Resume download */}
        <a
          href="/resume.pdf"
          download
          className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-muted border border-[rgba(255,255,255,0.1)] rounded-lg hover:text-foreground hover:border-[rgba(255,255,255,0.2)] transition-all duration-200 mb-10"
        >
          <Download size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          Download Resume
        </a>

        {/* Bio */}
        <div className="space-y-5 text-muted leading-relaxed mb-16">
          <p>
            Hello, my name is Ganesh. I&apos;m an AI Engineer and NLP Researcher
            at IRLP Lab, DAIICT, where I build intelligent systems that bridge
            the gap between cutting-edge research and real-world applications.
            My focus is on making Large Language Models practical, reliable,
            and accessible.
          </p>

          <p>
            My research centers on Retrieval-Augmented Generation and
            repository-level code understanding. I&apos;m currently working on
            RepoRAG — a system that overcomes context length limitations of
            LLMs to enable code generation and debugging across entire
            repositories. The paper is under review.
          </p>

          <p>
            I&apos;ve also built IndicTranse, a voice-to-voice translation
            platform for Indian languages using a fine-tuned phi-2 2.7B model
            with real-time ASR and TTS, and IntellectRAG, a multi-source Q&amp;A
            system powered by Mistral 7B that works across documents, webpages,
            and YouTube transcripts.
          </p>

          <p>
            Before research, I worked as a Backend/ML Intern at Jungleworks
            (Jugnoo), where I built a platform for creating custom chatbots on
            client data using Node.js and RASA. I was awarded Best Employee for
            this work. I also developed interactive analytics dashboards and
            optimized the codebase to reduce graph loading time by 70%.
          </p>

          <p>
            On this site, I write about AI, NLP, and lessons learned from
            building systems that go from research papers to production — a
            practice I plan to continue daily.
          </p>
        </div>

        {/* Technologies */}
        <h2 className="text-sm font-mono text-muted mb-2">Technologies</h2>
        <p className="text-sm text-muted/50 mb-8 leading-relaxed">
          Frameworks, libraries, and tools I regularly use and enjoy working with.
          See more on my{" "}
          <a
            href="https://github.com/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-foreground transition-colors duration-200"
          >
            GitHub
          </a>.
        </p>

        <div className="space-y-6">
          {Object.entries(techStack).map(([category, tools], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + catIdx * 0.08, duration: 0.5 }}
            >
              <h3 className="text-xs font-mono text-muted/40 mb-2.5 uppercase tracking-wider">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono text-muted/70 px-2.5 py-1 rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] hover:text-muted transition-all duration-200"
                  >
                    {tool}
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
