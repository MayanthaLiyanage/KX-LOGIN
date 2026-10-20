"use client";

import React, { useState, useEffect } from "react";
import { GamingLoginCard } from "@/components/gaming-login-card";
import {
  PlayStationBackgroundShapes,
  PSShapeTriangle,
  PSShapeCircle,
  PSShapeCross,
  PSShapeSquare,
} from "@/components/playstation-shapes";
import { ShieldCheck, Wifi, Sparkles } from "lucide-react";
import { startPingMonitor } from "@/lib/ping";

export default function Home() {
  const [ping, setPing] = useState<number>(18);

  useEffect(() => {
    // Automatically updates the ping value in the background without reloading the webpage
    const stopMonitor = startPingMonitor((newPing) => {
      setPing(newPing);
    }, 2500);

    return stopMonitor;
  }, []);
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between text-slate-100 overflow-x-hidden font-sans selection:bg-blue-500 selection:text-white">
      {/* Dark Blue Ambient Radial Aura Background - Locked to viewport so it never shifts or stretches */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#060c24] via-[#080f2d] to-[#020512] overflow-hidden pointer-events-none -z-10">
        {/* Deep PlayStation Blue Radial Beams */}
        <div className="absolute -top-[25%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent blur-3xl" />
        <div className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] left-[20%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-t from-indigo-700/15 to-transparent blur-3xl" />

        {/* Minimalist 2D Tech Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0090ff 1.2px, transparent 1.2px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Animated PlayStation Shapes Floating Background */}
        <PlayStationBackgroundShapes />
      </div>

      {/* Minimalist Top Gaming Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand Logo with 4 PlayStation Shapes */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 shadow-[0_0_15px_rgba(0,112,209,0.2)]">
            <PSShapeTriangle className="w-4 h-4" glow />
            <PSShapeCircle className="w-4 h-4" glow />
            <PSShapeCross className="w-4 h-4" glow />
            <PSShapeSquare className="w-4 h-4" glow />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-base tracking-wider uppercase text-white">
                KNOX<span className="text-blue-400">.DEV</span>
              </span>
            </div>
            <p className="text-[10px] text-blue-300/60 font-body tracking-wider hidden sm:block">
              PRESS START TO SPAWN
            </p>
          </div>
        </div>

        {/* Console Sync Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-xs font-body text-blue-300 backdrop-blur-md">
          <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[11px] font-medium text-white/80 hidden sm:inline">
            PING:
          </span>
          <span className="text-[11px] font-heading text-cyan-400 font-bold">
            {ping >= 999 ? "OFFLINE" : `${ping} MS`}
          </span>
        </div>
      </header>

      {/* Main Core Center: Minimalist 2D Gaming Login */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
        <GamingLoginCard />
      </main>

      {/* Minimalist Dark Blue Gaming Footer */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-blue-300/60 border-t border-blue-950/80">
        <div className="flex items-center gap-2 text-blue-300 font-body">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>DUALSHOCK SYNCED & SECURE</span>
        </div>

        <div className="flex items-center gap-4 text-blue-400/70 font-body">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Powered by Framer Motion
          </span>
          <span>•</span>
          <span className="font-heading">© 2026 KNOX.DEV</span>
        </div>
      </footer>
    </div>
  );
}
