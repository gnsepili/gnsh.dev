import { Projects } from "@/components/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Ganesh Epili",
  description: "Selected AI and NLP projects.",
};

export default function ProjectsPage() {
  return <Projects />;
}
