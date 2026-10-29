"use client";

import { motion } from "framer-motion";

export default function HeroEditorial() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-crimson text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 border-b-2 border-crimson-dark">
      {/* Background Graphic Lines & Geometric Accents inspired by reference video */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/40" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/40" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/30" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/30" />
      </div>

      {/* Left Vertical Guide Rail */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none">
        <span className="rail-label text-white/80">AYUSH LAL • DIGITAL STRATEGY</span>
        <div className="w-[1px] h-16 bg-white/40" />
        <span className="font-mono text-[10px] text-white/70">01 / 07</span>
      </div>

      {/* Right Vertical Guide Rail */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-white/70">BIMTECH 2026–2028</span>
        <div className="w-[1px] h-16 bg-white/40" />
        <span className="rail-label text-white/80">PORTFOLIO OF LEADERSHIP</span>
      </div>

      {/* Central Content Container */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-16 flex-1 flex flex-col justify-center">
        
        {/* Top Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 border-b border-white/20 pb-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cream animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-cream">
              [ EDITION 2026 • PORTFOLIO CATALOG ]
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-white/80 uppercase">
            PGDM CANDIDATE • SALES & MARKETING STRATEGIST
          </span>
        </motion.div>

        {/* Main Hero Typography & Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
          
          {/* Typography Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-cream/90 mb-2"
            >
              Creative Leader & Growth Architect
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-6xl sm:text-8xl md:text-9xl xl:text-[11rem] leading-[0.88] tracking-tight uppercase text-white drop-shadow-md"
            >
              AYUSH<br />
              <span className="text-cream underline decoration-white/20 decoration-2 underline-offset-8">LAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl font-normal leading-relaxed mt-4 sm:mt-6"
            >
              Turning strategy into scalable growth through high-converting campaigns, engaging creative storytelling, and data-driven customer acquisition.
            </motion.p>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3.5 bg-cream text-crimson hover:bg-white hover:text-crimson-dark font-display text-sm sm:text-base tracking-widest uppercase transition-all shadow-editorial flex items-center gap-2"
              >
                <span>Explore Work</span>
                <span>↓</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-lal-362646267/"
                target="_blank"
                rel="noreferrer"
                className="px-6 sm:px-8 py-3.5 border border-white/40 hover:bg-white/10 text-white font-display text-sm sm:text-base tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
            </motion.div>
          </div>

          {/* Focal Visual Column - Portrait in signature editorial notched frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
              
              {/* Notched outer frame */}
              <div className="editorial-frame p-2 sm:p-3 bg-cream shadow-editorial-dark border-2 border-white">
                <div className="relative aspect-[4/5] overflow-hidden bg-noir">
                  <img
                    src="/poster.jpg"
                    alt="Ayush Lal"
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  {/* Subtle graphic overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-noir/80 backdrop-blur-sm border border-crimson/50 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-mono tracking-widest uppercase text-crimson font-bold">PORTFOLIO SUBJECT</p>
                      <p className="font-display tracking-wider text-sm sm:text-base text-cream">AYUSH LAL</p>
                    </div>
                    <span className="font-mono text-xs text-white/70">2026</span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Bracket Overlays */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-white pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Metadata Band (Framed stats inspired by the reference video) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pt-6 border-t border-white/20"
        >
          {[
            { label: "QUALIFIED LEADS", value: "3,000+", desc: "B2B & B2C Pipeline" },
            { label: "LEAD CONVERSION", value: "16%", desc: "Sales Analytics" },
            { label: "REVENUE LIFT", value: "10%", desc: "Campaign Optimization" },
            { label: "ACADEMIC FOCUS", value: "BIMTECH", desc: "PGDM 2026–2028" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 bg-crimson-dark/60 border border-white/20 flex flex-col justify-between"
            >
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-cream uppercase">
                {stat.label}
              </span>
              <span className="font-display text-2xl sm:text-3xl text-white mt-1">
                {stat.value}
              </span>
              <span className="text-[10px] text-white/70 font-medium">
                {stat.desc}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
