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
    <main className="bg-[#121212]">
      {/* Fixed global background canvas that stays visible everywhere */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none opacity-50">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>

      {/* 500vh container for the scroll-linked animation overlay */}
      <div ref={containerRef} className="relative h-[500vh] z-10">
        {/* Sticky container that stays in view during the 500vh scroll */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
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
