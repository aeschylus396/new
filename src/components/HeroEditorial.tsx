"use client";

import { motion } from "framer-motion";
import SamuraiHeroIllustration from "./SamuraiHeroIllustration";
import KamonCrest from "./KamonCrest";

export default function HeroEditorial() {
  return (
    <section className="relative min-h-screen bg-crimson text-white overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 border-b-2 border-crimson-dark">
      
      {/* Background Graphic Lines & Geometric Separators from reference video */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/40" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/40" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/30" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/30" />
      </div>

      {/* Left Vertical Guide Rail */}
      <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none">
        <span className="rail-label text-white/80">武士道 • AYUSH LAL • DIGITAL STRATEGY</span>
        <div className="w-[1px] h-16 bg-white/40" />
        <span className="font-mono text-[10px] text-white/70">01 / 07</span>
      </div>

      {/* Right Vertical Guide Rail */}
      <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-white/70">BIMTECH 2024–2026</span>
        <div className="w-[1px] h-16 bg-white/40" />
        <span className="rail-label text-white/80">SAMURAI STRATEGIC DISCIPLINE</span>
      </div>

      {/* Central Content Container */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 flex-1 flex flex-col justify-center my-auto py-6 sm:py-10">
        
        {/* Top Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 border-b border-white/20 pb-3"
        >
          <div className="flex items-center gap-3">
            <KamonCrest type="oda" size={24} color="#FFFFFF" />
            <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-cream">
              [ SAMURAI DISCIPLINE • DIGITAL STRATEGY & GROWTH ]
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-white/80 uppercase">
            PGDM CANDIDATE • SALES ARCHITECT • 2026
          </span>
        </motion.div>

        {/* Main Hero Composition: Grand Typography + Dynamic Samurai Character */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Typography Column */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-cream/90 mb-3 flex items-center gap-2"
            >
              <span>⚔</span> Creative Leader & Sales Strategist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-6xl sm:text-7xl md:text-8xl xl:text-[10rem] leading-[0.88] tracking-tight uppercase text-white drop-shadow-md"
            >
              AYUSH<br />
              <span className="text-cream underline decoration-white/20 decoration-2 underline-offset-8">LAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-white/95 max-w-xl font-normal leading-relaxed mt-4 sm:mt-6"
            >
              Turning strategic vision into scalable enterprise revenue through high-converting acquisition funnels, disciplined sales negotiation, and engaging video storytelling.
            </motion.p>

            {/* Quick Action CTAs */}
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

              <a
                href="tel:+919798855854"
                className="px-5 py-3.5 border border-white/30 hover:border-white text-white/90 hover:text-white font-mono text-xs tracking-wider transition-all hidden sm:flex items-center gap-2"
              >
                <span>☎</span>
                <span>+91 97988 55854</span>
              </a>
            </motion.div>
          </div>

          {/* Dynamic Samurai Character Column (Unconfined, monumental composition) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-6 xl:col-span-5 flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px]">
              {/* Dynamic Samurai Illustration with continuous breathing, eye blinking, blade shimmer, and interactive slash */}
              <SamuraiHeroIllustration />
            </div>
          </motion.div>

        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════
          BOTTOM DOCKED CREAM BIODATA CARD (Directly from reference Frame 1 & 2)
         ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full bg-cream text-noir border-t-2 border-crimson relative z-20"
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
            
            {/* Oda Clan Crest + Tag */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-crimson/25 pb-3 lg:pb-0 lg:pr-4">
              <KamonCrest type="oda" size={38} color="#F20D3A" />
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-crimson block">
                  [ ARSENAL CREST ]
                </span>
                <span className="font-display text-base tracking-wider text-noir">
                  ODA CLAN LEGACY
                </span>
              </div>
            </div>

            {/* Metric 1: Qualified Leads */}
            <div className="p-2 sm:p-3 border-r border-crimson/20">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block">
                QUALIFIED PIPELINE
              </span>
              <p className="font-display text-2xl sm:text-3xl text-noir tracking-tight leading-none mt-1">
                3,000+
              </p>
              <span className="text-[10px] text-noir/70 font-medium">B2B & B2C Outreach</span>
            </div>

            {/* Metric 2: Conversion Efficiency */}
            <div className="p-2 sm:p-3 border-r border-crimson/20">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block">
                LEAD CONVERSION
              </span>
              <p className="font-display text-2xl sm:text-3xl text-noir tracking-tight leading-none mt-1">
                16%
              </p>
              <span className="text-[10px] text-noir/70 font-medium">Sales Velocity & Closing</span>
            </div>

            {/* Metric 3: Revenue Expansion */}
            <div className="p-2 sm:p-3 border-r border-crimson/20">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block">
                REVENUE LIFT
              </span>
              <p className="font-display text-2xl sm:text-3xl text-noir tracking-tight leading-none mt-1">
                +10%
              </p>
              <span className="text-[10px] text-noir/70 font-medium">Aryan Infotech Growth</span>
            </div>

            {/* Metric 4: Academic Institution */}
            <div className="p-2 sm:p-3 col-span-2 md:col-span-1">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block">
                ACADEMIC BASE
              </span>
              <p className="font-display text-xl sm:text-2xl text-noir tracking-tight leading-none mt-1">
                BIMTECH
              </p>
              <span className="text-[10px] text-crimson font-bold">PGDM 2024–2026</span>
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
}