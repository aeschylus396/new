"use client";

import React, { useState } from "react";
import KamonCrest from "./KamonCrest";

export default function SamuraiPillars() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "strategy",
      kamon: "oda" as const,
      tag: "PILLAR I • THE ARCHITECT",
      title: "DIGITAL STRATEGY & ACQUISITION",
      subtitle: "Full-Funnel Campaign Architecture",
      metric: "3,000+ LEADS GENERATED",
      metricLabel: "QUALIFIED PIPELINE",
      desc: "Architecting high-converting digital acquisition funnels across Meta Ads, Google Ads, SEO, and organic social media. Converting cold traffic into qualified prospective customers with surgical precision.",
      skills: ["Omnichannel Strategy", "Meta Ads Manager", "Google Ads", "Conversion Rate Optimization", "Audience Segmentation"],
    },
    {
      id: "sales",
      kamon: "tokugawa" as const,
      tag: "PILLAR II • THE WARRIOR",
      title: "SALES LEADERSHIP & NEGOTIATION",
      subtitle: "B2B Deal Execution & Conversion",
      metric: "16% CONVERSION RATE",
      metricLabel: "CLOSING EFFICIENCY",
      desc: "Executing disciplined consultative outreach, pipeline nurturing, and high-stakes negotiation. Bridging initial customer interest into signed enterprise contracts and sustainable 10% revenue expansion.",
      skills: ["Cold Calling & Emailing", "Consultative Selling", "Pipeline Velocity", "CRM Mastery", "Contract Negotiation"],
    },
    {
      id: "creative",
      kamon: "blossom" as const,
      tag: "PILLAR III • THE ARTISAN",
      title: "CREATIVE & VIDEO PRODUCTION",
      subtitle: "High-Retention Visual Storytelling",
      metric: "1080×1920 HD PRODUCTION",
      metricLabel: "DYNAMIC MEDIA REEL",
      desc: "Directing dynamic vertical reels, promotional posters, and social campaigns for Atal Incubation Centre (AIC-BIMTECH) and healthcare leaders. Engaging audiences with rapid narrative pacing and visual distinction.",
      skills: ["Video Direction & Editing", "Poster & Banner Design", "Visual Pacing", "Audio Sync", "Social Media Strategy"],
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 bg-cream border-b border-crimson/30 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-crimson/30 pb-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ THREE PILLARS ]</span>
            <span className="w-8 h-[1px] bg-crimson" />
            <span className="text-xs font-bold tracking-widest uppercase text-noir/80">SAMURAI STRATEGIC TRIAD</span>
          </div>
          <span className="font-mono text-xs text-crimson font-bold">CORE ARSENAL</span>
        </div>

        {/* Section Headline */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">THE THREE DISCIPLINES</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-noir tracking-tight uppercase">
            STRATEGIC PILLARS
          </h2>
          <p className="text-sm sm:text-base text-noir/70 max-w-xl mx-auto mt-3 font-normal">
            Inspired by the Three Unifiers of Japan in the reference video: three integrated disciplines powering comprehensive business growth.
          </p>
        </div>

        {/* 3 Perfectly Aligned Notched Editorial Cards (Inspired by Frames 9, 20 & 27) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pillars.map((pillar, i) => {
            const isActive = activePillar === i;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(i)}
                className={`editorial-frame p-6 sm:p-8 cursor-pointer transition-colors duration-300 flex flex-col justify-between border-2 h-full ${
                  isActive
                    ? "bg-crimson text-white border-crimson shadow-editorial-dark"
                    : "bg-cream-light text-noir border-crimson/40 hover:border-crimson hover:bg-white"
                }`}
              >
                <div className="flex flex-col">
                  {/* Top Bar with Kamon Crest & Tag - Fixed Height & Aligned */}
                  <div className="flex items-center justify-between h-12 mb-6 pb-4 border-b border-current border-opacity-20">
                    <span className="font-mono text-[11px] font-bold tracking-widest uppercase">
                      {pillar.tag}
                    </span>
                    <KamonCrest
                      type={pillar.kamon}
                      size={34}
                      color={isActive ? "#FFFFFF" : "#F20D3A"}
                    />
                  </div>

                  {/* Pillar Title - Unified Height Across All 3 Cards */}
                  <div className="min-h-[76px] sm:min-h-[84px] flex items-center mb-2">
                    <h3 className="font-display text-3xl sm:text-4xl tracking-wide uppercase leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  
                  {/* Subtitle - Fixed Height */}
                  <div className="min-h-[24px] mb-5">
                    <p className={`text-xs font-mono uppercase tracking-widest font-bold ${
                      isActive ? "text-cream" : "text-crimson"
                    }`}>
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Quantitative Badge - Fixed Height Across All 3 Cards */}
                  <div className={`p-3.5 mb-6 border min-h-[76px] flex flex-col justify-center ${
                    isActive
                      ? "bg-crimson-dark border-white/30 text-white"
                      : "bg-cream border-crimson/30 text-crimson"
                  }`}>
                    <span className="text-[9px] font-mono tracking-widest uppercase block mb-0.5 opacity-90">
                      KEY PERFORMANCE • {pillar.metricLabel}
                    </span>
                    <span className="font-display text-2xl tracking-wide leading-none">{pillar.metric}</span>
                  </div>

                  {/* Description - Minimum Height for Consistent Baseline */}
                  <div className="min-h-[96px] mb-6">
                    <p className={`text-sm leading-relaxed font-normal ${
                      isActive ? "text-white/90" : "text-noir/80"
                    }`}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                {/* Skills tags - Docked at Bottom with Exact Matching Baseline */}
                <div className="pt-5 border-t border-current border-opacity-20 mt-auto">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase block mb-2.5 opacity-80">
                    DISCIPLINE EXPERTISE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.skills.map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] px-2 py-0.5 font-medium ${
                          isActive
                            ? "bg-white/15 text-white border border-white/20"
                            : "bg-crimson/10 text-crimson border border-crimson/20"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}