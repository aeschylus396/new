"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  tags?: string[];
  type: string;
  img: string;
  poster?: string;
  isVideo?: boolean;
  link?: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 14, 
    title: "Aesthetic Touch Hospital", 
    category: "HEALTHCARE", 
    tags: ["MARKETING", "HEALTHCARE", "SOCIAL MEDIA"],
    type: "Healthcare Branding & Social Media", 
    img: "/work/aesthetic-touch.jpg", 
    link: "https://www.instagram.com/drshubhamplasticsurgeon/" 
  },
  { 
    id: 15, 
    title: "Digimark Globals", 
    category: "MARKETING", 
    tags: ["MARKETING", "SOCIAL MEDIA"],
    type: "Digital Marketing & Brand Reach", 
    img: "/illustrations/funnel.jpg", 
    link: "https://www.instagram.com/digimarkglobals/" 
  },
  { 
    id: 16, 
    title: "Raksha Bandhan Campaign", 
    category: "E-CELL", 
    tags: ["E-CELL", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ECELL/ChatGPT%20Image%20Aug%2014,%202026,%2004_40_28%20PM.jpg", 
    link: "https://www.instagram.com/ecell_bimtech/" 
  },
  { 
    id: 17, 
    title: "National Sports Day", 
    category: "E-CELL", 
    tags: ["E-CELL", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ECELL/ChatGPT%20Image%20Aug%2020,%202026,%2001_47_28%20PM.jpg", 
    link: "https://www.instagram.com/ecell_bimtech/" 
  },
  { 
    id: 4, 
    title: "AIC BIMTECH Promotional Reel", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "VIDEO", "SOCIAL MEDIA"],
    type: "Video Editing & Direction", 
    img: "/work/POSTERS/video%20editing/ayush-reel-optimized.mp4", 
    poster: "/work/POSTERS/video%20editing/ayush-reel-poster.jpg", 
    isVideo: true 
  },
  { 
    id: 7, 
    title: "Happy Durga Ashtami", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "LinkedIn Graphic", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post).jpg" 
  },
  { 
    id: 8, 
    title: "Ganesh Chaturthi Post", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(2).jpg" 
  },
  { 
    id: 9, 
    title: "World Mental Health Day", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(3).jpg" 
  },
  { 
    id: 10, 
    title: "Durga Ashtami Creative", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(4).jpg" 
  },
  { 
    id: 11, 
    title: "Happy Dussehra", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(5).jpg" 
  },
  { 
    id: 12, 
    title: "United Nations Day", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(6).jpg" 
  },
  { 
    id: 13, 
    title: "Happy Diwali", 
    category: "AIC BIMTECH", 
    tags: ["AIC BIMTECH", "POSTERS", "SOCIAL MEDIA"],
    type: "Social Media Creative", 
    img: "/work/POSTERS/ATAL%20INCUBATION%20CENTRE/Ganesh%20(LinkedIn%20Post)%20(7).jpg" 
  },
];

const filters = ["ALL", "POSTERS", "VIDEO", "HEALTHCARE", "AIC BIMTECH", "E-CELL", "MARKETING"];

