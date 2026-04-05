"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 max-w-2xl mx-auto px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-mono text-muted mb-10">Blog</h2>

        {posts.length === 0 ? (
          <p className="text-muted/50">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-1">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.45,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </h3>
                    <span className="text-xs font-mono text-muted/40 shrink-0">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted/60 mt-1 leading-relaxed">
                    {post.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
