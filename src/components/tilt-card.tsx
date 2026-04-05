"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltAmount?: number;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.15)",
  tiltAmount = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const glowX = useSpring(50, { stiffness: 200, damping: 20 });
  const glowY = useSpring(50, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      rotateX.set((y - 0.5) * -tiltAmount);
      rotateY.set((x - 0.5) * tiltAmount);
      glowX.set(x * 100);
      glowY.set(y * 100);

      el.style.setProperty("--mouse-x", `${x * 100}%`);
      el.style.setProperty("--mouse-y", `${y * 100}%`);
    },
    [rotateX, rotateY, glowX, glowY, tiltAmount]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  }, [rotateX, rotateY, glowX, glowY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`glow-card ${className}`}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      <div style={{ transform: "translateZ(0)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