export default function PortfolioEditorial() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Expandable timeline rows state (inspired by the reference video)
  const [expandedRow, setExpandedRow] = useState<string | null>("experience-1");

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Video Reel Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoTime, setVideoTime] = useState({ current: "0:00", duration: "1:10" });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 70.78;
      setProgress((cur / dur) * 100);
      setVideoTime({
        current: formatTime(cur),
        duration: formatTime(dur),
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const dur = videoRef.current.duration || 70.78;
      videoRef.current.currentTime = Math.max(0, Math.min(pos * dur, dur));
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    if (selectedItem) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedItem]);

  return (
    <div className="bg-cream text-noir relative">
      
      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 01: PROFILE & BIODATA (CREAM EDITORIAL SECTION)
         ════════════════════════════════════════════════════════════════ */}
      <section id="profile" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 border-b border-crimson/30 relative">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-crimson/30 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 01 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-noir/80">BIODATA & STRATEGIC PROFILE</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">02 / 07</span>
          </div>

          {/* Signature Notched Editorial Card (Inspired by Frame 1 & Frame 2) */}
          <div className="editorial-frame p-6 sm:p-10 md:p-14 bg-cream-light border-2 border-crimson relative">
            
            {/* Top Emblem */}
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 border border-crimson rounded-full flex items-center justify-center p-2 bg-crimson/5">
                <div className="w-full h-full rounded-full border border-crimson flex items-center justify-center font-display text-crimson text-lg">
                  AL
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-center text-crimson leading-[1.05] tracking-tight uppercase max-w-4xl mx-auto mb-8">
              AYUSH LAL IS A PGDM CANDIDATE AT BIMTECH SPECIALIZING IN <span className="text-noir underline decoration-crimson decoration-2">DIGITAL MARKETING AND SALES STRATEGY</span>
            </h2>

            <p className="text-base sm:text-lg text-noir/85 max-w-3xl mx-auto text-center leading-relaxed font-normal mb-12">
              I bridge the gap between creative storytelling and data-driven lead generation to drive real business growth. My experience spans campaign execution, customer acquisition, market research, content creation, and business development. I work at the intersection of Marketing, Sales, Consumer Behavior, and Digital Growth.
            </p>

            {/* 6-Grid Editorial Metadata (Directly styled like reference Frame 1) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-crimson/25">
              
              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ PRIMARY SPECIALIZATION ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-noir tracking-wide">DIGITAL MARKETING & SALES</p>
                <p className="text-xs text-noir/70 mt-1">Campaign Strategy & Lead Funnels</p>
              </div>

              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ CURRENT INSTITUTION ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-noir tracking-wide">BIMTECH PGDM</p>
                <p className="text-xs text-crimson font-bold mt-1">2026–2028 | Pursuing</p>
              </div>

              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ UNDERGRADUATE DEGREE ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-noir tracking-wide">B.SC. GRADUATE</p>
                <p className="text-xs text-noir/70 mt-1">A.N. College | 2021–2024 (65%)</p>
              </div>

              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ PROVEN PIPELINE ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-crimson tracking-wide">3,000+ QUALIFIED LEADS</p>
                <p className="text-xs text-noir/70 mt-1">Cold Outreach & Digital Acquisition</p>
              </div>

              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ CONVERSION EFFICIENCY ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-crimson tracking-wide">16% CONVERSION RATE</p>
                <p className="text-xs text-noir/70 mt-1">Consultative Sales & Negotiation</p>
              </div>

              <div className="p-4 border border-crimson/20 bg-cream">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-crimson block mb-1">
                  [ ENTERPRISE OUTCOME ]
                </span>
                <p className="font-display text-xl sm:text-2xl text-crimson tracking-wide">10% REVENUE LIFT</p>
                <p className="text-xs text-noir/70 mt-1">2 Major Enterprise Clients Closed</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 02: STRATEGIC METHODOLOGY (NOIR & CRIMSON TRANSITION)
         ════════════════════════════════════════════════════════════════ */}
      <section id="strategy" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 bg-noir text-cream border-b border-crimson/40 relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-between border-b border-crimson/40 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 02 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-cream/80">STRATEGIC FRAMEWORK</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">03 / 07</span>
          </div>

          {/* Monumental Headline */}
          <div className="text-center mb-16">
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">BATTLE-TESTED GROWTH</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-white tracking-tight uppercase">
              STRATEGY
            </h2>
            <p className="text-sm sm:text-base text-cream/80 max-w-xl mx-auto mt-4 font-normal">
              Building high-efficiency lead pipelines through deep consumer insights, omnichannel messaging, and conversion-focused funnels.
            </p>
          </div>

          {/* 4-Step Methodology Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: "01", title: "UNDERSTAND", desc: "Customer + Market + Problem", detail: "Deep market analysis, competitor positioning, and audience pain points." },
              { num: "02", title: "STRATEGIZE", desc: "Positioning + Channel + Message", detail: "Hyperlocal targeting, channel selection, and high-impact value proposition." },
              { num: "03", title: "CREATE", desc: "Content + Design + Campaign", detail: "Visual storytelling, persuasive copywriting, and short-form video reels." },
              { num: "04", title: "MEASURE", desc: "Reach + Engagement + Conversion", detail: "Conversion rate optimization, sales analytics, and ROI scaling." },
            ].map((step, i) => (
              <div
                key={step.num}
                className="editorial-frame-noir p-6 sm:p-8 border border-crimson/30 hover:border-crimson transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl text-crimson group-hover:scale-105 transition-transform">
                    {step.num}
                  </span>
                  <span className="w-2.5 h-2.5 bg-crimson" />
                </div>
                <h3 className="font-display text-2xl text-white tracking-wider uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mb-3">
                  {step.desc}
                </p>
                <p className="text-xs text-cream/70 leading-relaxed font-normal">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 03: PROFESSIONAL EXPERIENCE & INTERACTIVE TIMELINE
          (Inspired by Frame 5 & 7 Expandable Rows with Red Highlight)
         ════════════════════════════════════════════════════════════════ */}
      <section id="experience" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 border-b border-crimson/30 relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-between border-b border-crimson/30 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 03 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-noir/80">PIVOTAL CAREER TIMELINE</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">04 / 07</span>
          </div>

          <div className="text-center mb-16">
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">PROVEN TRACK RECORD</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-noir tracking-tight uppercase">
              EXPERIENCE
            </h2>
            <p className="text-sm sm:text-base text-noir/75 max-w-xl mx-auto mt-4 font-normal">
              Click on each timeline entry below to expand verified responsibilities, quantitative metrics, and sales pipelines.
            </p>
          </div>

          {/* Interactive Expandable Rows List */}
          <div className="space-y-4">
            
            {/* ROW 1: 3K Aryan Infotech */}
            <div className="editorial-frame border-2 border-crimson overflow-hidden transition-all">
              <button
                onClick={() => toggleRow("experience-1")}
                className={`w-full p-5 sm:p-7 flex items-center justify-between transition-colors text-left ${
                  expandedRow === "experience-1" ? "bg-crimson text-white" : "bg-cream-light text-noir hover:bg-crimson/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <span className={`font-mono text-sm sm:text-base font-bold ${expandedRow === "experience-1" ? "text-cream" : "text-crimson"}`}>
                    JAN — JUN 2026
                  </span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-4xl tracking-wide uppercase">
                      3K ARYAN INFOTECH
                    </h3>
                    <p className={`text-xs uppercase tracking-widest font-semibold ${expandedRow === "experience-1" ? "text-white/80" : "text-crimson"}`}>
                      Digital Marketing Intern • Lead Generation & Sales Analytics
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-none border flex items-center justify-center font-display text-xl transition-transform ${
                  expandedRow === "experience-1" ? "border-white bg-white text-crimson rotate-45" : "border-crimson text-crimson"
                }`}>
                  +
                </div>
              </button>

              <AnimatePresence>
                {expandedRow === "experience-1" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="p-6 sm:p-10 bg-cream border-t border-crimson/30 space-y-8"
                  >
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-crimson mb-2">
                        [ MANDATE & RESPONSIBILITIES ]
                      </h4>
                      <p className="text-sm sm:text-base text-noir/90 leading-relaxed max-w-4xl">
                        Managed end-to-end lead generation and customer relationship activities through cold outreach, targeted email marketing, and comprehensive market research. Applied sales analytics and consultative negotiation to maximize conversion rates and enterprise acquisition.
                      </p>
                    </div>

                    {/* Quantitative Achievement Band */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-crimson text-white border border-crimson-dark">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-cream/90 block">QUALIFIED LEADS</span>
                        <span className="font-display text-3xl sm:text-4xl">3,000+</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-cream/90 block">CONVERSION</span>
                        <span className="font-display text-3xl sm:text-4xl">16%</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-cream/90 block">REVENUE LIFT</span>
                        <span className="font-display text-3xl sm:text-4xl">10%</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-cream/90 block">ENTERPRISE CLIENTS</span>
                        <span className="font-display text-3xl sm:text-4xl">2 CLOSED</span>
                      </div>
                    </div>

                    {/* Sales Process Pipeline */}
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-crimson mb-3">
                        [ SALES PROCESS PIPELINE ]
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {["Research", "Identify", "Outreach", "Qualify", "Nurture"].map((step) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="editorial-chip">{step}</span>
                            <span className="text-crimson/50 text-xs">→</span>
                          </div>
                        ))}
                        <span className="editorial-chip !bg-crimson !text-white !border-crimson shadow-sm">
                          CONVERT
                        </span>
                      </div>
                    </div>

                    {/* Core Stack */}
                    <div>
                      <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-crimson mb-3">
                        [ CORE STACK & ARSENAL ]
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Meta Ads", "Google Ads", "SEO", "SEM", "Email Campaigns", "Lead Gen", "Cold Calling", "CRM", "Sales Analytics", "Negotiation"].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-cream-light border border-crimson/30 text-xs font-medium text-noir">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ROW 2: Academic Timeline */}
            <div className="editorial-frame border border-crimson/40 overflow-hidden transition-all">
              <button
                onClick={() => toggleRow("experience-2")}
                className={`w-full p-5 sm:p-7 flex items-center justify-between transition-colors text-left ${
                  expandedRow === "experience-2" ? "bg-crimson text-white" : "bg-cream-light text-noir hover:bg-crimson/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <span className={`font-mono text-sm sm:text-base font-bold ${expandedRow === "experience-2" ? "text-cream" : "text-crimson"}`}>
                    2021 — 2028
                  </span>
                  <div>
                    <h3 className="font-display text-2xl sm:text-4xl tracking-wide uppercase">
                      ACADEMIC FOUNDATION & MANAGEMENT
                    </h3>
                    <p className={`text-xs uppercase tracking-widest font-semibold ${expandedRow === "experience-2" ? "text-white/80" : "text-crimson"}`}>
                      BIMTECH (PGDM) & A.N. College (B.Sc.)
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-none border flex items-center justify-center font-display text-xl transition-transform ${
                  expandedRow === "experience-2" ? "border-white bg-white text-crimson rotate-45" : "border-crimson text-crimson"
                }`}>
                  +
                </div>
              </button>

              <AnimatePresence>
                {expandedRow === "experience-2" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="p-6 sm:p-10 bg-cream border-t border-crimson/30 grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="p-6 bg-cream-light border border-crimson/30">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block mb-1">
                        [ POST GRADUATE DIPLOMA IN MANAGEMENT ]
                      </span>
                      <h4 className="font-display text-3xl text-noir">BIMTECH</h4>
                      <p className="text-xs font-bold text-crimson mt-2 uppercase tracking-widest">2026–2028 | PURSUING</p>
                      <p className="text-xs text-noir/70 mt-2 leading-relaxed">
                        Specializing in Digital Marketing, Sales Strategy, Brand Positioning, Consumer Behavior, and Digital Transformation.
                      </p>
                    </div>

                    <div className="p-6 bg-cream-light border border-crimson/30">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-crimson uppercase block mb-1">
                        [ BACHELOR OF SCIENCE ]
                      </span>
                      <h4 className="font-display text-3xl text-noir">A.N. COLLEGE</h4>
                      <p className="text-xs font-bold text-crimson mt-2 uppercase tracking-widest">2021–2024 | 65% GRADUATION</p>
                      <p className="text-xs text-noir/70 mt-2 leading-relaxed">
                        Analytical thinking, quantitative research methods, mathematical modeling, and problem-solving fundamentals.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 04: CASE STUDIES & STRATEGIC PROJECTS (NOIR & CRIMSON)
         ════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 bg-noir text-cream border-b border-crimson/40 relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-between border-b border-crimson/40 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 04 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-cream/80">STRATEGIC CASE STUDIES</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">05 / 07</span>
          </div>

          <div className="text-center mb-16">
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">VERIFIED BUSINESS OUTCOMES</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-white tracking-tight uppercase">
              CASE STUDIES
            </h2>
            <p className="text-sm sm:text-base text-cream/80 max-w-xl mx-auto mt-4 font-normal">
              Real client engagements and strategic simulations connecting brand awareness to measurable customer acquisition.
            </p>
          </div>

          {/* 3 Major Case Studies in Asymmetric Editorial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Case 1: Aesthetic Touch Hospital */}
            <div className="editorial-frame-noir p-6 sm:p-8 border-2 border-crimson flex flex-col justify-between group hover:border-white transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="editorial-chip-light">HEALTHCARE BRANDING</span>
                  <span className="font-mono text-xs text-crimson font-bold">CASE 01</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide mb-1">
                  AESTHETIC TOUCH
                </h3>
                <p className="text-xs font-mono text-crimson uppercase tracking-widest font-bold mb-4">
                  Dr. Shubham Sharma | Plastic & Aesthetic Surgery
                </p>
                <p className="text-sm text-cream/80 leading-relaxed font-normal mb-6">
                  Orchestrated digital healthcare branding and social outreach for Aesthetic Touch Hospital and Dr. Shubham (MCh Plastic Surgery, PGIMER AIR 1). Drove patient acquisition and consult conversions through high-trust procedure reels, educational aesthetic content, and Instagram engagement strategy.
                </p>
              </div>

              <div className="pt-6 border-t border-crimson/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cream/60 uppercase">Growth & Outreach</span>
                <a
                  href="https://www.instagram.com/drshubhamplasticsurgeon/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-crimson hover:bg-crimson-dark text-white font-display text-xs tracking-widest uppercase transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram Profile</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Case 2: Digimark Globals */}
            <div className="editorial-frame-noir p-6 sm:p-8 border-2 border-crimson flex flex-col justify-between group hover:border-white transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="editorial-chip-light">MARKETING ANALYTICS</span>
                  <span className="font-mono text-xs text-crimson font-bold">CASE 02</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide mb-1">
                  DIGIMARK GLOBALS
                </h3>
                <p className="text-xs font-mono text-crimson uppercase tracking-widest font-bold mb-4">
                  Marketing Project | Jul – Aug 2026
                </p>
                <p className="text-sm text-cream/80 leading-relaxed font-normal mb-6">
                  Improved brand visibility and audience engagement by analyzing Instagram reach and engagement metrics to identify content opportunities and optimize promotional campaigns through reels, posters, and digital content.
                </p>
              </div>

              <div className="pt-6 border-t border-crimson/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cream/60 uppercase">Metrics & Conversion</span>
                <a
                  href="https://www.instagram.com/digimarkglobals/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-crimson hover:bg-crimson-dark text-white font-display text-xs tracking-widest uppercase transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram Profile</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Case 3: Omnichannel Strategy */}
            <div className="editorial-frame-noir p-6 sm:p-8 border-2 border-crimson flex flex-col justify-between group hover:border-white transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="editorial-chip-light">CUSTOMER JOURNEY</span>
                  <span className="font-mono text-xs text-crimson font-bold">CASE 03</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide mb-1">
                  OMNICHANNEL STRATEGY
                </h3>
                <p className="text-xs font-mono text-crimson uppercase tracking-widest font-bold mb-4">
                  Lululemon | Forage | Dec 25 – Jan 26
                </p>
                <p className="text-sm text-cream/80 leading-relaxed font-normal mb-6">
                  Developed an integrated omnichannel strategy for Lululemon MIRROR by analyzing customer journeys, leveraging digital transformation and hyperlocal insights to identify engagement opportunities and drive product adoption.
                </p>
              </div>

              <div className="pt-6 border-t border-crimson/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cream/60 uppercase">Product Adoption</span>
                <span className="px-4 py-2 border border-white/30 text-white font-display text-xs tracking-widest uppercase">
                  Strategic Audit
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 05: CREATIVE WORK & FEATURED VIDEO PRODUCTION
         ════════════════════════════════════════════════════════════════ */}
      <section id="creative" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 border-b border-crimson/30 relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-between border-b border-crimson/30 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 05 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-noir/80">CREATIVE & VIDEO PRODUCTION</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">06 / 07</span>
          </div>

          <div className="text-center mb-16">
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">VISUAL STORYTELLING</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-noir tracking-tight uppercase">
              CREATIVE WORK
            </h2>
            <p className="text-sm sm:text-base text-noir/75 max-w-xl mx-auto mt-4 font-normal">
              High-impact visual campaigns, social media graphics, and directed video production for incubation centres and brands.
            </p>
          </div>

          {/* FEATURED VIDEO REEL SHOWCASE (Editorial Frame Treatment) */}
          <div className="editorial-frame p-6 sm:p-10 md:p-12 border-2 border-crimson bg-cream-light mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Video Player Box */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] bg-noir shadow-editorial-dark border-2 border-crimson overflow-hidden group">
                  <video
                    ref={videoRef}
                    src="/work/POSTERS/video%20editing/ayush-reel-optimized.mp4"
                    poster="/work/POSTERS/video%20editing/ayush-reel-poster.jpg"
                    playsInline
                    autoPlay
                    muted={isMuted}
                    loop
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    className="w-full h-full object-cover cursor-pointer"
                  />

                  {/* Play Overlay */}
                  <div
                    onClick={togglePlay}
                    className={`absolute inset-0 flex items-center justify-center bg-noir/40 transition-opacity cursor-pointer ${
                      isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                      ) : (
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </div>
                  </div>

                  {/* Header badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="editorial-chip-light !bg-noir/80 !text-[9px]">● 1080×1920 HD</span>
                    <span className="font-mono text-[10px] text-white bg-noir/80 px-2 py-0.5">{videoTime.current} / {videoTime.duration}</span>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-noir via-noir/80 to-transparent pt-6">
                    <div
                      onClick={handleSeek}
                      className="w-full h-1.5 bg-white/20 rounded-none mb-3 cursor-pointer overflow-hidden"
                      title="Seek video"
                    >
                      <div className="h-full bg-crimson transition-all duration-100" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button onClick={togglePlay} className="text-white text-xs font-bold uppercase font-display tracking-wider">
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className={`text-xs font-display tracking-wider uppercase px-2 py-0.5 ${!isMuted ? "bg-crimson text-white" : "text-white/80"}`}
                        >
                          {!isMuted ? "Sound ON" : "Sound OFF"}
                        </button>
                        <button onClick={handleFullscreen} className="text-white/80 hover:text-white" title="Fullscreen">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="editorial-chip !bg-crimson !text-white !border-crimson">★ FEATURED VIDEO PRODUCTION</span>
                  <span className="editorial-chip">AIC-BIMTECH INCUBATION</span>
                </div>

                <h3 className="font-display text-4xl sm:text-5xl text-noir tracking-tight uppercase leading-tight">
                  STARTUP ECOSYSTEM <br />
                  <span className="text-crimson">PROMOTIONAL CAMPAIGN REEL</span>
                </h3>

                <p className="text-sm sm:text-base text-noir/80 leading-relaxed font-normal">
                  Directed and edited dynamic promotional campaign reel for Atal Incubation Centre (AIC-BIMTECH). Designed for high-retention short-form digital consumption with rapid narrative transitions, audio-driven beat cuts, and real startup ecosystem storytelling.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-cream border border-crimson/30">
                    <span className="text-[10px] font-mono font-bold text-crimson uppercase block">FORMAT</span>
                    <span className="font-display text-lg text-noir">9:16 VERTICAL REEL</span>
                  </div>
                  <div className="p-3 bg-cream border border-crimson/30">
                    <span className="text-[10px] font-mono font-bold text-crimson uppercase block">DURATION</span>
                    <span className="font-display text-lg text-noir">01:10 FULL CUT</span>
                  </div>
                  <div className="p-3 bg-cream border border-crimson/30 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono font-bold text-crimson uppercase block">PLATFORM</span>
                    <span className="font-display text-lg text-noir">INSTAGRAM & LINKEDIN</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={toggleMute}
                    className="px-6 py-3 bg-crimson hover:bg-crimson-dark text-white font-display text-sm tracking-widest uppercase transition-colors"
                  >
                    {isMuted ? "🔊 Play with Sound" : "🔇 Mute Audio"}
                  </button>
                  <button
                    onClick={() => setSelectedItem(portfolioItems.find(i => i.id === 4) || null)}
                    className="px-6 py-3 border border-crimson text-crimson hover:bg-crimson hover:text-white font-display text-sm tracking-widest uppercase transition-colors"
                  >
                    Open Full Cinema Modal ↗
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Filter Pills for Artwork Gallery */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 font-display text-xs tracking-widest uppercase transition-all border ${
                  activeFilter === f
                    ? "bg-crimson text-white border-crimson shadow-sm"
                    : "bg-cream-light text-noir border-crimson/30 hover:border-crimson"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry / Editorial Poster Collection */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {portfolioItems
                .filter(item =>
                  activeFilter === "ALL" ||
                  item.category === activeFilter ||
                  item.tags?.includes(activeFilter) ||
                  (activeFilter === "VIDEO" && item.isVideo)
                )
                .map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="editorial-frame p-3 sm:p-4 bg-cream-light border-2 border-crimson cursor-pointer group break-inside-avoid hover:shadow-card transition-all"
                  >
                    <div className="relative overflow-hidden bg-noir mb-3">
                      {item.isVideo ? (
                        <div className="relative aspect-[9/16]">
                          <video
                            src={item.img}
                            poster={item.poster || "/work/POSTERS/video%20editing/ayush-reel-poster.jpg"}
                            preload="metadata"
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="editorial-chip-light !text-[9px] !bg-crimson">VIDEO REEL</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-crimson/20">
                      <div>
                        <p className="text-[10px] font-mono text-crimson font-bold uppercase tracking-wider">{item.type}</p>
                        <h4 className="font-display text-lg text-noir tracking-wide uppercase truncate max-w-[220px]">{item.title}</h4>
                      </div>
                      <span className="text-crimson font-display text-sm group-hover:translate-x-1 transition-transform">
                        VIEW ↗
                      </span>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 06: ACHIEVEMENTS & LEADERSHIP TIMELINE
         ════════════════════════════════════════════════════════════════ */}
      <section id="achievements" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 border-b border-crimson/30 relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center justify-between border-b border-crimson/30 pb-4 mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-crimson uppercase tracking-widest">[ CHAPTER 06 ]</span>
              <span className="w-8 h-[1px] bg-crimson" />
              <span className="text-xs font-bold tracking-widest uppercase text-noir/80">LEADERSHIP & RECOGNITION</span>
            </div>
            <span className="font-mono text-xs text-crimson font-bold">07 / 07</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Leadership Box */}
            <div className="editorial-frame p-8 sm:p-10 border-2 border-crimson bg-cream-light">
              <span className="text-xs font-mono font-bold tracking-widest text-crimson uppercase block mb-3">
                [ CLUB & CAMPUS ROLES ]
              </span>
              <h3 className="font-display text-4xl text-noir tracking-tight uppercase mb-8">
                LEADERSHIP
              </h3>
              
              <div className="space-y-8">
                <div className="border-l-2 border-crimson pl-6">
                  <h4 className="font-display text-2xl text-noir uppercase">TATVA — THE IT CLUB, BIMTECH</h4>
                  <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mt-1">Executive Member</p>
                  <p className="text-sm text-noir/80 leading-relaxed mt-2 font-normal">
                    Led social media content creation and management for the club, driving visibility, engagement, and audience growth across platforms.
                  </p>
                </div>

                <div className="border-l-2 border-crimson pl-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-2xl text-noir uppercase">E-CELL, BIMTECH</h4>
                    <a
                      href="https://www.instagram.com/ecell_bimtech/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-crimson hover:underline"
                    >
                      @ecell_bimtech ↗
                    </a>
                  </div>
                  <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mt-1">
                    Executive Member | Social Media & Creativity
                  </p>
                  <p className="text-sm text-noir/80 leading-relaxed mt-2 font-normal">
                    Handled social media management and event organization for E-Cell activities, coordinated promotions, and contributed actively as part of the Creativity Team.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements Box */}
            <div className="editorial-frame p-8 sm:p-10 border-2 border-crimson bg-cream-light">
              <span className="text-xs font-mono font-bold tracking-widest text-crimson uppercase block mb-3">
                [ COMPETITIVE HONORS ]
              </span>
              <h3 className="font-display text-4xl text-noir tracking-tight uppercase mb-8">
                ACHIEVEMENTS
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl text-crimson">01</span>
                  <div>
                    <h4 className="font-display text-2xl text-noir uppercase">SEMI-FINALIST</h4>
                    <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mt-1">
                      Thrive MBA (Corporate)
                    </p>
                    <p className="text-sm text-noir/80 leading-relaxed mt-2 font-normal">
                      Semi-Finalist across 2 Case Competitions — Prodman and Marketer, competing against nationwide business school cohorts.
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-crimson/20 w-full" />

                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl text-crimson">02</span>
                  <div>
                    <h4 className="font-display text-2xl text-noir uppercase">TOP 10 POSITION</h4>
                    <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mt-1">
                      Re-Skill Innovathon, BIMTECH
                    </p>
                    <p className="text-sm text-noir/80 leading-relaxed mt-2 font-normal">
                      Secured Top 10 finish for designing and presenting an innovative mobile application development concept.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 07: SKILLS & ARSENAL
         ════════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 border-b border-crimson/30 relative bg-cream-light">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-crimson mb-2">COMPETENCIES</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-noir tracking-tight uppercase">
              SKILLS & ARSENAL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "SALES & BIZ DEV", items: ["Sales & Business Dev", "Lead Generation", "Cold Calling & Emailing", "Customer Relationship", "Negotiation", "Sales Analytics"] },
              { title: "DIGITAL MARKETING", items: ["Digital Marketing", "Market Research", "Consumer Behaviour", "Omnichannel", "SEO / SEM", "Google & Meta Ads"] },
              { title: "CREATIVE EXECUTION", items: ["Poster Design", "Content Creation", "Video Editing", "Social Media Content", "Visual Storytelling", "Canva"] },
              { title: "TOOLS & SOFTWARE", items: ["MS Excel & PPT", "Google Analytics", "Google Ads", "Meta Ads Manager", "Canva", "CRM Systems"] }
            ].map((group, idx) => (
              <div key={idx} className="editorial-frame p-6 sm:p-8 border border-crimson/40 bg-cream">
                <h4 className="font-display text-2xl text-noir tracking-wide uppercase mb-4 pb-2 border-b border-crimson/30">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-noir/85">
                      <span className="w-1.5 h-1.5 bg-crimson" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CHAPTER 08: CLOSING & CONTACT (CRIMSON EDITORIAL FINALE)
         ════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 bg-crimson text-white relative overflow-hidden">
        
        {/* Background Graphic Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40" />
          <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/40" />
          <div className="absolute top-0 right-1/3 w-[1px] h-full bg-white/40" />
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          
          <span className="editorial-chip-light mb-6 inline-block">
            [ FINAL CHAPTER • LET&apos;S COLLABORATE ]
          </span>

          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl uppercase tracking-tight text-white mb-6">
            LET&apos;S CONNECT
          </h2>

          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
            Open to opportunities and strategic conversations around digital marketing, sales leadership, business development, and creative content.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <a
              href="mailto:ayush.lal28@bimtech.ac.in"
              className="p-5 bg-crimson-dark border border-white/30 hover:bg-white hover:text-crimson transition-all text-left group"
            >
              <span className="text-[10px] font-mono text-cream uppercase block mb-1">DIRECT EMAIL</span>
              <p className="font-display text-lg sm:text-xl text-white group-hover:text-crimson truncate">
                ayush.lal28@bimtech.ac.in
              </p>
              <span className="text-xs text-cream/70 mt-2 block">Send Message ↗</span>
            </a>

            <a
              href="tel:+919798855854"
              className="p-5 bg-crimson-dark border border-white/30 hover:bg-white hover:text-crimson transition-all text-left group"
            >
              <span className="text-[10px] font-mono text-cream uppercase block mb-1">PHONE CONTACT</span>
              <p className="font-display text-xl sm:text-2xl text-white group-hover:text-crimson">
                +91 97988 55854
              </p>
              <span className="text-xs text-cream/70 mt-2 block">Call Direct ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-lal-362646267/"
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-crimson-dark border border-white/30 hover:bg-white hover:text-crimson transition-all text-left group"
            >
              <span className="text-[10px] font-mono text-cream uppercase block mb-1">PROFESSIONAL NETWORK</span>
              <p className="font-display text-xl sm:text-2xl text-white group-hover:text-crimson">
                LINKEDIN
              </p>
              <span className="text-xs text-cream/70 mt-2 block">Connect ↗</span>
            </a>
          </div>

          <a
            href="mailto:ayush.lal28@bimtech.ac.in"
            className="inline-flex items-center gap-3 px-10 py-4 bg-cream text-crimson hover:bg-white hover:text-crimson-dark font-display text-lg tracking-widest uppercase transition-all shadow-editorial-dark"
          >
            <span>Initiate Direct Inquiry</span>
            <span>→</span>
          </a>

        </div>

        {/* Bottom Copyright & Colophon */}
        <div className="mt-20 pt-8 border-t border-white/20 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 font-mono">
          <span>AYUSH LAL © 2026 • ALL RIGHTS RESERVED</span>
          <span className="mt-2 sm:mt-0">DESIGNED WITH RED & CREAM EDITORIAL IDENTITY</span>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════
          FULLSCREEN LIGHTBOX MODAL FOR ARTWORK & REELS
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-noir/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 border border-white bg-crimson text-white flex items-center justify-center font-display text-lg hover:bg-white hover:text-crimson transition-colors z-30"
              aria-label="Close modal"
            >
              ✕
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl max-h-[90vh] editorial-frame bg-cream border-2 border-crimson overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-[60%] bg-noir flex items-center justify-center p-4 sm:p-6 min-h-[40vh] max-h-[50vh] md:max-h-none md:h-[80vh] relative">
                {selectedItem.isVideo ? (
                  <video
                    src={selectedItem.img}
                    poster={selectedItem.poster || "/work/POSTERS/video%20editing/ayush-reel-poster.jpg"}
                    preload="auto"
                    controls
                    autoPlay
                    playsInline
                    className="max-h-full aspect-[9/16] object-contain border border-crimson"
                  />
                ) : (
                  <img
                    src={selectedItem.img}
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain border border-crimson/50"
                  />
                )}
              </div>

              <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-cream-light">
                <div>
                  <span className="editorial-chip mb-2 inline-block">{selectedItem.category}</span>
                  <h3 className="font-display text-3xl sm:text-4xl text-noir tracking-wide uppercase leading-tight mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-crimson uppercase tracking-wider mb-6">
                    {selectedItem.type}
                  </p>

                  <div className="space-y-4 text-xs text-noir/80 leading-relaxed">
                    <div className="p-3 bg-cream border border-crimson/30">
                      <p className="font-mono font-bold text-crimson text-[10px] uppercase mb-1">STRATEGIC PURPOSE</p>
                      <p>High-engagement visual creative designed to maximize conversion, audience retention, and clear brand positioning.</p>
                    </div>
                    <div className="p-3 bg-cream border border-crimson/30">
                      <p className="font-mono font-bold text-crimson text-[10px] uppercase mb-1">EXECUTION</p>
                      <p>Visual architecture, typography pacing, dynamic format optimization, and cross-platform publishing.</p>
                    </div>
                  </div>
                </div>

                {selectedItem.link && (
                  <div className="pt-6">
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-crimson hover:bg-crimson-dark text-white font-display text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Open External Link</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
