"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-muted py-12">No posts yet. Check back soon.</p>
    );
  }

  return (
    <div className="space-y-1">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.06,
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group block py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <h2 className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h2>
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
  );
}
