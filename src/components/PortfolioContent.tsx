"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const portfolioItems = [
  { id: 4, title: "Promotional Reel", category: "AIC BIMTECH", type: "Video Editing", img: "/work/POSTERS/video editing/ayush-new-video.mp4", isVideo: true },
  { id: 7, title: "Ganesh Chaturthi Post", category: "AIC BIMTECH", type: "LinkedIn Graphic", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post).png" },
  { id: 8, title: "AIC Engagement Post 1", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (2).png" },
  { id: 9, title: "AIC Engagement Post 2", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (3).png" },
  { id: 10, title: "AIC Engagement Post 3", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (4).png" },
  { id: 11, title: "AIC Engagement Post 4", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (5).png" },
  { id: 12, title: "AIC Engagement Post 5", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (6).png" },
  { id: 13, title: "AIC Engagement Post 6", category: "AIC BIMTECH", type: "Social Media Creative", img: "/work/POSTERS/ATAL INCUBATION CENTRE/Ganesh (LinkedIn Post) (7).png" },
];

const filters = ["ALL", "MARKETING", "SALES", "POSTERS", "SOCIAL MEDIA", "AIC BIMTECH", "E-CELL", "VIDEO", "INTERNSHIP"];

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
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
    <div className="relative bg-transparent pt-12 pb-32">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan origin-left z-50 shadow-glow"
        style={{ scaleX }}
      />

      {/* Floating Glass Navigation */}
      <nav className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 glass-nav rounded-full px-2 py-2 flex items-center gap-1 overflow-x-auto max-w-[90vw] md:max-w-none no-scrollbar shadow-2xl border border-white/10">
        {["about", "experience", "work", "projects", "achievements", "contact"].map((navItem) => (
          <a 
            key={navItem} 
            href={`#${navItem}`} 
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-muted hover:text-foreground hover:bg-white/10 transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            {navItem}
          </a>
        ))}
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 space-y-24 md:space-y-48 mt-16 md:mt-32">
        
        {/* ABOUT ME */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative"
        >
          <div className="ambient-glow ambient-blue w-[400px] h-[400px] -top-20 -left-20"></div>
          
          <div className="lg:col-span-8 relative z-10">
            <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-8 flex items-center gap-4 font-bold">
              <span className="w-8 h-px bg-accent-blue/50"></span> Profile
            </h2>
            <h3 className="font-heading heading-tight text-3xl md:text-5xl font-medium leading-[1.2] mb-8 text-foreground">
              I am <span className="font-bold text-gradient">Ayush Lal</span>, a PGDM student at BIMTECH specializing in <span className="text-gradient-accent">digital marketing and sales strategy.</span> I bridge the gap between creative content and data-driven lead generation to drive real business growth.
            </h3>
            <p className="text-lg text-muted leading-relaxed max-w-2xl font-light">
              My experience spans campaign execution, customer acquisition, market research, content creation and business development. I enjoy working at the intersection of Marketing, Sales, Creativity, Consumer Behaviour, and Digital Growth.
            </p>
          </div>
          
          <div className="lg:col-span-4 glass-panel p-8 rounded-3xl relative z-10">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted mb-8">Education</h4>
            <div className="space-y-8">
              <div className="group">
                <h5 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-cyan transition-colors">PGDM</h5>
                <p className="text-muted text-sm mt-1">BIMTECH</p>
                <p className="text-accent-cyan/60 text-xs mt-2 uppercase tracking-widest font-semibold">2026–2028 | Pursuing</p>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="group">
                <h5 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-cyan transition-colors">B.Sc.</h5>
                <p className="text-muted text-sm mt-1">A.N. College</p>
                <p className="text-accent-cyan/60 text-xs mt-2 uppercase tracking-widest font-semibold">2021–2024 | 65%</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* HOW I APPROACH MARKETING */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs text-accent-purple tracking-[0.2em] uppercase mb-12 flex items-center justify-center gap-4 font-bold">
            <span className="w-8 h-px bg-accent-purple/50"></span> Methodology <span className="w-8 h-px bg-accent-purple/50"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="ambient-glow ambient-purple w-[600px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            
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
                className="glass-panel rounded-3xl p-8 group flex flex-col relative z-10"
              >
                <div className="text-4xl font-heading font-bold text-muted/20 mb-6 group-hover:text-accent-purple transition-colors">{step.num}</div>
                <h3 className="text-xl font-heading font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{step.desc}</p>
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
          className="relative"
        >
          <div className="ambient-glow ambient-cyan w-[500px] h-[500px] top-0 right-0"></div>
          <h2 className="text-xs text-accent-cyan tracking-[0.2em] uppercase mb-12 flex items-center gap-4 font-bold relative z-10">
            <span className="w-8 h-px bg-accent-cyan/50"></span> Experience
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            <div className="lg:col-span-4 border-l border-accent-cyan/30 pl-8 relative">
              <div className="absolute -left-1 top-2 w-2 h-2 rounded-full bg-accent-cyan shadow-glow"></div>
              <h3 className="text-3xl font-heading font-bold mb-3 text-foreground">3K Aryan Infotech</h3>
              <p className="text-lg text-accent-cyan mb-4 font-medium">Digital Marketing Intern</p>
              <p className="text-muted tracking-[0.15em] uppercase text-xs font-bold glass-pill !py-1.5 !px-4">Jan — Jun 2026</p>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
              <p className="text-lg text-muted leading-relaxed font-light">
                Managed end-to-end lead generation and customer relationship activities through cold calling, cold emailing and market research, using sales analytics and negotiation to support lead conversion and business development.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-white/10">
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
                  <div className="text-3xl font-heading font-bold text-accent-blue mb-2">3k+</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold leading-tight">Qualified Leads</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
                  <div className="text-3xl font-heading font-bold text-accent-cyan mb-2">16%</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold leading-tight">Conversion</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
                  <div className="text-3xl font-heading font-bold text-accent-green mb-2">10%</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold leading-tight">Revenue Lift</div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
                  <div className="text-3xl font-heading font-bold text-accent-purple mb-2">2</div>
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold leading-tight">Enterprise Clients</div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-5">Sales Process Pipeline</h4>
                <div className="flex flex-wrap gap-2 items-center">
                  {["Research", "Identify", "Outreach", "Qualify", "Nurture"].map((step, idx) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="glass-pill !text-[10px]">{step}</span>
                      <span className="text-white/20 text-xs">→</span>
                    </div>
                  ))}
                  <span className="glass-pill !text-[10px] !bg-accent-blue/20 !border-accent-blue/40 !text-white shadow-glow">Convert</span>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-5">Core Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["Meta Ads", "Google Ads", "SEO", "SEM", "Email Campaigns", "Lead Gen", "Cold Calling", "CRM", "Sales Analytics", "Negotiation"].map(skill => (
                    <span key={skill} className="glass-pill !px-3 !py-1.5 !text-[10px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs text-accent-green tracking-[0.2em] uppercase mb-12 flex items-center gap-4 font-bold">
            <span className="w-8 h-px bg-accent-green/50"></span> Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl p-10 flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-green/10 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">Digimark Globals</h3>
                <p className="text-[10px] text-accent-green font-bold uppercase tracking-[0.15em] mb-6">Marketing Project | Jul – Aug 2026</p>
                <p className="text-sm text-muted leading-relaxed font-light">
                  Improved brand visibility and audience engagement by analysing Instagram reach and engagement metrics to identify content opportunities and optimize promotional campaigns through reels, posters and digital content.
                </p>
              </div>
            </div>
            
            <div className="glass-panel rounded-3xl p-10 flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-blue/10 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">Omnichannel Strategy</h3>
                <p className="text-[10px] text-accent-blue font-bold uppercase tracking-[0.15em] mb-6">Lululemon | Forage | Dec 25 – Jan 26</p>
                <p className="text-sm text-muted leading-relaxed font-light">
                  Developed an integrated omnichannel strategy for Lululemon MIRROR by analysing customer journeys, leveraging digital transformation and hyperlocal insights to identify engagement opportunities and drive product adoption.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CREATIVE PORTFOLIO */}
        <motion.section 
          id="work"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-10 flex items-center gap-4 font-bold">
            <span className="w-8 h-px bg-accent-blue/50"></span> Creative Execution
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`glass-pill !cursor-pointer ${activeFilter === f ? '!bg-white/10 !text-foreground !border-white/30 shadow-glow' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {portfolioItems.filter(item => activeFilter === "ALL" || item.category === activeFilter || (activeFilter === 'VIDEO' && item.isVideo)).map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-3xl overflow-hidden glass-panel cursor-pointer break-inside-avoid p-2"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-auto">
                    {item.isVideo ? (
                      <video src={item.img} preload="metadata" className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity duration-700" muted loop playsInline onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
                    ) : item.img.endsWith('.pdf') ? (
                      <div className="w-full aspect-[3/4] flex items-center justify-center">
                         <span className="glass-pill !text-[10px]">PDF Document</span>
                      </div>
                    ) : (
                      <img src={item.img} alt={item.title} className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[9px] font-bold text-accent-cyan tracking-[0.2em] uppercase mb-2">{item.type}</p>
                        <h3 className="text-lg font-heading font-bold mb-4 text-white leading-tight">{item.title}</h3>
                        <span className="glass-pill !py-2 !px-4 !text-[10px] pointer-events-auto">
                          View Work
                        </span>
                      </div>
                    </div>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-3xl"
              onClick={() => setSelectedItem(null)}
            >
              <button className="absolute top-8 right-8 glass-pill !p-3 hover:text-white" onClick={() => setSelectedItem(null)} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 10, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl max-h-[90vh] glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_32px_80px_rgba(0,0,0,0.8)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full md:w-[65%] bg-black/40 flex items-center justify-center p-4 md:p-8 h-[40vh] md:h-[80vh] relative">
                  <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none"></div>
                  {selectedItem.isVideo ? (
                    <video src={selectedItem.img} preload="metadata" controls autoPlay className="max-w-full max-h-full rounded-2xl shadow-2xl relative z-10" />
                  ) : selectedItem.img.endsWith('.pdf') ? (
                    <embed src={selectedItem.img} type="application/pdf" className="w-full h-full rounded-2xl relative z-10" />
                  ) : (
                    <img src={selectedItem.img} alt={selectedItem.title} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl relative z-10" />
                  )}
                </div>
                <div className="w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-center overflow-y-auto bg-gradient-to-b from-white/[0.03] to-transparent">
                  <p className="text-[10px] font-bold text-accent-cyan tracking-[0.2em] uppercase mb-4">{selectedItem.category}</p>
                  <h3 className="text-3xl font-heading font-bold mb-3 text-foreground leading-tight">{selectedItem.title}</h3>
                  <p className="text-xs font-semibold text-muted uppercase tracking-[0.1em] mb-10">{selectedItem.type}</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Overview</h4>
                      <p className="text-muted text-sm leading-relaxed font-light">Strategic creative asset designed to maximize engagement and communicate core messaging effectively to the target audience.</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Execution</h4>
                      <p className="text-muted text-sm leading-relaxed font-light">Concept development, visual design, and format optimization for digital distribution.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACHIEVEMENTS */}
        <motion.section 
          id="achievements"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="glass-panel p-10 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-xs text-accent-purple tracking-[0.2em] uppercase mb-10 flex items-center gap-4 font-bold relative z-10">
              <span className="w-8 h-px bg-accent-purple/50"></span> Leadership
            </h2>
            <div className="space-y-10 relative z-10">
              <div className="group">
                <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-purple transition-colors">TATVA — The IT Club, BIMTECH</h3>
                <p className="text-muted mb-3 mt-1 tracking-widest uppercase text-[10px] font-bold">Executive Member</p>
                <p className="text-muted text-sm leading-relaxed font-light">Led social media content creation and management for the club, driving visibility, engagement and audience growth across platforms.</p>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <div className="group">
                <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-accent-purple transition-colors">E-Cell, BIMTECH</h3>
                <p className="text-muted mb-3 mt-1 tracking-widest uppercase text-[10px] font-bold">Executive Member</p>
                <p className="text-muted text-sm leading-relaxed font-light">Handled social media management and event organisation for E-Cell activities, coordinated promotion and contributed as part of the Creativity Team.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-xs text-accent-blue tracking-[0.2em] uppercase mb-10 flex items-center gap-4 font-bold relative z-10">
              <span className="w-8 h-px bg-accent-blue/50"></span> Achievements
            </h2>
            <ul className="space-y-8 relative z-10">
              <li className="flex gap-6 items-start group">
                <div className="text-xl font-heading font-bold text-accent-blue/50 group-hover:text-accent-blue transition-colors">01</div>
                <div>
                  <h4 className="text-base font-bold mb-2 text-foreground">Semi-Finalist</h4>
                  <p className="text-sm text-muted font-light leading-relaxed">2 Case Competitions — Prodman and Marketer, Thrive MBA (Corporate).</p>
                </div>
              </li>
              <li className="flex gap-6 items-start group">
                <div className="text-xl font-heading font-bold text-accent-blue/50 group-hover:text-accent-blue transition-colors">02</div>
                <div>
                  <h4 className="text-base font-bold mb-2 text-foreground">Top 10 Position</h4>
                  <p className="text-sm text-muted font-light leading-relaxed">Re-Skill Innovathon, BIMTECH, for developing an innovative App Development concept.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section 
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs text-muted tracking-[0.2em] uppercase mb-10 flex items-center gap-4 font-bold">
            <span className="w-8 h-px bg-white/20"></span> Skills & Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sales & Dev", items: ["Sales & Business Dev", "Lead Generation", "Cold Calling & Emailing", "Customer Relationship", "Negotiation", "Sales Analytics"] },
              { title: "Marketing", items: ["Digital Marketing", "Market Research", "Consumer Behaviour", "Omnichannel", "SEO / SEM", "Google & Meta Ads"] },
              { title: "Creative", items: ["Poster Design", "Content Creation", "Video Editing", "Social Media Content", "Canva"] },
              { title: "Tools", items: ["MS Excel & PPT", "Google Analytics", "Google Ads", "Meta Ads", "Canva"] }
            ].map((group, idx) => (
              <div key={idx} className="glass-panel rounded-3xl p-8 group">
                <h4 className="text-base font-heading font-bold mb-5 pb-4 border-b border-white/5 text-foreground">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs text-muted font-medium">
                      <span className="w-1.5 h-1.5 bg-accent-cyan/50 rounded-full group-hover:bg-accent-cyan transition-colors shadow-glow"></span>
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
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-32 mt-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] max-w-4xl bg-gradient-to-r from-accent-blue/15 via-accent-purple/10 to-accent-cyan/15 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 glass-panel p-16 md:p-24 rounded-[3rem] border-white/10 mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading heading-tight font-bold mb-6 text-foreground">
              Let's create something <br/><span className="text-gradient-accent">extraordinary.</span>
            </h2>
            <p className="text-base md:text-lg text-muted max-w-xl mx-auto mb-16 leading-relaxed font-light">
              Open to opportunities and conversations around digital marketing, sales, business development and creative content.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
              <a href="mailto:ayush.lal28@bimtech.ac.in" className="glass-pill !py-3 !px-6 hover:bg-white/10 flex items-center gap-3 w-full md:w-auto justify-center focus-visible:outline-accent-blue">
                <svg className="w-4 h-4 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                ayush.lal28@bimtech.ac.in
              </a>
              <a href="tel:9798855854" className="glass-pill !py-3 !px-6 hover:bg-white/10 flex items-center gap-3 w-full md:w-auto justify-center focus-visible:outline-accent-blue">
                <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                9798855854
              </a>
              <a href="https://www.linkedin.com/in/ayush-lal-362646267/" target="_blank" rel="noreferrer" className="glass-pill !py-3 !px-6 hover:bg-white/10 flex items-center gap-3 w-full md:w-auto justify-center focus-visible:outline-accent-blue">
                <svg className="w-4 h-4 text-accent-purple" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </div>
            
            <a href="mailto:ayush.lal28@bimtech.ac.in" className="group relative inline-flex px-10 py-4 rounded-full overflow-hidden text-xs font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 focus-visible:outline-accent-blue">
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan rounded-full opacity-90" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10 flex items-center gap-3">
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
