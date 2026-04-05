"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CommandPalette } from "@/components/command-palette";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About Me" },
];

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000]/80 backdrop-blur-md">
        <nav className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-foreground tracking-tight"
          >
            Ganesh Epili
          </Link>

          <ul className="flex items-center gap-5">
            <li>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                <Search size={14} />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-muted/40 border border-[rgba(255,255,255,0.08)] rounded px-1.5 py-0.5 ml-1">
                  <span className="text-[11px]">&#x2318;</span>K
                </kbd>
              </button>
            </li>
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/blog" && pathname.startsWith("/blog"));
              return (
                <li key={link.href} className="hidden sm:block">
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
