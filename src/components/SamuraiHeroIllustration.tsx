"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SamuraiHeroIllustrationProps {
  className?: string;
  onSlashTriggered?: () => void;
}

export default function SamuraiHeroIllustration({
  className = "",
  onSlashTriggered,
}: SamuraiHeroIllustrationProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSlashing, setIsSlashing] = useState(false);
  const [slashCount, setSlashCount] = useState(0);
  const [eyeGaze, setEyeGaze] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Play synthesized crisp katana slash whoosh + metal chime (no external audio required)
  const triggerAudioSwoosh = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // 1. Blade Whoosh (Filtered white noise)
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.12);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.25);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      // 2. Steel Katana Chime (High harmonic ping)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2600, ctx.currentTime + 0.04);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.32);

      oscGain.gain.setValueAtTime(0.18, ctx.currentTime + 0.04);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(ctx.currentTime + 0.04);
      osc.stop(ctx.currentTime + 0.32);
    } catch {
      // Audio playback fails silently if user has not interacted with DOM yet
    }
  };

  // Interactive Katana Slash Handler
  const handleSlash = () => {
    if (isSlashing) return;
    setIsSlashing(true);
    setSlashCount((prev) => prev + 1);
    triggerAudioSwoosh();
    if (onSlashTriggered) onSlashTriggered();

    setTimeout(() => {
      setIsSlashing(false);
    }, 650);
  };

  // Desktop mouse parallax & Mobile dynamic ambient sway
  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 26;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      setMousePos({ x, y });
      setEyeGaze({ x: x * 0.15, y: y * 0.12 });
    };

    // Smooth ambient animation for mobile & idle
    const animateIdle = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Ambient Lissajous sway
      const ambientX = Math.sin(elapsed * 1.2) * 5;
      const ambientY = Math.cos(elapsed * 0.9) * 4;
      
      // If no recent mouse move, apply ambient motion
      setMousePos((prev) => ({
        x: prev.x * 0.92 + ambientX * 0.08,
        y: prev.y * 0.92 + ambientY * 0.08,
      }));

      frameId = requestAnimationFrame(animateIdle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(animateIdle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleSlash}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      title="Click anywhere to trigger Katana Slash ⚔"
    >
      {/* ── DRAPING FLOATING SAKURA PETALS (10 LAYERED PARTICLES) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {[
          { x: "12%", y: "15%", size: 16, rot: 35, delay: 0, dur: 7 },
          { x: "78%", y: "10%", size: 20, rot: -45, delay: 0.6, dur: 8.5 },
          { x: "28%", y: "60%", size: 13, rot: 70, delay: 1.2, dur: 6.8 },
          { x: "82%", y: "72%", size: 17, rot: 15, delay: 0.3, dur: 9 },
          { x: "48%", y: "82%", size: 11, rot: -80, delay: 1.7, dur: 7.4 },
          { x: "90%", y: "42%", size: 14, rot: 120, delay: 2.1, dur: 8 },
          { x: "8%", y: "75%", size: 18, rot: 45, delay: 1.5, dur: 7.8 },
          { x: "62%", y: "25%", size: 12, rot: -30, delay: 2.8, dur: 8.2 },
          { x: "38%", y: "35%", size: 15, rot: 95, delay: 0.9, dur: 7.2 },
          { x: "85%", y: "88%", size: 14, rot: 60, delay: 3.1, dur: 8.7 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, rotate: petal.rot }}
            animate={{
              opacity: [0, 0.95, 0.8, 0],
              y: ["-15%", "115%"],
              x: ["0%", i % 2 === 0 ? "25%" : "-25%"],
              rotate: [petal.rot, petal.rot + 220],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: petal.dur,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            style={{ left: petal.x, top: petal.y }}
            className="absolute"
          >
            <svg
              width={petal.size}
              height={petal.size * 1.45}
              viewBox="0 0 20 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              <path
                d="M 10 0 C 18 6, 20 20, 10 28 C 0 20, 2 6, 10 0 Z"
                fill="#FAF7F2"
                fillOpacity="0.9"
              />
              <path
                d="M 10 2 C 16 7, 17 18, 10 24 C 3 18, 4 7, 10 2 Z"
                fill="#F20D3A"
                fillOpacity="0.45"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ── KATANA SLASH FLASH OVERLAY ── */}
      <AnimatePresence>
        {isSlashing && (
          <motion.div
            key={`slash-${slashCount}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden"
          >
            {/* White-Hot Slash Cutting Ray */}
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: [0, 1.4, 1.2], opacity: [1, 1, 0] }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[140%] h-[5px] bg-white shadow-[0_0_25px_#FFFFFF,0_0_50px_#F20D3A] -rotate-[28deg] origin-center"
            />
            
            {/* Secondary crimson shockwave line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.9 }}
              animate={{ scaleX: [0, 1.3, 1], opacity: [0.9, 0.8, 0] }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="absolute w-[130%] h-[2px] bg-cream -rotate-[28deg] translate-y-3 origin-center"
            />

            {/* Kanji Slash Mark: 斬 (ZAN - Clean Cut) */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
              animate={{ scale: [0.4, 1.3, 1], opacity: [0, 1, 0], rotate: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="font-display text-7xl sm:text-9xl text-white font-black drop-shadow-[0_0_30px_#F20D3A]"
            >
              斬
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN SAMURAI COMPOSITION WITH CONTINUOUS DYNAMIC MOTION ── */}
      <motion.div
        animate={{
          x: mousePos.x * 0.7,
          y: mousePos.y * 0.5,
          rotate: mousePos.x * 0.05,
        }}
        transition={{ type: "spring", stiffness: 65, damping: 22 }}
        className="relative z-10 w-full max-w-[460px] sm:max-w-[560px] md:max-w-[640px] aspect-[1/1]"
      >
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        >
          <defs>
            {/* Sode Armor Diamond Lattice Pattern */}
            <pattern id="armorLattice" width="22" height="22" patternUnits="userSpaceOnUse">
              <path
                d="M 11 0 L 22 11 L 11 22 L 0 11 Z"
                fill="none"
                stroke="#FAF7F2"
                strokeWidth="1.3"
                strokeOpacity="0.4"
              />
            </pattern>

            {/* Katana Hamon Steel Blade Gradient */}
            <linearGradient id="bladeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E8ECEF" />
              <stop offset="50%" stopColor="#9CA3AF" />
              <stop offset="65%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#C8102E" />
            </linearGradient>

            {/* Continuous Gleam Light on Blade */}
            <linearGradient id="bladeGleam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Rich Crimson Armor Gradient */}
            <linearGradient id="crimsonShade" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F20D3A" />
              <stop offset="60%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#5E000F" />
            </linearGradient>

            {/* Fiery Eye Glow Radial */}
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFCC00" />
              <stop offset="60%" stopColor="#F20D3A" />
              <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── 1. ROTATING BACKGROUND BUSHIDO SUN DISC & HALO RINGS ── */}
          <g transform="translate(300, 300)">
            {/* Outer Slow-Rotating Dashed Sun Ring */}
            <motion.circle
              r="240"
              fill="none"
              stroke="#FAF7F2"
              strokeWidth="1.5"
              strokeDasharray="10 12"
              strokeOpacity="0.22"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            {/* Counter-Rotating Inner Ring with Cardinal Marks */}
            <motion.circle
              r="220"
              fill="#151515"
              fillOpacity="0.28"
              stroke="#F20D3A"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              strokeOpacity="0.55"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Radial Bushido Strategy Marks at 45 degree intervals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <line
                key={idx}
                x1="0"
                y1="-220"
                x2="0"
                y2="-235"
                stroke="#FAF7F2"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>

          {/* ── 2. SAMURAI TORSO & ARMOR (NATURAL BREATHING MOTION) ── */}
          <motion.g
            animate={{
              y: [0, -7, 0],
              scale: [1, 1.012, 1],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "300px 500px" }}
          >
            {/* Left Shoulder Guard (Sode) */}
            <g transform="translate(-10, 0)">
              <path
                d="M 50 270 C 75 250, 140 270, 150 380 C 120 480, 65 520, 35 440 Z"
                fill="#151515"
                stroke="#FAF7F2"
                strokeWidth="2.5"
              />
              <path
                d="M 50 270 C 75 250, 140 270, 150 380 C 120 480, 65 520, 35 440 Z"
                fill="url(#armorLattice)"
              />
              {/* Crimson Accent Badge */}
              <path
                d="M 80 320 C 95 320, 105 340, 95 360 C 80 355, 70 340, 80 320 Z"
                fill="#F20D3A"
              />
            </g>

            {/* Right Shoulder Guard (Sode) */}
            <g transform="translate(10, 0)">
              <path
                d="M 550 270 C 525 250, 460 270, 450 380 C 480 480, 535 520, 565 440 Z"
                fill="#151515"
                stroke="#FAF7F2"
                strokeWidth="2.5"
              />
              <path
                d="M 550 270 C 525 250, 460 270, 450 380 C 480 480, 535 520, 565 440 Z"
                fill="url(#armorLattice)"
              />
              {/* Crimson Accent Badge */}
              <path
                d="M 520 320 C 505 320, 495 340, 505 360 C 520 355, 530 340, 520 320 Z"
                fill="#F20D3A"
              />
            </g>

            {/* Main Chestplate (Do) */}
            <path
              d="M 165 375 C 190 320, 410 320, 435 375 L 470 590 L 130 590 Z"
              fill="#151515"
              stroke="#FAF7F2"
              strokeWidth="3"
            />
            {/* Center Crimson Armor Plate */}
            <path
              d="M 225 395 L 375 395 L 355 570 L 245 570 Z"
              fill="url(#crimsonShade)"
              stroke="#FAF7F2"
              strokeWidth="2.2"
            />
            {/* Armor Binding Cords (Odoshi) */}
            <line x1="245" y1="435" x2="355" y2="435" stroke="#FAF7F2" strokeWidth="2.5" strokeDasharray="9 4" />
            <line x1="255" y1="475" x2="345" y2="475" stroke="#FAF7F2" strokeWidth="2.5" strokeDasharray="9 4" />
            <line x1="265" y1="515" x2="335" y2="515" stroke="#FAF7F2" strokeWidth="2.5" strokeDasharray="9 4" />
            <line x1="275" y1="555" x2="325" y2="555" stroke="#FAF7F2" strokeWidth="2.5" strokeDasharray="9 4" />
          </motion.g>

          {/* ── 3. SHIKORO (CONCENTRIC WHITE TIERED NECK ARMOR) ── */}
          <g>
            {/* Tier 3 (Bottom Tier) */}
            <path
              d="M 175 365 C 230 435, 370 435, 425 365 C 370 410, 230 410, 175 365 Z"
              fill="#FAF7F2"
              stroke="#151515"
              strokeWidth="2.5"
            />
            {/* Tier 2 (Middle Tier) */}
            <path
              d="M 195 335 C 240 395, 360 395, 405 335 C 360 375, 240 375, 195 335 Z"
              fill="#EADFCF"
              stroke="#151515"
              strokeWidth="2.5"
            />
            {/* Tier 1 (Top Tier) */}
            <path
              d="M 215 305 C 250 355, 350 355, 385 305 C 350 340, 250 340, 215 305 Z"
              fill="#FAF7F2"
              stroke="#151515"
              strokeWidth="2.5"
            />
          </g>

          {/* ── 4. MENPO (FIERCE SAMURAI FACE ARMOR MASK & EYES) ── */}
          <motion.g
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Face Mask Base */}
            <path
              d="M 220 175 C 205 240, 240 315, 300 325 C 360 315, 395 240, 380 175 Z"
              fill="#F20D3A"
              stroke="#151515"
              strokeWidth="3.5"
            />
            {/* Cheek Plates */}
            <path d="M 220 205 C 250 250, 270 290, 300 300 C 270 280, 240 240, 220 205 Z" fill="#C8102E" />
            <path d="M 380 205 C 350 250, 330 290, 300 300 C 330 280, 360 240, 380 205 Z" fill="#7A0015" />

            {/* Fierce Mouth Guard & Mustache */}
            <path
              d="M 250 260 C 280 248, 320 248, 350 260 C 335 282, 265 282, 250 260 Z"
              fill="#151515"
            />
            <rect x="272" y="265" width="56" height="8" rx="2" fill="#FAF7F2" />
            <line x1="284" y1="265" x2="284" y2="273" stroke="#151515" strokeWidth="1.8" />
            <line x1="295" y1="265" x2="295" y2="273" stroke="#151515" strokeWidth="1.8" />
            <line x1="305" y1="265" x2="305" y2="273" stroke="#151515" strokeWidth="1.8" />
            <line x1="316" y1="265" x2="316" y2="273" stroke="#151515" strokeWidth="1.8" />

            {/* ── PIERCING SAMURAI EYES (DYNAMIC BLINKING + GLOW) ── */}
            <motion.g
              animate={{
                scaleY: [1, 1, 1, 0.12, 1],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                times: [0, 0.92, 0.94, 0.96, 1],
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "300px 195px" }}
            >
              {/* Left Eye */}
              <g transform={`translate(${eyeGaze.x}, ${eyeGaze.y})`}>
                <path
                  d="M 242 195 Q 265 182 282 195 Q 265 207 242 195 Z"
                  fill="#FAF7F2"
                  stroke="#151515"
                  strokeWidth="2.2"
                />
                {/* Glowing Pupil */}
                <circle cx="265" cy="195" r="5" fill="#151515" />
                <circle cx="265" cy="195" r="2.5" fill="url(#eyeGlow)" />
                <circle cx="266.5" cy="193" r="1.5" fill="#FFFFFF" />
              </g>
              {/* Fierce Eyebrow (Left) */}
              <path d="M 238 184 Q 265 174 286 188" stroke="#151515" strokeWidth="4.5" strokeLinecap="round" />

              {/* Right Eye */}
              <g transform={`translate(${eyeGaze.x}, ${eyeGaze.y})`}>
                <path
                  d="M 358 195 Q 335 182 318 195 Q 335 207 358 195 Z"
                  fill="#FAF7F2"
                  stroke="#151515"
                  strokeWidth="2.2"
                />
                {/* Glowing Pupil */}
                <circle cx="335" cy="195" r="5" fill="#151515" />
                <circle cx="335" cy="195" r="2.5" fill="url(#eyeGlow)" />
                <circle cx="336.5" cy="193" r="1.5" fill="#FFFFFF" />
              </g>
              {/* Fierce Eyebrow (Right) */}
              <path d="M 362 184 Q 335 174 314 188" stroke="#151515" strokeWidth="4.5" strokeLinecap="round" />
            </motion.g>
          </motion.g>

          {/* ── 5. KABUTO (HELMET & MONUMENTAL CRESCENT HORNS) ── */}
          <motion.g
            animate={{
              rotate: [-0.8, 0.8, -0.8],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "300px 180px" }}
          >
            {/* Helmet Bowl (Hachi) */}
            <path
              d="M 175 180 C 175 75, 425 75, 425 180 C 425 200, 175 200, 175 180 Z"
              fill="#151515"
              stroke="#FAF7F2"
              strokeWidth="3.2"
            />
            {/* Visor Peak (Mabisashi) */}
            <path
              d="M 185 185 C 240 162, 360 162, 415 185 L 400 196 C 350 180, 250 180, 200 196 Z"
              fill="#C8102E"
              stroke="#FAF7F2"
              strokeWidth="1.8"
            />

            {/* KUWAGATA (ICONIC GRAND CRESCENT SILVER HORNS) */}
            <g>
              {/* Left Horn */}
              <path
                d="M 282 148 C 225 105, 145 35, 165 -8 C 182 55, 245 95, 288 142 Z"
                fill="#FAF7F2"
                stroke="#151515"
                strokeWidth="3.2"
              />
              {/* Right Horn */}
              <path
                d="M 318 148 C 375 105, 455 35, 435 -8 C 418 55, 355 95, 312 142 Z"
                fill="#FAF7F2"
                stroke="#151515"
                strokeWidth="3.2"
              />

              {/* Central Golden Kamon Clan Crest on Kabuto */}
              <circle cx="300" cy="138" r="24" fill="#F20D3A" stroke="#FAF7F2" strokeWidth="3.2" />
              <circle cx="300" cy="138" r="16" fill="#FAF7F2" />
              {/* 5-Petal Flower Mon */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx="300"
                  cy="130"
                  r="3.5"
                  fill="#F20D3A"
                  transform={`rotate(${angle} 300 138)`}
                />
              ))}
              <circle cx="300" cy="138" r="4.5" fill="#151515" />
            </g>
          </motion.g>

          {/* ── 6. DYNAMIC KATANA BLADE WITH LIVE HAMON SPECULAR SHIMMER ── */}
          <motion.g
            animate={
              isSlashing
                ? {
                    rotate: [-35, 18, 0],
                    x: [80, -30, 0],
                    y: [-40, 20, 0],
                    scale: [1.15, 1.05, 1],
                  }
                : {
                    rotate: [-1.2, 1.8, -1.2],
                    y: [0, -5, 0],
                  }
            }
            transition={
              isSlashing
                ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "110px 485px" }}
          >
            {/* Sword Blade Steel Path */}
            <path
              d="M 15 490 Q 250 460 565 355 L 570 372 Q 260 475 20 508 Z"
              fill="url(#bladeSteel)"
              stroke="#FAF7F2"
              strokeWidth="1.8"
            />
            {/* Hamon Line (Wavy Temper Wave) */}
            <path
              d="M 35 496 Q 120 480 200 465 Q 280 448 360 432 Q 440 412 545 370"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="16 5"
            />

            {/* Specular Light Reflection Shimmer across Blade */}
            <motion.rect
              x="0"
              y="350"
              width="90"
              height="160"
              fill="url(#bladeGleam)"
              transform="rotate(-15 300 430)"
              animate={{
                x: [-150, 450],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />

            {/* Tsuba (Katana Guard Disc) */}
            <ellipse
              cx="110"
              cy="485"
              rx="15"
              ry="26"
              transform="rotate(20 110 485)"
              fill="#151515"
              stroke="#FAF7F2"
              strokeWidth="3.2"
            />
            <circle cx="110" cy="485" r="5.5" fill="#F20D3A" />

            {/* Tsuka (Handle Wrap in Crimson & Cream) */}
            <path
              d="M 105 490 L 12 528 L 2 506 L 95 470 Z"
              fill="#F20D3A"
              stroke="#FAF7F2"
              strokeWidth="2.2"
            />
            {/* Traditional Diamond Ito Wraps */}
            <line x1="28" y1="512" x2="38" y2="492" stroke="#FAF7F2" strokeWidth="2.2" />
            <line x1="48" y1="504" x2="58" y2="484" stroke="#FAF7F2" strokeWidth="2.2" />
            <line x1="68" y1="496" x2="78" y2="476" stroke="#FAF7F2" strokeWidth="2.2" />
            <line x1="88" y1="488" x2="98" y2="468" stroke="#FAF7F2" strokeWidth="2.2" />

            {/* Kashira (Handle Pommel Cap) */}
            <circle cx="8" cy="517" r="8.5" fill="#151515" stroke="#FAF7F2" strokeWidth="2.5" />
          </motion.g>

          {/* Decorative drifting petal falling off armor */}
          <path d="M 370 215 C 385 220, 395 240, 385 250 C 370 245, 360 230, 370 215 Z" fill="#F20D3A" />
          <path d="M 215 175 C 225 180, 230 195, 220 205 C 210 200, 205 185, 215 175 Z" fill="#FAF7F2" />
        </svg>
      </motion.div>

      {/* Floating Interactive Trigger Tag at bottom of samurai */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-2 sm:bottom-4 px-3 py-1 bg-noir/90 border border-crimson text-cream font-mono text-[9px] sm:text-[10px] tracking-widest uppercase flex items-center gap-1.5 shadow-editorial-dark pointer-events-none group-hover:bg-crimson group-hover:text-white transition-colors z-30"
      >
        <span className="text-crimson group-hover:text-white">⚔</span>
        <span>TAP / CLICK TO STRIKE KATANA</span>
      </motion.div>
    </div>
  );
}