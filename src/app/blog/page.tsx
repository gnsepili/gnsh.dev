import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/blog-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, NLP, LLMs, and building intelligent systems.",
  openGraph: {
    type: "website",
    title: "Blog — Ganesh Epili",
    description: "Thoughts on AI, NLP, LLMs, and building intelligent systems.",
    url: "https://gnsh.dev/blog",
  },
  alternates: {
    canonical: "https://gnsh.dev/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-28 pb-24 max-w-2xl mx-auto px-6">
      <h1 className="text-sm font-mono text-muted mb-10">Blog</h1>
      <BlogList posts={posts} />
    </section>
  );
}
