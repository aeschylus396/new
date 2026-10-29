"use client";

import React from "react";
import { motion } from "framer-motion";

export default function KatanaDivider({
  theme = "red-on-cream",
}: {
  theme?: "red-on-cream" | "cream-on-red" | "red-on-noir";
}) {
  const isRedBg = theme === "cream-on-red";
  const isNoirBg = theme === "red-on-noir";

  const lineColor = isRedBg ? "rgba(245, 240, 231, 0.3)" : "rgba(242, 13, 58, 0.35)";
  const slashColor = isRedBg ? "#FAF7F2" : "#F20D3A";

  return (
    <div className="relative w-full py-8 overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between relative">
        
        {/* Left Japanese Kanji Mark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className={`font-display text-xs sm:text-sm tracking-widest uppercase ${isRedBg ? "text-cream" : isNoirBg ? "text-crimson" : "text-crimson"}`}>
            武士道 <span className="hidden sm:inline">• BUSHIDO STRATEGY</span>
          </span>
          <div className="w-4 sm:w-6 h-[1px]" style={{ backgroundColor: lineColor }} />
        </div>

        {/* Center Katana Slash SVG */}
        <div className="relative flex-1 mx-2 sm:mx-6 flex items-center justify-center min-w-[100px]">
          <div className="w-full h-[1px]" style={{ backgroundColor: lineColor }} />
          
          {/* Animated Katana Blade Icon */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center gap-2 px-3 sm:px-4 py-1"
            style={{
              backgroundColor: isRedBg ? "#C8102E" : isNoirBg ? "#151515" : "#FAF7F2",
              border: `1px solid ${lineColor}`,
            }}
          >
            <svg width="24" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M 0 6 Q 20 2 40 6" stroke={slashColor} strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="6" r="3" fill={slashColor} />
            </svg>
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-widest font-bold uppercase ${isRedBg ? "text-white" : isNoirBg ? "text-cream" : "text-noir"}`}>
              PRECISION
            </span>
          </motion.div>
        </div>

        {/* Right Label */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-4 sm:w-6 h-[1px]" style={{ backgroundColor: lineColor }} />
          <span className={`font-mono text-xs font-bold ${isRedBg ? "text-cream/80" : "text-crimson"}`}>
            切
          </span>
        </div>

      </div>
    </div>
  );
}
