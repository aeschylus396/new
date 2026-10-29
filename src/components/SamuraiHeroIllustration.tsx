"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SamuraiHeroIllustration({ className = "" }: { className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* Drifting Cherry Blossom Petals (Sakura) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[
          { x: "15%", y: "20%", size: 14, rot: 35, delay: 0 },
          { x: "80%", y: "15%", size: 18, rot: -45, delay: 0.8 },
          { x: "25%", y: "65%", size: 12, rot: 70, delay: 1.4 },
          { x: "75%", y: "75%", size: 16, rot: 15, delay: 0.5 },
          { x: "50%", y: "85%", size: 10, rot: -80, delay: 1.8 },
          { x: "88%", y: "45%", size: 13, rot: 120, delay: 2.2 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, rotate: petal.rot }}
            animate={{
              opacity: [0, 0.9, 0],
              y: ["-10%", "110%"],
              x: ["0%", i % 2 === 0 ? "15%" : "-15%"],
              rotate: petal.rot + 180,
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            style={{ left: petal.x, top: petal.y }}
            className="absolute"
          >
            {/* Sakura petal SVG */}
            <svg
              width={petal.size}
              height={petal.size * 1.4}
              viewBox="0 0 20 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10 0 C 18 6, 20 20, 10 28 C 0 20, 2 6, 10 0 Z"
                fill="#FAF7F2"
                fillOpacity="0.85"
              />
              <path
                d="M 10 2 C 16 7, 17 18, 10 24 C 3 18, 4 7, 10 2 Z"
                fill="#F20D3A"
                fillOpacity="0.4"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Samurai Graphic (Vector Illustration matched to Reference Video Frame 1) */}
      <motion.div
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
          rotate: mousePos.x * 0.04,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
        className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] md:max-w-[620px] aspect-[1/1]"
      >
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
        >
          {/* DEFINITIONS FOR GRADIENTS & PATTERNS */}
          <defs>
            {/* Diamond Lattice armor pattern (Sode Armor) */}
            <pattern id="armorLattice" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 20 10 L 10 20 L 0 10 Z" fill="none" stroke="#FAF7F2" strokeWidth="1.2" strokeOpacity="0.35" />
            </pattern>
            {/* Steel Katana blade gradient */}
            <linearGradient id="bladeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#E5E5E5" />
              <stop offset="50%" stopColor="#999999" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#C8102E" />
            </linearGradient>
            <linearGradient id="crimsonShade" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F20D3A" />
              <stop offset="100%" stopColor="#7A0015" />
            </linearGradient>
          </defs>

          {/* ── BACKGROUND HALO / CRESCENT MOON RING ── */}
          <circle cx="300" cy="300" r="230" fill="#151515" fillOpacity="0.3" stroke="#FAF7F2" strokeWidth="1.5" strokeOpacity="0.2" />
          <circle cx="300" cy="300" r="215" stroke="#F20D3A" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.6" />

          {/* ── LEFT & RIGHT SHOULDER ARMOR (SODE) ── */}
          {/* Left Sode */}
          <g transform="translate(-10, 0)">
            <path
              d="M 60 280 C 80 260, 140 280, 150 380 C 120 480, 70 520, 40 440 Z"
              fill="#151515"
              stroke="#FAF7F2"
              strokeWidth="2"
            />
            {/* Chainmail weave overlay */}
            <path
              d="M 60 280 C 80 260, 140 280, 150 380 C 120 480, 70 520, 40 440 Z"
              fill="url(#armorLattice)"
            />
            {/* Red accent badge on shoulder */}
            <path d="M 85 320 C 100 320, 110 340, 100 360 C 85 355, 75 340, 85 320 Z" fill="#F20D3A" />
          </g>

          {/* Right Sode */}
          <g transform="translate(10, 0)">
            <path
              d="M 540 280 C 520 260, 460 280, 450 380 C 480 480, 530 520, 560 440 Z"
              fill="#151515"
              stroke="#FAF7F2"
              strokeWidth="2"
            />
            <path
              d="M 540 280 C 520 260, 460 280, 450 380 C 480 480, 530 520, 560 440 Z"
              fill="url(#armorLattice)"
            />
            {/* Red accent badge on shoulder */}
            <path d="M 515 320 C 500 320, 490 340, 500 360 C 515 355, 525 340, 515 320 Z" fill="#F20D3A" />
          </g>

          {/* ── SAMURAI BODY ARMOR (DO / CHESTPIECE) ── */}
          <path
            d="M 170 380 C 190 330, 410 330, 430 380 L 460 580 L 140 580 Z"
            fill="#151515"
            stroke="#FAF7F2"
            strokeWidth="3"
          />

          {/* Central crimson armor plate */}
          <path
            d="M 230 400 L 370 400 L 350 560 L 250 560 Z"
            fill="url(#crimsonShade)"
            stroke="#FAF7F2"
            strokeWidth="2"
          />
          {/* Armor cords */}
          <line x1="250" y1="440" x2="350" y2="440" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="8 4" />
          <line x1="260" y1="480" x2="340" y2="480" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="8 4" />
          <line x1="270" y1="520" x2="330" y2="520" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="8 4" />

          {/* ── SHIKORO (LAYERED NECK ARMOR IN CONCENTRIC WHITE TIERS) ── */}
          {/* Tier 3 (Lowest) */}
          <path
            d="M 180 370 C 230 430, 370 430, 420 370 C 370 410, 230 410, 180 370 Z"
            fill="#FAF7F2"
            stroke="#151515"
            strokeWidth="2"
          />
          {/* Tier 2 */}
          <path
            d="M 200 340 C 240 390, 360 390, 400 340 C 360 375, 240 375, 200 340 Z"
            fill="#EADFCF"
            stroke="#151515"
            strokeWidth="2"
          />
          {/* Tier 1 (Highest) */}
          <path
            d="M 220 310 C 250 350, 350 350, 380 310 C 350 340, 250 340, 220 310 Z"
            fill="#FAF7F2"
            stroke="#151515"
            strokeWidth="2"
          />

          {/* ── MENPO (FIERCE SAMURAI FACE ARMOR & MASK) ── */}
          {/* Face base */}
          <path
            d="M 225 180 C 210 240, 240 310, 300 320 C 360 310, 390 240, 375 180 Z"
            fill="#F20D3A"
            stroke="#151515"
            strokeWidth="3"
          />
          {/* Menpo Cheek Plates */}
          <path d="M 225 210 C 250 250, 270 290, 300 300 C 270 280, 240 240, 225 210 Z" fill="#C8102E" />
          <path d="M 375 210 C 350 250, 330 290, 300 300 C 330 280, 360 240, 375 210 Z" fill="#7A0015" />

          {/* Menpo fierce mustache & mouth plate */}
          <path
            d="M 255 260 C 280 250, 320 250, 345 260 C 330 280, 270 280, 255 260 Z"
            fill="#151515"
          />
          {/* Menpo teeth guard */}
          <rect x="275" y="265" width="50" height="8" rx="2" fill="#FAF7F2" />
          <line x1="285" y1="265" x2="285" y2="273" stroke="#151515" strokeWidth="1.5" />
          <line x1="295" y1="265" x2="295" y2="273" stroke="#151515" strokeWidth="1.5" />
          <line x1="305" y1="265" x2="305" y2="273" stroke="#151515" strokeWidth="1.5" />
          <line x1="315" y1="265" x2="315" y2="273" stroke="#151515" strokeWidth="1.5" />

          {/* Intense samurai eyes & brow */}
          <g>
            {/* Left Eye */}
            <path d="M 245 195 Q 265 185 280 195 Q 265 205 245 195 Z" fill="#FAF7F2" stroke="#151515" strokeWidth="2" />
            <circle cx="265" cy="195" r="4.5" fill="#151515" />
            <circle cx="266.5" cy="193.5" r="1.5" fill="#FAF7F2" />
            <path d="M 240 185 Q 265 178 285 190" stroke="#151515" strokeWidth="4" strokeLinecap="round" />

            {/* Right Eye */}
            <path d="M 355 195 Q 335 185 320 195 Q 335 205 355 195 Z" fill="#FAF7F2" stroke="#151515" strokeWidth="2" />
            <circle cx="335" cy="195" r="4.5" fill="#151515" />
            <circle cx="336.5" cy="193.5" r="1.5" fill="#FAF7F2" />
            <path d="M 360 185 Q 335 178 315 190" stroke="#151515" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* ── KABUTO (SAMURAI HELMET & HORNS) ── */}
          {/* Helmet bowl */}
          <path
            d="M 180 180 C 180 80, 420 80, 420 180 C 420 200, 180 200, 180 180 Z"
            fill="#151515"
            stroke="#FAF7F2"
            strokeWidth="3"
          />

          {/* Helmet peak visor (Mabisashi) */}
          <path
            d="M 190 185 C 240 165, 360 165, 410 185 L 395 195 C 350 180, 250 180, 205 195 Z"
            fill="#C8102E"
            stroke="#FAF7F2"
            strokeWidth="1.5"
          />

          {/* MAEDATE (ICONIC CRESCENT GOLDEN / CREAM HORNS) */}
          <g>
            {/* Left Horn */}
            <path
              d="M 285 150 C 230 110, 150 40, 170 0 C 185 60, 250 100, 290 145 Z"
              fill="#FAF7F2"
              stroke="#151515"
              strokeWidth="3"
            />
            {/* Right Horn */}
            <path
              d="M 315 150 C 370 110, 450 40, 430 0 C 415 60, 350 100, 310 145 Z"
              fill="#FAF7F2"
              stroke="#151515"
              strokeWidth="3"
            />
            {/* Center Golden Mon Crest on helmet */}
            <circle cx="300" cy="140" r="22" fill="#F20D3A" stroke="#FAF7F2" strokeWidth="3" />
            {/* Kamon flower inside center crest */}
            <circle cx="300" cy="140" r="14" fill="#FAF7F2" />
            <circle cx="300" cy="140" r="6" fill="#F20D3A" />
          </g>

          {/* ── KATANA SWORD BLADE CROSSING THE COMPOSITION ── */}
          <motion.g
            animate={{
              rotate: [-1, 2, -1],
              y: [0, -4, 0],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Sword Blade */}
            <path
              d="M 20 490 Q 250 460 560 360 L 565 375 Q 260 475 25 505 Z"
              fill="url(#bladeSteel)"
              stroke="#FAF7F2"
              strokeWidth="1.5"
            />
            {/* Blade Hamon (Temper Line wave) */}
            <path
              d="M 40 495 Q 120 480 200 465 Q 280 450 360 435 Q 440 415 540 375"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="14 4"
            />
            {/* Tsuba (Katana Handguard) */}
            <ellipse cx="110" cy="485" rx="14" ry="24" transform="rotate(20 110 485)" fill="#151515" stroke="#FAF7F2" strokeWidth="3" />
            <circle cx="110" cy="485" r="5" fill="#F20D3A" />

            {/* Tsuka (Handle with traditional diamond ito wrap) */}
            <path
              d="M 105 490 L 15 525 L 5 505 L 95 470 Z"
              fill="#F20D3A"
              stroke="#FAF7F2"
              strokeWidth="2"
            />
            {/* Handle wrap lines */}
            <line x1="30" y1="510" x2="40" y2="490" stroke="#FAF7F2" strokeWidth="2" />
            <line x1="50" y1="502" x2="60" y2="482" stroke="#FAF7F2" strokeWidth="2" />
            <line x1="70" y1="495" x2="80" y2="475" stroke="#FAF7F2" strokeWidth="2" />
            <line x1="90" y1="488" x2="100" y2="468" stroke="#FAF7F2" strokeWidth="2" />

            {/* Kashira (Handle pommel end cap) */}
            <circle cx="10" cy="515" r="8" fill="#151515" stroke="#FAF7F2" strokeWidth="2" />
          </motion.g>

          {/* Floating Petal drifting off shoulder */}
          <path d="M 370 215 C 385 220, 395 240, 385 250 C 370 245, 360 230, 370 215 Z" fill="#F20D3A" />
          <path d="M 215 175 C 225 180, 230 195, 220 205 C 210 200, 205 185, 215 175 Z" fill="#FAF7F2" />
        </svg>
      </motion.div>

    </div>
  );
}
