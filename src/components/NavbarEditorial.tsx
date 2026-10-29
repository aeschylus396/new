"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarEditorial() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { num: "01", label: "Profile", href: "#profile" },
    { num: "02", label: "Strategy", href: "#strategy" },
    { num: "03", label: "Experience", href: "#experience" },
    { num: "04", label: "Case Studies", href: "#projects" },
    { num: "05", label: "Creative Work", href: "#creative" },
    { num: "06", label: "Achievements", href: "#achievements" },
    { num: "07", label: "Connect", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream-light/95 backdrop-blur-md border-b border-crimson/30 py-3 shadow-sm"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="w-8 h-8 rounded-none border border-crimson flex items-center justify-center font-display text-sm tracking-wider bg-crimson text-white group-hover:bg-crimson-dark transition-colors">
              AL
            </span>
            <div className="flex flex-col">
              <span className="font-display tracking-wider text-base sm:text-lg leading-none text-noir">
                AYUSH LAL
              </span>
              <span className="text-[9px] font-bold tracking-widest text-crimson uppercase">
                Digital Strategy & Growth
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.num}
                href={item.href}
                className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-noir hover:text-crimson hover:bg-crimson/5 transition-all rounded-none flex items-center gap-1.5 border border-transparent hover:border-crimson/30"
              >
                <span className="text-[9px] font-mono text-crimson/70">{item.num}</span>
                <span>{item.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-4 py-2 bg-crimson hover:bg-crimson-dark text-white font-display text-xs tracking-widest uppercase transition-colors shadow-sm"
            >
              Let&apos;s Connect
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#contact"
              className="px-3 py-1.5 bg-crimson text-white font-display text-xs tracking-widest uppercase"
            >
              Connect
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-crimson text-crimson hover:bg-crimson hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] z-40 bg-cream border-b-2 border-crimson p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-3 pt-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-crimson mb-4 border-b border-crimson/20 pb-2">
                [ Table of Contents ]
              </p>
              {navItems.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 border-b border-crimson/15 text-noir hover:text-crimson transition-colors"
                >
                  <span className="font-display text-2xl tracking-wide uppercase">{item.label}</span>
                  <span className="font-mono text-xs text-crimson font-bold">CHAPTER {item.num}</span>
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-crimson/30 mt-6 space-y-3">
              <p className="text-xs text-noir/70 font-medium">Ayush Lal • BIMTECH PGDM & Digital Strategy</p>
              <div className="flex gap-4">
                <a href="mailto:ayush.lal28@bimtech.ac.in" className="text-xs font-bold text-crimson hover:underline">Email</a>
                <a href="tel:+919798855854" className="text-xs font-bold text-crimson hover:underline">+91 97988 55854</a>
                <a href="https://www.linkedin.com/in/ayush-lal-362646267/" target="_blank" rel="noreferrer" className="text-xs font-bold text-crimson hover:underline">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
