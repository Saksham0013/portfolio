import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, ShoppingBag, ArrowUpRight, Zap } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import SectionLabel from '../components/SectionLabel';
import projects from '../data/projects';
import { useScrollInView } from '../hooks/useInView';

export default function FeaturedProject() {
  const featured = projects[0]; // Zyppy
  const [ref, inView] = useScrollInView({ amount: 0.2 });
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.025);
    setRotateY(x * 0.025);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="featured" className="section relative overflow-hidden" ref={ref}>
      {/* BACKGROUND GLOW */}
      <div className="featured-glow" />

      <div className="container relative z-10">
        <SectionLabel number="03" text="FEATURED SPOTLIGHT" />

        <div className="mb-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Signature Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Featured <span className="text-gradient-cyan">Masterpiece</span>
          </h2>
        </div>

        {/* 3D PERSPECTIVE WRAPPER */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="featured-glass-container rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: PROJECT METADATA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center">
                  <ShoppingBag size={18} />
                </span>
                <div>
                  <span className="text-xs font-mono text-red-400 tracking-wider uppercase block">
                    Quick-Commerce MERN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {featured.title} — 10-Min Delivery
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {featured.description}
              </p>

              {/* HIGHLIGHTED CAPABILITIES */}
              <div className="space-y-2.5">
                {[
                  'Real-time inventory search & dynamic category filters',
                  'Instant cart computation & persistent order state',
                  'REST API backend with MongoDB aggregation queries',
                  'Ultra-responsive mobile-first design with smooth micro-interactions'
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Zap size={14} className="text-cyan-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* TECH CHIPS (SPACED) */}
              <div className="flex flex-wrap gap-3 pt-3">
                {featured.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-slate-900/90 text-cyan-300 border border-cyan-500/25 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAS */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-primary flex items-center gap-2"
                >
                  <span>Live Platform Demo</span>
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-secondary flex items-center gap-2"
                >
                  <GithubIcon size={16} />
                  <span>Inspect Source Code</span>
                </a>
              </div>
            </div>

            {/* RIGHT: BROWSER MOCKUP DISPLAY */}
            <div className="lg:col-span-6">
              <div className="browser-mockup rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl">
                {/* Browser Header Bar */}
                <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="bg-slate-950/80 px-3 py-1 rounded-md text-[11px] font-mono text-slate-400 border border-slate-800/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    https://zyppy.vercel.app/
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">LIVE</div>
                </div>

                {/* Browser Content Area */}
                <div className="relative aspect-[16/10] bg-slate-900 flex items-center justify-center overflow-hidden group">
                  <img
                    src={featured.image}
                    alt="Zyppy quick-commerce project preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Graphic */}
                  <div
                    className="absolute inset-0 hidden flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-900"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-4 text-red-400">
                      <ShoppingBag size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Zyppy 10-Min Delivery</h4>
                    <p className="text-xs text-slate-400 max-w-xs mb-4">
                      Full-Stack Quick-Commerce Platform on the MERN Ecosystem.
                    </p>
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 underline font-mono"
                    >
                      Visit https://zyppy.vercel.app/ &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
