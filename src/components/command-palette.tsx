"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, FolderOpen, ArrowRight } from "lucide-react";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "blog" | "project";
}

const items: SearchItem[] = [
  {
    title: "RepoRAG",
    description: "RAG for repository-level code generation",
    href: "/projects",
    type: "project",
  },
  {
    title: "IndicTranse",
    description: "Voice-to-voice translation for Indian languages",
    href: "/projects",
    type: "project",
  },
  {
    title: "IntellectRAG",
    description: "RAG-enhanced Q&A with Mistral 7B",
    href: "/projects",
    type: "project",
  },
  {
    title: "NaturalSQL",
    description: "Natural language to SQL with Transformers",
    href: "/projects",
    type: "project",
  },
  {
    title: "DetectGPT",
    description: "Zero-shot AI text detection",
    href: "/projects",
    type: "project",
  },
  {
    title: "FIRE Leaderboard",
    description: "Conference leaderboard platform",
    href: "/projects",
    type: "project",
  },
  {
    title: "Hello World: Why I'm Starting a Daily Blog",
    description: "Kicking off my daily writing practice",
    href: "/blog/hello-world",
    type: "blog",
  },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const navigate = useCallback(
    (href: string) => {
      onClose();
      setQuery("");
      router.push(href);
    },
    [onClose, router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // parent will handle opening
          document.dispatchEvent(new CustomEvent("open-search"));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Global ⌘K listener for opening
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        navigate(filtered[activeIndex].href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, filtered, activeIndex, navigate]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-0"
          >
            <div className="bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-2xl">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                <Search size={16} className="text-muted/50 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blog posts and projects..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/30 outline-none font-[family-name:var(--font-mono)]"
                />
                <kbd className="text-[10px] font-mono text-muted/30 border border-[rgba(255,255,255,0.06)] rounded px-1.5 py-0.5">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-sm text-muted/40 px-4 py-6 text-center">
                    No results found.
                  </p>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={item.title}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                        i === activeIndex
                          ? "bg-[rgba(255,255,255,0.05)]"
                          : ""
                      }`}
                    >
                      {item.type === "blog" ? (
                        <FileText size={14} className="text-muted/40 shrink-0" />
                      ) : (
                        <FolderOpen size={14} className="text-muted/40 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted/40 truncate">
                          {item.description}
                        </p>
                      </div>
                      {i === activeIndex && (
                        <ArrowRight size={12} className="text-muted/30 shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
