"use client";

import { motion, useTransform } from "framer-motion";

/* ─────────── SVG ICONS ─────────── */
const MegaphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 0 1-1.021-.27l-.26-.45a18.04 18.04 0 0 1-1.689-4.074m3.105-9.18A18.2 18.2 0 0 1 12 5.7m-1.66 10.14a18.046 18.046 0 0 0 1.66-10.14m0 0 3.563-1.26a.75.75 0 0 1 .978.724v13.952a.75.75 0 0 1-.978.724L12 17.7" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  /* ── Section 1: Hero (0–20%) ── */
  const op1 = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  // Custom zoom out and transparency effect for the name
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* ── Section 2: Strategy (25–50%) ── */
  const op2 = useTransform(scrollYProgress, [0.2, 0.3, 0.42, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [60, -60]);

  /* ── Section 3: Results (55–80%) ── */
  const op3 = useTransform(scrollYProgress, [0.5, 0.6, 0.72, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [60, -60]);

  /* ── Section 4: CTA (85–100%) ── */
  const op4 = useTransform(scrollYProgress, [0.8, 0.88, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.8, 1], [40, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      
      {/* ════════════ SECTION 1 — HERO ════════════ */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between"
        style={{ opacity: op1, y: y1 }}
      >
        <div className="ambient-glow ambient-blue w-[400px] h-[400px] -top-20 -left-20"></div>

        {/* Top Left: Name and Title */}
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 pt-16 md:pt-24 lg:pt-32 flex justify-start">
          <div className="space-y-6 max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pill"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mr-3 animate-pulse" />
              Digital Marketing & Strategy
            </motion.div>

            <motion.div style={{ scale: nameScale, opacity: nameOpacity, originX: 0, originY: 0.5 }}>
              <h1 className="font-heading heading-tight text-[clamp(4.5rem,8vw,7rem)] font-bold leading-[1.05] mb-4 text-gradient tracking-tight">
                Ayush <span className="text-gradient-accent">Lal</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed font-light">
                Turning strategy into growth through campaigns, content, and conversions that feel effortless.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Area: Stats and CTAs pushed to the bottom corners */}
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 pb-16 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          
          {/* Bottom Left: CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="#work"
              className="group relative px-8 py-4 rounded-full overflow-hidden text-xs font-bold tracking-widest uppercase text-white transition-all duration-500 shadow-glow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Work
              </span>
            </a>
            <a
              href="https://linkedin.com/in/ayush-lal"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase glass-panel hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              LinkedIn ↗
            </a>
          </motion.div>

          {/* Bottom Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 items-end"
          >
            {[
              { icon: <MegaphoneIcon />, label: "Digital Campaigns", color: "text-accent-blue" },
              { icon: <ChartIcon />, label: "3K+ Qualified Leads", color: "text-accent-cyan" },
              { icon: <TargetIcon />, label: "16% Conversion", color: "text-accent-purple" },
            ].map((item, i) => (
              <div key={i} className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 text-sm text-white font-medium backdrop-blur-xl">
                <span className={`${item.color}`}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* ════════════ SECTION 2 — STRATEGY FUNNEL ════════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start"
        style={{ opacity: op2, y: y2 }}
      >
        <div className="ambient-glow ambient-purple w-[600px] h-[600px] top-1/4 -left-20"></div>
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 flex justify-start">
          
          <div className="space-y-8 relative z-10 max-w-xl text-left">
            <div className="glass-pill">
              <span className="text-accent-purple mr-2"><RocketIcon /></span>
              Strategic Process
            </div>

            <h2 className="font-heading heading-tight text-5xl md:text-7xl font-bold leading-[1.1] text-gradient">
              Research.<br />
              <span className="text-gradient-warm">Qualify.</span><br />
              Convert.
            </h2>

            <p className="text-lg md:text-xl text-muted leading-relaxed font-light">
              Building data-driven pipelines through deep market research, omnichannel outreach, and conversion-focused architecture.
            </p>

            {/* Process steps pushed to the left corner block */}
            <div className="grid grid-cols-2 gap-4 pt-6 w-full">
              {[
                { step: "01", label: "Understand", desc: "Customer & Market" },
                { step: "02", label: "Strategize", desc: "Channel & Message" },
                { step: "03", label: "Create", desc: "Content Campaigns" },
                { step: "04", label: "Measure", desc: "Lead Conversion" },
              ].map((s, i) => (
                <div key={i} className="glass-panel rounded-3xl p-5 group flex flex-col justify-between text-left border-l-2 border-l-transparent hover:border-l-accent-purple transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-bold tracking-wide text-foreground">{s.label}</h4>
                    <span className="text-xs font-heading font-bold text-muted/30 group-hover:text-accent-purple transition-colors">
                      {s.step}
                    </span>
                  </div>
                  <p className="text-xs text-muted/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ════════════ SECTION 3 — RESULTS & EXECUTION ════════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end"
        style={{ opacity: op3, y: y3 }}
      >
        <div className="ambient-glow ambient-cyan w-[600px] h-[600px] bottom-1/4 -right-20"></div>
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 flex justify-end">
          
          <div className="space-y-8 relative z-10 max-w-xl text-right flex flex-col items-end">
            <div className="glass-pill">
              Impact & Results
              <span className="text-accent-cyan ml-2"><ChartIcon /></span>
            </div>

            <h2 className="font-heading heading-tight text-5xl md:text-7xl font-bold leading-[1.1] text-gradient">
              Design that<br />
              <span className="text-gradient-accent">performs.</span>
            </h2>

            <p className="text-lg md:text-xl text-muted leading-relaxed font-light text-right">
              Bridging the gap between high-end visual aesthetics and hard marketing analytics — built to engage, convert, and scale.
            </p>

            {/* Metric cards arranged on the right */}
            <div className="grid grid-cols-2 gap-6 pt-6 w-full text-center">
              {[
                { value: "3K+", label: "Qualified Leads", color: "text-accent-blue" },
                { value: "16%", label: "Lead Conversion", color: "text-accent-cyan" },
                { value: "10%", label: "Revenue Lift", color: "text-accent-green" },
                { value: "2", label: "Enterprise Clients", color: "text-accent-purple" },
              ].map((m, i) => (
                <div key={i} className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity bg-current ${m.color}`} />
                  <div className={`text-4xl md:text-5xl font-heading font-bold mb-3 tracking-tight relative z-10 ${m.color}`}>{m.value}</div>
                  <p className="text-xs text-muted uppercase tracking-widest font-semibold relative z-10">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ════════════ SECTION 4 — CTA BRIDGE ════════════ */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: op4, y: y4 }}
      >
        <div className="ambient-glow ambient-blue w-[800px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="text-center space-y-10 max-w-3xl px-8 relative z-10">
          
          <div className="glass-pill">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse mr-3" />
            Open to Opportunities
          </div>

          <h2 className="font-heading heading-tight text-5xl md:text-7xl font-bold leading-[1.05] text-gradient">
            Let's build<br />
            <span className="text-gradient-accent">something great.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed font-light">
            Scroll down to explore the complete portfolio, detailed case studies, and the creative work that drives results.
          </p>

          <div className="flex flex-col items-center gap-6 pt-8">
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
