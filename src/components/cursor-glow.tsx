"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const springX = useSpring(0, { stiffness: 100, damping: 25 });
  const springY = useSpring(0, { stiffness: 100, damping: 25 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, rgba(34, 211, 238, 0.02) 30%, transparent 60%)",
        filter: "blur(1px)",
      }}
    />
  );
}
