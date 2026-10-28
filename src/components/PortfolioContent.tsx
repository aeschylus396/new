"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Big Featured Video Showcase State
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);
  const [showcasePlaying, setShowcasePlaying] = useState(true);
  const [showcaseMuted, setShowcaseMuted] = useState(true);
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [showcaseTime, setShowcaseTime] = useState({ current: "0:00", duration: "1:10" });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    if (showcaseVideoRef.current) {
      const cur = showcaseVideoRef.current.currentTime;
      const dur = showcaseVideoRef.current.duration || 70.78;
      setShowcaseProgress((cur / dur) * 100);
      setShowcaseTime({
        current: formatTime(cur),
        duration: formatTime(dur)
      });
    }
  };

  const toggleShowcasePlay = () => {
    if (showcaseVideoRef.current) {
      if (showcasePlaying) {
        showcaseVideoRef.current.pause();
        setShowcasePlaying(false);
      } else {
        showcaseVideoRef.current.play();
        setShowcasePlaying(true);
      }
    }
  };

  const toggleShowcaseMute = () => {
    if (showcaseVideoRef.current) {
      showcaseVideoRef.current.muted = !showcaseMuted;
      setShowcaseMuted(!showcaseMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showcaseVideoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const dur = showcaseVideoRef.current.duration || 70.78;
      showcaseVideoRef.current.currentTime = Math.max(0, Math.min(pos * dur, dur));
    }
  };

  const handleFullscreen = () => {
    if (showcaseVideoRef.current) {
      if (showcaseVideoRef.current.requestFullscreen) {
        showcaseVideoRef.current.requestFullscreen();
      }
    }
  };
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (selectedItem) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedItem]);

  return (
    <div className="relative bg-transparent pt-8 sm:pt-12 pb-24 sm:pb-32">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan origin-left z-50 shadow-glow"
        style={{ scaleX }}
      />

      {/* Floating Glass Navigation */}
      <nav className="fixed bottom-4 sm:bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 glass-nav rounded-full px-2 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1 overflow-x-auto max-w-[95vw] md:max-w-none no-scrollbar shadow-2xl border border-white/10">
        {[
          { id: "about", label: "About" },
          { id: "experience", label: "Experience" },
          { id: "projects", label: "Projects" },
          { id: "work", label: "Creative & Video" },
          { id: "achievements", label: "Achievements" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 space-y-20 sm:space-y-32 md:space-y-44 mt-12 sm:mt-20 md:mt-28">
        
        {/* ABOUT ME */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative scroll-mt-24"
        >
          <div className="ambient-glow ambient-blue w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] -top-20 -left-20"></div>
          
          <div className="lg:col-span-8 relative z-10">
            <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 font-bold">
              <span className="w-8 h-px bg-accent-blue/50"></span> Profile
            </h2>
            <h3 className="font-heading heading-tight text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.25] mb-6 text-foreground">
              I am <span className="font-bold text-gradient">Ayush Lal</span>, a PGDM student at BIMTECH specializing in <span className="text-gradient-accent">digital marketing and sales strategy.</span> I bridge the gap between creative storytelling and data-driven lead generation to drive real business growth.
            </h3>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              My background spans campaign execution, customer acquisition, market research, content creation, and business development. I work at the intersection of Marketing, Sales, Consumer Behavior, and Digital Growth.
            </p>
          </div>
          
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl relative z-10 w-full">
            <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6">Education</h4>
            <div className="space-y-6">
              <div className="group">
                <h5 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-cyan transition-colors">PGDM</h5>
                <p className="text-slate-300 text-sm mt-1">BIMTECH</p>
                <p className="text-accent-cyan text-xs mt-2 uppercase tracking-widest font-semibold">2026–2028 | Pursuing</p>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="group">
                <h5 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-cyan transition-colors">B.Sc.</h5>
                <p className="text-slate-300 text-sm mt-1">A.N. College</p>
                <p className="text-accent-cyan text-xs mt-2 uppercase tracking-widest font-semibold">2021–2024 | 65%</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* HOW I APPROACH MARKETING (METHODOLOGY) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs text-accent-purple tracking-[0.2em] uppercase mb-8 sm:mb-12 flex items-center justify-center gap-3 sm:gap-4 font-bold text-center">
            <span className="w-8 h-px bg-accent-purple/50"></span> Methodology <span className="w-8 h-px bg-accent-purple/50"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="ambient-glow ambient-purple w-[500px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            
            {[
              { num: "01", title: "Understand", desc: "Customer + Market + Problem" },
              { num: "02", title: "Strategize", desc: "Positioning + Channel + Message" },
              { num: "03", title: "Create", desc: "Content + Design + Campaign" },
              { num: "04", title: "Measure", desc: "Reach + Engagement + Conversion" }
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 group flex flex-col relative z-10"
              >
                <div className="text-3xl sm:text-4xl font-heading font-bold text-slate-500/30 mb-4 sm:mb-6 group-hover:text-accent-purple transition-colors">{step.num}</div>
                <h3 className="text-lg sm:text-xl font-heading font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-slate-300 text-sm font-normal leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE & LEAD GENERATION */}
        <motion.section 
          id="experience"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative scroll-mt-24"
        >
          <div className="ambient-glow ambient-cyan w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] top-0 right-0"></div>
          <h2 className="text-xs text-accent-cyan tracking-[0.2em] uppercase mb-8 sm:mb-12 flex items-center gap-3 sm:gap-4 font-bold relative z-10">
            <span className="w-8 h-px bg-accent-cyan/50"></span> Experience
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
            <div className="lg:col-span-4 border-l-2 border-accent-cyan/40 pl-6 sm:pl-8 relative">
              <div className="absolute -left-1.5 top-2 w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-glow"></div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2 sm:mb-3 text-foreground">3K Aryan Infotech</h3>
              <p className="text-base sm:text-lg text-accent-cyan mb-3 font-semibold">Digital Marketing Intern</p>
              <span className="glass-pill !py-1 !px-3.5 !text-xs font-bold text-slate-200">Jan — Jun 2026</span>
            </div>
            
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                Managed end-to-end lead generation and customer relationship activities through cold outreach, targeted email marketing, and comprehensive market research. Applied sales analytics and consultative negotiation to maximize conversion rates and enterprise acquisition.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 py-6 sm:py-8 border-y border-white/10">
                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-accent-blue mb-1">3k+</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-semibold leading-tight">Qualified Leads</div>
                </div>
                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-accent-cyan mb-1">16%</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-semibold leading-tight">Conversion</div>
                </div>
                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-accent-green mb-1">10%</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-semibold leading-tight">Revenue Lift</div>
                </div>
                <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-accent-purple mb-1">2</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-widest font-semibold leading-tight">Enterprise Clients</div>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-300 mb-4">Sales Process Pipeline</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {["Research", "Identify", "Outreach", "Qualify", "Nurture"].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="glass-pill !text-[11px] text-slate-200">{step}</span>
                      <span className="text-white/20 text-xs">→</span>
                    </div>
                  ))}
                  <span className="glass-pill !text-[11px] !bg-accent-blue/20 !border-accent-blue/40 !text-white shadow-glow font-bold">Convert</span>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-300 mb-4">Core Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["Meta Ads", "Google Ads", "SEO", "SEM", "Email Campaigns", "Lead Gen", "Cold Calling", "CRM", "Sales Analytics", "Negotiation"].map(skill => (
                    <span key={skill} className="glass-pill !px-3 !py-1.5 !text-[11px] text-slate-200 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CASE STUDIES (PROJECTS) */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24"
        >
          <h2 className="text-xs text-accent-green tracking-[0.2em] uppercase mb-8 sm:mb-12 flex items-center gap-3 sm:gap-4 font-bold">
            <span className="w-8 h-px bg-accent-green/50"></span> Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Aesthetic Touch Hospital */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col group relative overflow-hidden border-t-2 border-t-transparent hover:border-t-accent-cyan transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-cyan/15 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Aesthetic Touch</h3>
                    <span className="glass-pill !text-[9px] !py-1 !px-2.5 text-accent-cyan border-accent-cyan/30">Hospital & Clinic</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-accent-cyan font-bold uppercase tracking-[0.15em] mb-4">Dr. Shubham Sharma | Plastic & Aesthetic Surgery</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    Orchestrated digital healthcare branding and social outreach for Aesthetic Touch Hospital and Dr. Shubham (MCh Plastic Surgery, PGIMER AIR 1). Drove patient acquisition and consult conversions through high-trust procedure reels, educational aesthetic content, and Instagram engagement strategy.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Healthcare Digital Growth</span>
                  <a 
                    href="https://www.instagram.com/drshubhamplasticsurgeon/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="glass-pill !text-[11px] !py-1.5 !px-3 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all text-accent-cyan font-semibold"
                  >
                    <span>Instagram ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Digimark Globals */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col group relative overflow-hidden border-t-2 border-t-transparent hover:border-t-accent-green transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-green/10 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-2 text-foreground">Digimark Globals</h3>
                  <p className="text-[10px] sm:text-xs text-accent-green font-bold uppercase tracking-[0.15em] mb-4">Marketing Project | Jul – Aug 2026</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    Improved brand visibility and audience engagement by analyzing Instagram reach and engagement metrics to identify content opportunities and optimize promotional campaigns through reels, posters, and digital content.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Social Media Analytics</span>
                  <a 
                    href="https://www.instagram.com/digimarkglobals/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="glass-pill !text-[11px] !py-1.5 !px-3 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all text-accent-green font-semibold"
                  >
                    <span>Instagram ↗</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Omnichannel Strategy */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col group relative overflow-hidden border-t-2 border-t-transparent hover:border-t-accent-blue transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-blue/10 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-2 text-foreground">Omnichannel Strategy</h3>
                  <p className="text-[10px] sm:text-xs text-accent-blue font-bold uppercase tracking-[0.15em] mb-4">Lululemon | Forage | Dec 25 – Jan 26</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    Developed an integrated omnichannel strategy for Lululemon MIRROR by analyzing customer journeys, leveraging digital transformation and hyperlocal insights to identify engagement opportunities and drive product adoption.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Customer Journey & Strategy</span>
                  <span className="glass-pill !text-[11px] !py-1.5 !px-3 text-accent-blue font-semibold">Case Study</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CREATIVE PORTFOLIO & VIDEO SHOWCASE */}
        <motion.section 
          id="work"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-3 flex items-center gap-3 sm:gap-4 font-bold">
                <span className="w-8 h-px bg-accent-blue/50"></span> Creative Execution
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground">
                Visual Content & <span className="text-gradient-accent">Video Production</span>
              </h3>
            </div>
            <span className="text-xs text-slate-300 font-medium">Campaigns • Posters • Reels • Digital Graphics</span>
          </div>

          {/* FEATURED VIDEO PRODUCTION SHOWCASE */}
          <div className="glass-panel rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 mb-12 sm:mb-16 relative overflow-hidden">
            {/* Ambient glowing background */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-accent-blue/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-accent-purple/15 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Large Video Reel Container */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[9/16] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-slate-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] border-2 border-white/15 group">
                  
                  <video
                    ref={showcaseVideoRef}
                    src="/work/POSTERS/video%20editing/ayush-reel-optimized.mp4"
                    poster="/work/POSTERS/video%20editing/ayush-reel-poster.jpg"
                    playsInline
                    autoPlay
                    muted={showcaseMuted}
                    loop
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onClick={toggleShowcasePlay}
                    className="w-full h-full object-cover cursor-pointer"
                  />

                  {/* Tap overlay play/pause icon */}
                  <div 
                    onClick={toggleShowcasePlay}
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${showcasePlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                  >
                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full glass-panel flex items-center justify-center shadow-glow border border-white/30 text-white transform group-hover:scale-110 transition-transform">
                      {showcasePlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                      ) : (
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none">
                    <span className="glass-pill !py-1 !px-2.5 sm:!px-3 !text-[9px] font-bold text-accent-cyan border-accent-cyan/30 !bg-slate-950/60 backdrop-blur-md">
                      ● 1080×1920 HD
                    </span>
                    <span className="glass-pill !py-1 !px-2 sm:!px-2.5 !text-[9px] font-medium text-white/90 !bg-slate-950/60 backdrop-blur-md">
                      {showcaseTime.current} / {showcaseTime.duration}
                    </span>
                  </div>

                  {/* Bottom Interactive Glass Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6 sm:pt-8">
                    {/* Progress Bar / Scrubber */}
                    <div 
                      onClick={handleSeek}
                      className="w-full h-2 bg-white/20 rounded-full mb-3 cursor-pointer overflow-hidden relative group/scrub"
                      title="Click or tap to seek"
                    >
                      <div 
                        className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan transition-all duration-100"
                        style={{ width: `${showcaseProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={toggleShowcasePlay}
                        className="glass-pill !py-1.5 !px-3 !text-[11px] text-white flex items-center gap-1.5 hover:bg-white/20 transition-all font-semibold"
                      >
                        {showcasePlaying ? "Pause" : "Play"}
                      </button>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={toggleShowcaseMute}
                          className={`glass-pill !py-1.5 !px-3 !text-[11px] flex items-center gap-1.5 transition-all font-semibold ${!showcaseMuted ? 'text-accent-cyan border-accent-cyan/40 !bg-accent-cyan/15' : 'text-white/90'}`}
                          title={showcaseMuted ? "Click to enable sound" : "Sound enabled"}
                        >
                          {!showcaseMuted ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                              <span>Sound ON</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5 text-accent-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
                              <span>Sound</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleFullscreen}
                          className="glass-pill !p-1.5 hover:text-white"
                          title="Fullscreen"
                          aria-label="Toggle Fullscreen"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Video Metadata & Information */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="glass-pill !text-[10px] sm:text-xs !py-1 !px-3 font-bold text-accent-blue border-accent-blue/30 !bg-accent-blue/10">
                    ★ Featured Video Production
                  </span>
                  <span className="glass-pill !text-[10px] sm:text-xs !py-1 !px-3 text-slate-300 font-medium">
                    AIC-BIMTECH Incubation
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 leading-tight">
                    Startup Ecosystem <br className="hidden md:block"/>
                    <span className="text-gradient-accent">Promotional Campaign Reel</span>
                  </h3>
                  <p className="text-sm md:text-base text-slate-200 font-normal leading-relaxed">
                    Directed and edited dynamic promotional campaign reel for Atal Incubation Centre (AIC-BIMTECH). Designed for high-retention short-form digital consumption with rapid narrative transitions, audio-driven beat cuts, and real startup ecosystem storytelling.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                  <div className="glass-panel p-3.5 sm:p-4 rounded-2xl">
                    <p className="text-[10px] text-accent-cyan uppercase tracking-widest font-bold mb-1">Format</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">9:16 Vertical Reel</p>
                  </div>
                  <div className="glass-panel p-3.5 sm:p-4 rounded-2xl">
                    <p className="text-[10px] text-accent-purple uppercase tracking-widest font-bold mb-1">Duration</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">01:10 Full Cut</p>
                  </div>
                  <div className="glass-panel p-3.5 sm:p-4 rounded-2xl col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-accent-green uppercase tracking-widest font-bold mb-1">Performance</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Instant HD Stream</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-300 font-bold mb-3">Core Skills & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {["Video Editing", "Creative Direction", "Motion Pacing", "Audio Sync", "Social Media Strategy", "Reels & Shorts"].map(tag => (
                      <span key={tag} className="glass-pill !text-[11px] !py-1 !px-3 text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={toggleShowcaseMute}
                    className="glass-pill !py-3 !px-6 text-xs font-bold text-white hover:bg-white/10 flex items-center justify-center gap-2 border-accent-cyan/40 shadow-glow"
                  >
                    {showcaseMuted ? "🔊 Play with Sound" : "🔇 Mute Audio"}
                  </button>
                  <button
                    onClick={() => setSelectedItem(portfolioItems.find(i => i.id === 4) || null)}
                    className="glass-pill !py-3 !px-6 text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2"
                  >
                    <span>Open Full Cinema Modal ↗</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`glass-pill !cursor-pointer !py-1.5 !px-3.5 !text-[11px] font-semibold transition-all ${
                  activeFilter === f 
                    ? '!bg-white/20 !text-white !border-white/40 shadow-glow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
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
                    transition={{ duration: 0.4 }}
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-3xl overflow-hidden glass-panel cursor-pointer break-inside-avoid p-2 sm:p-2.5 hover:border-white/25 transition-all duration-300"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 aspect-auto">
                      {item.isVideo ? (
                        <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden">
                          <video 
                            src={item.img} 
                            poster={item.poster || "/work/POSTERS/video%20editing/ayush-reel-poster.jpg"} 
                            preload="auto" 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" 
                            onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); }} 
                            onMouseLeave={(e) => e.currentTarget.pause()} 
                          />
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <span className="glass-pill !py-1 !px-2.5 !text-[9px] !bg-black/60 font-bold text-accent-cyan border-accent-cyan/40">
                              ▶ VIDEO REEL (01:10)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          loading="lazy" 
                          decoding="async" 
                          className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" 
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 pointer-events-none">
                        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-[10px] font-bold text-accent-cyan tracking-[0.2em] uppercase mb-1.5">{item.type}</p>
                          <h3 className="text-base font-heading font-bold mb-3 text-white leading-tight">{item.title}</h3>
                          <span className="glass-pill !py-1.5 !px-3.5 !text-[10px] text-white pointer-events-auto">
                            View Work ↗
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Always visible label strip for clean mobile readability */}
                    <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider truncate">{item.type}</p>
                        <h4 className="text-sm font-heading font-bold text-foreground truncate">{item.title}</h4>
                      </div>
                      <span className="glass-pill !py-1 !px-2.5 !text-[9px] text-slate-300 flex-shrink-0 group-hover:text-white">
                        Expand
                      </span>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Modal / Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-2xl"
              onClick={() => setSelectedItem(null)}
            >
              <button 
                className="absolute top-4 right-4 sm:top-6 sm:right-6 glass-pill !p-2.5 sm:!p-3 text-white hover:bg-white/20 z-30" 
                onClick={() => setSelectedItem(null)} 
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl max-h-[92vh] glass-panel rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-white/15"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full md:w-[60%] bg-slate-950/60 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-[40vh] max-h-[55vh] md:max-h-none md:h-[80vh] relative">
                  {selectedItem.isVideo ? (
                    <video 
                      src={selectedItem.img} 
                      poster={selectedItem.poster || "/work/POSTERS/video%20editing/ayush-reel-poster.jpg"} 
                      preload="auto" 
                      controls 
                      autoPlay 
                      playsInline 
                      className="max-h-full aspect-[9/16] object-contain rounded-2xl shadow-2xl relative z-10 border border-white/10" 
                    />
                  ) : (
                    <img 
                      src={selectedItem.img} 
                      alt={selectedItem.title} 
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl relative z-10" 
                    />
                  )}
                </div>
                <div className="w-full md:w-[40%] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-white/[0.04] to-transparent">
                  <div>
                    <p className="text-[10px] font-bold text-accent-cyan tracking-[0.2em] uppercase mb-2">{selectedItem.category}</p>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2 text-foreground leading-tight">{selectedItem.title}</h3>
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.1em] mb-6">{selectedItem.type}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Overview</h4>
                        <p className="text-slate-200 text-sm leading-relaxed font-normal">Strategic creative asset designed to maximize engagement and communicate core messaging effectively to the target audience.</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Execution</h4>
                        <p className="text-slate-200 text-sm leading-relaxed font-normal">Concept development, visual design, and format optimization for digital distribution.</p>
                      </div>
                    </div>
                  </div>

                  {selectedItem.link && (
                    <div className="pt-6">
                      <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-pill !py-3 !px-6 text-accent-cyan hover:text-white flex items-center justify-center gap-2 text-xs font-bold border-accent-cyan/40 hover:bg-accent-cyan/15 transition-all shadow-glow w-full"
                      >
                        <span>Open Instagram Profile ↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACHIEVEMENTS & LEADERSHIP */}
        <motion.section 
          id="achievements"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 scroll-mt-24"
        >
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-xs text-accent-purple tracking-[0.2em] uppercase mb-8 flex items-center gap-3 sm:gap-4 font-bold relative z-10">
              <span className="w-8 h-px bg-accent-purple/50"></span> Leadership
            </h2>
            <div className="space-y-8 relative z-10">
              <div className="group">
                <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-purple transition-colors">TATVA — The IT Club, BIMTECH</h3>
                <p className="text-slate-300 mb-2 mt-1 tracking-widest uppercase text-[10px] font-bold">Executive Member</p>
                <p className="text-slate-200 text-sm leading-relaxed font-normal">Led social media content creation and management for the club, driving visibility, engagement, and audience growth across platforms.</p>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-purple transition-colors">E-Cell, BIMTECH</h3>
                  <a 
                    href="https://www.instagram.com/ecell_bimtech/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glass-pill !text-[10px] !py-1 !px-2.5 text-accent-purple hover:text-white flex items-center gap-1 transition-all"
                  >
                    <span>@ecell_bimtech ↗</span>
                  </a>
                </div>
                <p className="text-slate-300 mb-2 mt-1 tracking-widest uppercase text-[10px] font-bold">Executive Member | Social Media & Creativity</p>
                <p className="text-slate-200 text-sm leading-relaxed font-normal">Handled social media management and event organization for E-Cell activities, coordinated promotions, and contributed actively as part of the Creativity Team.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-8 flex items-center gap-3 sm:gap-4 font-bold relative z-10">
              <span className="w-8 h-px bg-accent-blue/50"></span> Achievements
            </h2>
            <ul className="space-y-6 sm:space-y-8 relative z-10">
              <li className="flex gap-4 sm:gap-6 items-start group">
                <div className="text-xl font-heading font-bold text-accent-blue/60 group-hover:text-accent-blue transition-colors">01</div>
                <div>
                  <h4 className="text-base font-bold mb-1 text-foreground">Semi-Finalist</h4>
                  <p className="text-sm text-slate-200 font-normal leading-relaxed">2 Case Competitions — Prodman and Marketer, Thrive MBA (Corporate).</p>
                </div>
              </li>
              <li className="flex gap-4 sm:gap-6 items-start group">
                <div className="text-xl font-heading font-bold text-accent-blue/60 group-hover:text-accent-blue transition-colors">02</div>
                <div>
                  <h4 className="text-base font-bold mb-1 text-foreground">Top 10 Position</h4>
                  <p className="text-sm text-slate-200 font-normal leading-relaxed">Re-Skill Innovathon, BIMTECH, for developing an innovative application concept.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* SKILLS & ARSENAL */}
        <motion.section 
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24"
        >
          <h2 className="text-xs text-slate-300 tracking-[0.2em] uppercase mb-8 sm:mb-10 flex items-center gap-3 sm:gap-4 font-bold">
            <span className="w-8 h-px bg-white/20"></span> Skills & Arsenal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Sales & Dev", items: ["Sales & Business Dev", "Lead Generation", "Cold Calling & Emailing", "Customer Relationship", "Negotiation", "Sales Analytics"] },
              { title: "Marketing", items: ["Digital Marketing", "Market Research", "Consumer Behaviour", "Omnichannel", "SEO / SEM", "Google & Meta Ads"] },
              { title: "Creative", items: ["Poster Design", "Content Creation", "Video Editing", "Social Media Content", "Canva"] },
              { title: "Tools", items: ["MS Excel & PPT", "Google Analytics", "Google Ads", "Meta Ads", "Canva"] }
            ].map((group, idx) => (
              <div key={idx} className="glass-panel rounded-3xl p-6 sm:p-8 group">
                <h4 className="text-base font-heading font-bold mb-4 pb-3 border-b border-white/10 text-foreground">{group.title}</h4>
                <ul className="space-y-3 sm:space-y-4">
                  {group.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                      <span className="w-1.5 h-1.5 bg-accent-cyan/60 rounded-full group-hover:bg-accent-cyan transition-colors shadow-glow"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-20 sm:py-28 md:py-36 mt-12 sm:mt-20 relative scroll-mt-24"
        >
          <div className="ambient-glow ambient-blue w-full h-[500px] max-w-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"></div>
          
          <div className="relative z-10 glass-panel p-8 sm:p-14 md:p-20 rounded-3xl sm:rounded-[3rem] border-white/10 mx-auto max-w-5xl">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading heading-tight font-bold mb-4 sm:mb-6 text-foreground">
              Let&apos;s create something <br/><span className="text-gradient-accent">extraordinary.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto mb-10 sm:mb-14 leading-relaxed font-normal">
              Open to opportunities and conversations around digital marketing, sales strategy, business development, and creative content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-14">
              <a 
                href="mailto:ayush.lal28@bimtech.ac.in" 
                className="glass-pill !py-3 !px-5 hover:bg-white/10 flex items-center gap-2.5 justify-center text-xs sm:text-sm text-slate-100 font-medium focus-visible:outline-accent-blue transition-all"
              >
                <svg className="w-4 h-4 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                ayush.lal28@bimtech.ac.in
              </a>
              <a 
                href="tel:+919798855854" 
                className="glass-pill !py-3 !px-5 hover:bg-white/10 flex items-center gap-2.5 justify-center text-xs sm:text-sm text-slate-100 font-medium focus-visible:outline-accent-blue transition-all"
              >
                <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 97988 55854
              </a>
              <a 
                href="https://www.linkedin.com/in/ayush-lal-362646267/" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-pill !py-3 !px-5 hover:bg-white/10 flex items-center gap-2.5 justify-center text-xs sm:text-sm text-slate-100 font-medium focus-visible:outline-accent-blue transition-all"
              >
                <svg className="w-4 h-4 text-accent-purple" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </div>
            
            <a 
              href="mailto:ayush.lal28@bimtech.ac.in" 
              className="group relative inline-flex px-8 sm:px-10 py-3.5 sm:py-4 rounded-full overflow-hidden text-xs font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 shadow-glow focus-visible:outline-accent-blue"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan rounded-full opacity-90" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10 flex items-center gap-2.5">
                Send a message
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m13 7 5 5m0 0-5 5m5-5H6" /></svg>
              </span>
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
