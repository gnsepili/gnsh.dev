import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gnsh.dev"),
  title: {
    default: "Ganesh Epili — AI Engineer",
    template: "%s — Ganesh Epili",
  },
  description:
    "AI Engineer specializing in NLP, LLMs, and Generative AI. Building intelligent systems that solve real-world problems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gnsh.dev",
    siteName: "Ganesh Epili",
    title: "Ganesh Epili — AI Engineer",
    description:
      "AI Engineer specializing in NLP, LLMs, and Generative AI. Building intelligent systems that solve real-world problems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Epili — AI Engineer",
    description:
      "AI Engineer specializing in NLP, LLMs, and Generative AI. Building intelligent systems that solve real-world problems.",
  },
  alternates: {
    canonical: "https://gnsh.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#000] text-[#e8e8e8]">
        <div className="grid-bg" />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
