"use client";

import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Mail, MapPin, Briefcase, GraduationCap, FileDown } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center max-w-2xl mx-auto px-6 py-24">
      {/* Main heading — large italic serif */}
      <motion.h1
        custom={1}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="font-serif italic text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
      >
        Solving hard problems
        <br />
        with intelligent systems.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        custom={2}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="text-xs font-mono uppercase tracking-[0.15em] text-muted/60 mb-8"
      >
        Ganesh Epili &mdash; AI Engineer &amp; NLP Researcher
      </motion.p>

      {/* Bio */}
      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="text-muted text-[15px] leading-relaxed max-w-lg mb-4 space-y-4"
      >
        <p>
          I build <span className="text-accent">AI systems</span> that work in the real world.
          People{" "}
          <a
            href="/projects"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors duration-200"
          >
            know me for
          </a>{" "}
          turning research into production &mdash; LLMs, RAG pipelines, and NLP
          systems that go from paper to deployment.
        </p>

        <p>
          &mdash; Follow along on{" "}
          <a
            href="https://github.com/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent border-b border-accent/30 hover:border-accent transition-colors duration-200"
          >
            the internet.
          </a>
        </p>
      </motion.div>

      {/* Resume download */}
      <motion.div
        custom={4}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <a
          href="/resume.pdf"
          download
          className="group inline-flex items-center gap-2 text-sm font-mono text-muted/50 hover:text-foreground transition-colors duration-200"
        >
          <FileDown size={14} />
          <span className="border-b border-transparent group-hover:border-current transition-colors duration-200">
            Download Resume
          </span>
        </a>
      </motion.div>

      {/* Status items — matching the screenshot style */}
      <motion.div
        custom={5}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2.5 text-xs font-mono uppercase tracking-[0.12em] text-muted/50"
      >
        <div className="flex items-center gap-2.5">
          <MapPin size={13} className="text-accent/60" />
          <span>Bengaluru, India</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Briefcase size={13} className="text-accent/60" />
          <span>AI Engineer &middot; NLP Researcher</span>
        </div>
        <div className="flex items-center gap-2.5">
          <GraduationCap size={13} className="text-accent/60" />
          <span>M.Tech @ DAIICT</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <a
            href="https://github.com/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted/40 hover:text-foreground transition-colors duration-200"
          >
            <GitHubIcon size={15} />
          </a>
          <a
            href="https://linkedin.com/in/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted/40 hover:text-foreground transition-colors duration-200"
          >
            <LinkedInIcon size={15} />
          </a>
          <a
            href="mailto:ganeshepili1998@gmail.com"
            aria-label="Email"
            className="text-muted/40 hover:text-foreground transition-colors duration-200"
          >
            <Mail size={15} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
