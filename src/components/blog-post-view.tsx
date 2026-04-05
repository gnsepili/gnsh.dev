"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { useEffect, useState } from "react";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    remark()
      .use(remarkHtml)
      .process(post.content)
      .then((result) => setHtmlContent(String(result)));
  }, [post.content]);

  return (
    <section className="pt-28 pb-24 max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blog"
          className="text-sm text-muted hover:text-foreground transition-colors duration-200 mb-10 inline-block"
        >
          &larr; Blog
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono text-muted/50">
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <hr className="border-[rgba(255,255,255,0.06)] mt-8" />
        </header>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </motion.div>
    </section>
  );
}
