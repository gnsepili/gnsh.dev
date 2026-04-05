import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ganesh Epili",
  description: "AI Engineer specializing in NLP, LLMs, and Generative AI.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Contact />
    </>
  );
}
