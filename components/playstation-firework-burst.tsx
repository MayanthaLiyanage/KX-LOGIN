"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  PSShapeTriangle,
  PSShapeCircle,
  PSShapeCross,
  PSShapeSquare,
} from "./playstation-shapes";

interface Particle {
  id: number;
  type: "triangle" | "circle" | "cross" | "square" | "sparkle";
  targetX: number;
  targetY: number;
  scale: number;
  rotate: number;
  duration: number;
  delay: number;
  sizeClass: string;
}

export function PlayStationFireworkBurst({ active = true }: { active?: boolean }) {
  // Precompute 32 radial firework trajectory points with a compact, refined spread
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    const count = 32;
    const types: Array<"triangle" | "circle" | "cross" | "square" | "sparkle"> = [
      "triangle",
      "circle",
      "cross",
      "square",
      "sparkle",
    ];

    for (let i = 0; i < count; i++) {
      // Full 360-degree radial distribution with natural organic scatter
      const angle = (i / count) * 2 * Math.PI + (Math.sin(i * 3.7) * 0.25);
      // Compact spread distance bursting outward from the center (approx 65px to 165px)
      const distance = 75 + (i % 6) * 15 + Math.cos(i * 2.3) * 12;
      const targetX = Math.round(Math.cos(angle) * distance);
      const targetY = Math.round(Math.sin(angle) * distance);

      const type = types[i % types.length];
      const sizeVariants = ["w-4 h-4", "w-5 h-5", "w-4.5 h-4.5", "w-3.5 h-3.5"];
      const sizeClass = sizeVariants[i % sizeVariants.length];

      list.push({
        id: i,
        type,
        targetX,
        targetY,
        scale: 0.8 + (i % 4) * 0.12,
        rotate: (i % 2 === 0 ? 1 : -1) * (140 + (i % 6) * 60),
        duration: 1.5 + (i % 3) * 0.2,
        delay: (i % 5) * 0.04,
        sizeClass,
      });
    }

    return list;
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible">
      {/* Radiant Central Flash - Soft, subtle, circular light burst (no boxes or borders) */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-blue-400/30 via-cyan-300/40 to-indigo-400/30 blur-xl pointer-events-none"
      />

      {/* Outward Firework Bloom Shapes - PlayStation Symbols */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{
            x: 0,
            y: 0,
            scale: 0.15,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: p.targetX,
            y: p.targetY,
            scale: [0.2, p.scale, p.scale * 0.85, 0],
            opacity: [0, 1, 0.9, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1], // Natural firework burst deceleration curve
            times: [0, 0.18, 0.72, 1],
          }}
        >
          {p.type === "triangle" && (
            <PSShapeTriangle className={p.sizeClass} glow />
          )}
          {p.type === "circle" && (
            <PSShapeCircle className={p.sizeClass} glow />
          )}
          {p.type === "cross" && (
            <PSShapeCross className={p.sizeClass} glow />
          )}
          {p.type === "square" && (
            <PSShapeSquare className={p.sizeClass} glow />
          )}
          {p.type === "sparkle" && (
            <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
