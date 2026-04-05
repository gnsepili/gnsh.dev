"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="pt-28 pb-24 max-w-2xl mx-auto px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-mono text-muted mb-8">Newsletter</h2>

        <p className="text-muted leading-relaxed mb-6 max-w-md">
          I write about AI, NLP, and lessons from building intelligent systems.
          Subscribe to get new posts delivered to your inbox.
        </p>

        {submitted ? (
          <p className="text-accent text-sm font-mono">
            Thanks for subscribing. Stay tuned.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3.5 py-2 text-sm text-foreground placeholder:text-muted/30 outline-none focus:border-[rgba(255,255,255,0.15)] transition-colors duration-200 font-[family-name:var(--font-mono)]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-[#000] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
