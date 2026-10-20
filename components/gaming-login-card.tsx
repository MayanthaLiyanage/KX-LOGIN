"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Trophy,
  Zap,
  Sparkles,
} from "lucide-react";
import {
  PSShapeTriangle,
  PSShapeCircle,
  PSShapeCross,
  PSShapeSquare,
} from "./playstation-shapes";
import { AnimatedEyeballToggle } from "./animated-eyeball-toggle";
import { PlayStationFireworkBurst } from "./playstation-firework-burst";

type AuthMode = "signin" | "signup";

export function GamingLoginCard() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeFocus, setActiveFocus] = useState<"none" | "email" | "password" | "name">("none");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFirework, setShowFirework] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Height measurement for silky-smooth morphing between Form (Initial) and Success (Subsequent) states
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const isMounted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.ceil(entry.target.getBoundingClientRect().height);
        if (h > 0) {
          setContentHeight(h + 2); // 2px for top + bottom border
          if (!isMounted.current) {
            requestAnimationFrame(() => {
              isMounted.current = true;
            });
          }
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1100);
  };

  const handleSocialLogin = (platform: string) => {
    setSocialLoading(platform);
    setTimeout(() => {
      setSocialLoading(null);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setShowFirework(false);
    setIsSuccess(false);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setActiveFocus("none");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* PlayStation Shapes Firework Bloom - bursts outward in perfect sync when second card appears */}
      <AnimatePresence>
        {showFirework && isSuccess && (
          <PlayStationFireworkBurst key="ps-firework" active={showFirework} />
        )}
      </AnimatePresence>

      {/* Ambient Console Glow Effect - Smoothly morphs with the card height */}
      <motion.div
        animate={{ height: contentHeight ?? "auto" }}
        transition={
          !isMounted.current
            ? { duration: 0 }
            : { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
        }
        className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl blur-2xl opacity-25 -z-10"
      />

      {/* Main Glassmorphic Gaming Card - Smooth height morphing without clipping */}
      <motion.div
        animate={{ height: contentHeight ?? "auto" }}
        transition={
          !isMounted.current
            ? { duration: 0 }
            : { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
        }
        className="relative bg-[#080d24]/90 border border-blue-500/20 rounded-3xl shadow-2xl shadow-blue-950/60 backdrop-blur-2xl text-white"
      >
        <div ref={containerRef} className="p-6 sm:p-7 pb-8 sm:pb-9">
          {/* Subtle Tech Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-3xl overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(#0090ff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* --- Card Header: Knox Portal --- */}
          <div className="relative flex flex-col items-center justify-center pb-3.5 border-b border-blue-900/40 text-center">
            <h2 className="font-heading font-black text-xl sm:text-2xl tracking-tight uppercase text-white">
              KNOX <span className="text-blue-400">PORTAL</span>
            </h2>
            <p className="text-[11px] font-body text-blue-300/60 tracking-wider uppercase mt-1">
              Secure access portal for player verification
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {isSuccess ? (
              /* Second Card: Level Complete / Access Granted View */
              <motion.div
                key="game-success"
                onAnimationStart={() => setShowFirework(true)}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.97,
                  transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 text-center space-y-6"
              >
                {/* Trophy Crest */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/10 border-2 border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(0,144,255,0.35)]"
                >
                  <Trophy className="w-10 h-10 text-blue-400" />
                </motion.div>

                {/* Status Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <h3 className="text-2xl font-heading font-black tracking-tight uppercase text-white flex items-center justify-center gap-2">
                    ACCESS GRANTED <Sparkles className="w-5 h-5 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-blue-200/70 font-body tracking-wide">
                    Welcome to Knox Portal. Player session verified & ready.
                  </p>
                </motion.div>

                {/* PlayStation Shapes Badge Row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center gap-4 py-3 px-4 rounded-xl bg-blue-950/40 border border-blue-800/40"
                >
                  <PSShapeTriangle className="w-5 h-5" glow />
                  <PSShapeCircle className="w-5 h-5" glow />
                  <PSShapeCross className="w-5 h-5" glow />
                  <PSShapeSquare className="w-5 h-5" glow />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-blue-950 border border-blue-800 hover:border-blue-500 text-blue-200 hover:text-white transition-all cursor-pointer"
                >
                  Sign In With Another Account
                </motion.button>
              </motion.div>
            ) : (
              /* First Card: Active Minimalist 2D Gaming Form */
              <motion.div
                key="game-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.98,
                  transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 space-y-4"
              >
              {/* Title & Mode Switcher */}
              <div className="space-y-3">
                <div className="relative min-h-[46px] flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl font-heading font-black tracking-tight uppercase text-white transition-all duration-200">
                    {mode === "signin" ? "START GAME" : "CREATE PROFILE"}
                  </h2>
                  <p className="text-xs text-blue-200/70 mt-0.5 font-body transition-all duration-200">
                    {mode === "signin"
                      ? "Authenticate with your Gamer ID or network account"
                      : "Initialize new profile to begin campaign"}
                  </p>
                </div>

                {/* Refined Smooth Pill Mode Switcher - Sliding pill behind text */}
                <div className="relative flex p-1 bg-blue-950/70 rounded-xl border border-blue-900/60 shadow-inner select-none">
                  {/* The single sliding pill background - always behind text */}
                  <motion.div
                    className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-[0_0_20px_rgba(0,144,255,0.45)] border border-cyan-400/30 pointer-events-none z-0"
                    initial={false}
                    animate={{
                      left: mode === "signin" ? "4px" : "calc(50% + 2px)",
                      width: "calc(50% - 6px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`relative z-10 flex-1 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-lg transition-colors duration-200 cursor-pointer ${
                      mode === "signin"
                        ? "text-white"
                        : "text-blue-300/60 hover:text-blue-200"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5 font-heading">
                      <Zap
                        className={`w-3.5 h-3.5 transition-colors duration-200 ${
                          mode === "signin" ? "text-cyan-300" : "text-blue-400/60"
                        }`}
                      />
                      Sign In
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`relative z-10 flex-1 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-lg transition-colors duration-200 cursor-pointer ${
                      mode === "signup"
                        ? "text-white"
                        : "text-blue-300/60 hover:text-blue-200"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5 font-heading">
                      <Trophy
                        className={`w-3.5 h-3.5 transition-colors duration-200 ${
                          mode === "signup" ? "text-cyan-300" : "text-blue-400/60"
                        }`}
                      />
                      Create profile
                    </span>
                  </button>
                </div>
              </div>

              {/* Fast Gaming Network Logins (Google, Discord, Steam) */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* Google */}
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border border-blue-900/60 bg-blue-950/40 hover:bg-blue-900/40 text-white transition-colors shadow-sm cursor-pointer group"
                  aria-label="Sign in with Google"
                >
                  {socialLoading === "google" ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin my-1" />
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="text-[10px] font-heading font-semibold mt-1 text-white tracking-wider">
                        Google
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Discord */}
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin("discord")}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border border-blue-900/60 bg-blue-950/40 hover:bg-blue-900/40 text-white transition-colors shadow-sm cursor-pointer group"
                  aria-label="Sign in with Discord"
                >
                  {socialLoading === "discord" ? (
                    <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin my-1" />
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 fill-[#5865F2]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="text-[10px] font-heading font-semibold mt-1 text-white tracking-wider">
                        Discord
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Steam */}
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin("steam")}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border border-blue-900/60 bg-blue-950/40 hover:bg-blue-900/40 text-white transition-colors shadow-sm cursor-pointer group"
                  aria-label="Sign in with Steam"
                >
                  {socialLoading === "steam" ? (
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin my-1" />
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 fill-[#66c0f4] group-hover:fill-white transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM7.54 18.216l-1.467-.606c.266.604.8 1.066 1.453 1.246.85.234 1.744-.124 2.18-.844.438-.72.301-1.644-.33-2.215-.402-.364-.938-.521-1.465-.453l1.523.629c.677.279.999 1.053.72 1.73-.279.678-1.053.999-1.731.72-.136-.057-.257-.137-.363-.237l-.52.23zm8.4-7.051c-1.247 0-2.261-1.015-2.261-2.264 0-1.248 1.015-2.263 2.261-2.263 1.249 0 2.264 1.015 2.264 2.263 0 1.249-1.015 2.264-2.264 2.264zm-3.389 4.887c0-.285.045-.559.123-.819l-2.035-.841c-.43.518-1.047.876-1.749.957l2.259.933c.838-.088 1.402-.23 1.402-.23z" />
                      </svg>
                      <span className="text-[10px] font-heading font-semibold mt-1 text-white tracking-wider">
                        Steam
                      </span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Centered Divider */}
              <div className="flex items-center my-1">
                <div className="grow border-t border-blue-900/50" />
                <span className="shrink-0 px-3 text-[10px] font-heading tracking-widest uppercase text-blue-400/60 whitespace-nowrap">
                  OR CREDENTIALS
                </span>
                <div className="grow border-t border-blue-900/50" />
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* GamerTag / Name (Sign Up only) */}
                <AnimatePresence initial={false}>
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-1 overflow-hidden"
                    >
                      <label
                        htmlFor="gamertag"
                        className="block text-xs font-heading font-semibold uppercase tracking-wider text-blue-200"
                      >
                        Gamer Tag
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/60 pointer-events-none" />
                        <input
                          id="gamertag"
                          name="name"
                          type="text"
                          required={mode === "signup"}
                          value={gamerTag}
                          onFocus={() => setActiveFocus("name")}
                          onBlur={() => setActiveFocus("none")}
                          onChange={(e) => setGamerTag(e.target.value)}
                          placeholder="alex.morgan"
                          autoComplete="name"
                          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-blue-900/60 bg-blue-950/40 text-white placeholder:text-blue-300/40 placeholder:font-normal focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-body"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="player-email"
                    className="block text-xs font-heading font-semibold uppercase tracking-wider text-blue-200"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/60 pointer-events-none" />
                    <input
                      id="player-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="username"
                      enterKeyHint="next"
                      value={email}
                      onFocus={() => setActiveFocus("email")}
                      onBlur={() => setActiveFocus("none")}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-blue-900/60 bg-blue-950/40 text-white placeholder:text-blue-300/40 placeholder:font-normal focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-body"
                    />
                  </div>
                </div>

                {/* Password Input with WORKING Show/Hide Eye Toggle */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="player-password"
                      className="block text-xs font-heading font-semibold uppercase tracking-wider text-blue-200"
                    >
                      Password
                    </label>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-heading font-bold px-1.5 py-0.5 rounded tracking-wider ${showPassword
                            ? "bg-blue-500/20 text-cyan-400 border border-cyan-400/40"
                            : "bg-blue-950 text-blue-400/60"
                          }`}
                      >
                        {showPassword ? "VISIBLE" : "PROTECTED"}
                      </span>
                      {mode === "signin" && (
                        <a
                          href="#forgot"
                          onClick={(e) => e.preventDefault()}
                          className="text-xs text-blue-400 hover:text-cyan-300 font-body transition-colors"
                        >
                          Reset?
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/60 group-focus-within:text-cyan-400 transition-colors pointer-events-none" />

                    {/* DYNAMIC PASSWORD INPUT */}
                    <input
                      id="player-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete={
                        mode === "signin" ? "current-password" : "new-password"
                      }
                      enterKeyHint="done"
                      value={password}
                      onFocus={() => setActiveFocus("password")}
                      onBlur={() => setActiveFocus("none")}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-2.5 text-sm rounded-xl border border-blue-900/60 bg-blue-950/40 text-white placeholder:text-blue-300/40 placeholder:font-normal focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-body"
                    />

                    {/* ANIMATED 2D EYEBALL TOGGLE (with pupil and eyelid transitions) */}
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center">
                      <AnimatedEyeballToggle
                        isVisible={showPassword}
                        onToggle={togglePassword}
                      />
                    </div>
                  </div>
                </div>

                {/* Remember Console Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember-console"
                    name="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-blue-800 bg-blue-950 text-blue-600 focus:ring-blue-500 accent-blue-600"
                  />
                  <label
                    htmlFor="remember-console"
                    className="text-xs text-blue-200/75 select-none cursor-pointer font-body"
                  >
                    Keep player one signed in on this station
                  </label>
                </div>

                {/* Tactile Gaming Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-3.5 px-4 rounded-xl font-heading text-sm font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,144,255,0.4)] hover:shadow-[0_0_35px_rgba(0,144,255,0.6)] transition-all cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{mode === "signin" ? "Signing In..." : "Creating Profile..."}</span>
                    </div>
                  ) : (
                    <span className="select-none font-heading font-black tracking-widest uppercase">
                      {mode === "signin" ? "Sign In" : "Create profile"}
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
