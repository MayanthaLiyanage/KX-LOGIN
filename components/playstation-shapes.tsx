"use client";

import React from "react";
import { motion } from "framer-motion";

// The 4 iconic PlayStation 2D shapes with official aesthetic colors
export function PSShapeTriangle({
  className = "w-6 h-6",
  glow = false,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${
        glow ? "drop-shadow-[0_0_10px_rgba(0,214,108,0.7)]" : ""
      }`}
      fill="none"
    >
      <polygon
        points="12,3.5 21,19.5 3,19.5"
        stroke="#00d66c"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PSShapeCircle({
  className = "w-6 h-6",
  glow = false,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${
        glow ? "drop-shadow-[0_0_10px_rgba(255,51,75,0.7)]" : ""
      }`}
      fill="none"
    >
      <circle cx="12" cy="12" r="8" stroke="#ff334b" strokeWidth="2.8" />
    </svg>
  );
}

export function PSShapeCross({
  className = "w-6 h-6",
  glow = false,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${
        glow ? "drop-shadow-[0_0_10px_rgba(0,144,255,0.7)]" : ""
      }`}
      fill="none"
    >
      <line
        x1="5"
        y1="5"
        x2="19"
        y2="19"
        stroke="#0090ff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1="19"
        y1="5"
        x2="5"
        y2="19"
        stroke="#0090ff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PSShapeSquare({
  className = "w-6 h-6",
  glow = false,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${
        glow ? "drop-shadow-[0_0_10px_rgba(255,51,136,0.7)]" : ""
      }`}
      fill="none"
    >
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="2.5"
        stroke="#ff3388"
        strokeWidth="2.8"
      />
    </svg>
  );
}

// Background Floating Animated PlayStation Shapes
export function PlayStationBackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Floating Triangle Top Left */}
      <motion.div
        className="absolute top-16 left-[12%] opacity-35"
        animate={{
          y: [-12, 12, -12],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <PSShapeTriangle className="w-16 h-16 sm:w-20 sm:h-20" glow />
      </motion.div>

      {/* Floating Circle Top Right */}
      <motion.div
        className="absolute top-24 right-[14%] opacity-30"
        animate={{
          y: [10, -10, 10],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PSShapeCircle className="w-14 h-14 sm:w-18 sm:h-18" glow />
      </motion.div>

      {/* Floating Cross Bottom Left */}
      <motion.div
        className="absolute bottom-24 left-[15%] opacity-30"
        animate={{
          y: [-8, 8, -8],
          rotate: [0, -35, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <PSShapeCross className="w-14 h-14 sm:w-16 sm:h-16" glow />
      </motion.div>

      {/* Floating Square Bottom Right */}
      <motion.div
        className="absolute bottom-28 right-[13%] opacity-30"
        animate={{
          y: [12, -12, 12],
          rotate: [0, 25, 0],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <PSShapeSquare className="w-16 h-16 sm:w-20 sm:h-20" glow />
      </motion.div>

      {/* Additional Subtle Micro Shapes for Depth */}
      <motion.div
        className="absolute top-1/2 left-[6%] opacity-20 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <PSShapeCircle className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[8%] opacity-20 hidden md:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <PSShapeTriangle className="w-11 h-11" />
      </motion.div>
    </div>
  );
}
