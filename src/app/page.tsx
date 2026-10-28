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
      {/* Fixed global background canvas - crisp, vibrant visibility on laptop and mobile */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 overflow-hidden pointer-events-none opacity-60 md:opacity-75">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>

      {/* Radiant studio ambient rim lights - blends over the portrait with luminosity */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.16),transparent)] z-0 mix-blend-screen" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_35%,rgba(168,85,247,0.12),transparent)] z-0 mix-blend-screen" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_75%,rgba(34,211,238,0.09),transparent)] z-0 mix-blend-screen" />

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
