"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 80, color: "rgba(139, 92, 246, 0.08)", x: "10%", y: "20%", delay: 0 },
  { size: 120, color: "rgba(34, 211, 238, 0.06)", x: "80%", y: "15%", delay: 1 },
  { size: 60, color: "rgba(244, 114, 182, 0.07)", x: "70%", y: "70%", delay: 2 },
  { size: 90, color: "rgba(52, 211, 153, 0.05)", x: "15%", y: "75%", delay: 3 },
  { size: 50, color: "rgba(139, 92, 246, 0.06)", x: "50%", y: "40%", delay: 1.5 },
];

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -5, 15, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
