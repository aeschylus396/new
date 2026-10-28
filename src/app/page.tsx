"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import PortfolioContent from "@/components/PortfolioContent";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#0f1422] text-[#f8fafc] relative selection:bg-accent-blue/30 selection:text-white min-h-screen overflow-x-hidden">
      {/* Radiant ambient lighting mesh - keeps the site luminous and premium */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.14),transparent)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_35%,rgba(168,85,247,0.10),transparent)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_75%,rgba(34,211,238,0.08),transparent)] z-0" />

      {/* Fixed global background canvas that stays visible everywhere - optimized for mobile & desktop */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 overflow-hidden pointer-events-none opacity-25 md:opacity-35">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>

      {/* Responsive height container for the scroll-linked animation overlay */}
      <div ref={containerRef} className="relative h-[320vh] sm:h-[400vh] md:h-[480vh] z-10">
        {/* Sticky container that stays in view during the scroll with mobile-safe dvh */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* Content below the scroll animation */}
      <div className="relative z-20">
        <PortfolioContent />
      </div>
    </main>
  );
}
