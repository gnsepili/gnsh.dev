import { Newsletter } from "@/components/newsletter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — Ganesh Epili",
  description: "Subscribe to get posts on AI, NLP, and engineering.",
};

export default function NewsletterPage() {
  return <Newsletter />;
}
