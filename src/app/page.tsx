"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import NavbarEditorial from "@/components/NavbarEditorial";
import HeroEditorial from "@/components/HeroEditorial";
import PortfolioEditorial from "@/components/PortfolioEditorial";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="bg-cream text-noir relative min-h-screen selection:bg-crimson selection:text-white">
      {/* Top Editorial Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-crimson origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Minimal Top Navigation */}
      <NavbarEditorial />

      {/* Chapter 00: Bold Crimson Hero Opening */}
      <HeroEditorial />

      {/* Chapters 01 to 08: Editorial Content & Interactive Features */}
      <PortfolioEditorial />
    </main>
  );
}
