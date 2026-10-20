"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedEyeballToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
}

export function AnimatedEyeballToggle({
  isVisible,
  onToggle,
  className = "",
}: AnimatedEyeballToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseDown={(e) => {
        // Prevent stealing focus from the password input
        e.preventDefault();
      }}
      aria-label={isVisible ? "Hide password" : "Show password"}
      aria-pressed={isVisible}
      title={isVisible ? "Hide password" : "Show password"}
      className={`relative p-2 rounded-xl text-blue-400 hover:text-cyan-300 hover:bg-blue-900/40 active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer select-none z-20 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Iris Glow Gradient */}
            <linearGradient id="irisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0070d1" />
            </linearGradient>

            <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Eye Outline (Almond Shape) */}
          <motion.path
            d="M 2 12 C 5 6, 19 6, 22 12 C 19 18, 5 18, 2 12 Z"
            stroke={isVisible ? "#22d3ee" : "#60a5fa"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              stroke: isVisible ? "#22d3ee" : "#60a5fa",
              opacity: isVisible ? 1 : 0.85,
            }}
            transition={{ duration: 0.2 }}
            filter={isVisible ? "url(#eyeGlow)" : undefined}
          />

          {/* Iris and Pupil (Eyeball Center) */}
          <AnimatePresence>
            {isVisible && (
              <motion.g
                key="eyeball-pupil"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                style={{ originX: "12px", originY: "12px" }}
              >
                {/* Iris */}
                <circle cx="12" cy="12" r="4.2" fill="url(#irisGrad)" />

                {/* Dark Pupil */}
                <circle cx="12" cy="12" r="2.2" fill="#040817" />

                {/* White Glint Highlight */}
                <circle cx="10.5" cy="10.5" r="1.1" fill="#ffffff" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* When Hidden: Resting Pupil Dot */}
          {!isVisible && (
            <motion.circle
              cx="12"
              cy="12"
              r="2.5"
              fill="#60a5fa"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
            />
          )}

          {/* Slash Line (Draws smoothly across when hidden) */}
          <AnimatePresence>
            {!isVisible && (
              <motion.line
                x1="4"
                y1="4"
                x2="20"
                y2="20"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>
    </button>
  );
}
