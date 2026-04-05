"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 max-w-2xl mx-auto px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-mono text-muted mb-8">Contact</h2>

        <p className="text-muted leading-relaxed mb-8">
          Open to discussing AI research, collaborations, or interesting problems.
          Reach out — I&apos;d love to hear from you.
        </p>

        <div className="space-y-3">
          <a
            href="mailto:ganeshepili1998@gmail.com"
            className="block text-accent hover:text-foreground transition-colors duration-200"
          >
            ganeshepili1998@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-accent hover:text-foreground transition-colors duration-200"
          >
            LinkedIn &rarr;
          </a>
          <a
            href="https://github.com/ganeshepili"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-accent hover:text-foreground transition-colors duration-200"
          >
            GitHub &rarr;
          </a>
        </div>
      </motion.div>

      <div className="mt-32 pt-6 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-xs text-muted/40 font-mono">
        <span>&copy; {new Date().getFullYear()} Ganesh Epili</span>
        <span>Bengaluru, India</span>
      </div>
    </section>
  );
}
