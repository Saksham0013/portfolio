import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layers, Terminal, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/Icons';
import HeroScene from '../components/3d/HeroScene';
import { profile } from '../data/profile';

export default function Hero() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* BACKGROUND GLOW ACCENTS */}
      <div className="hero-glow-cyan" />
      <div className="hero-glow-purple" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* LEFT COLUMN: INTRO */}
        <motion.div
          className="lg:col-span-5 xl:col-span-5 z-20 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* STATUS LINE (Unboxed line with blinking dot) */}
          <motion.div
            className="flex items-center gap-2.5 mb-5 self-start"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="status-dot" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 font-semibold uppercase">
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
          </motion.div>

          {/* MAIN HEADLINE WITH RADIANT MODERN GRADIENT */}
          <div className="space-y-1 mb-4">
            <motion.h1
              className="hero-main-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <span className="hero-name-gradient">SAKSHAM AGRAHARI</span>
            </motion.h1>

            <motion.h2
              className="hero-role-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              MERN STACK DEVELOPER
            </motion.h2>
          </div>

          {/* TAGLINE */}
          <motion.p
            className="hero-tagline max-w-xl text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            "I build fast, scalable & interactive web experiences."
          </motion.p>

          {/* CTAS */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="btn-glow-primary flex items-center gap-2 group cursor-pointer"
            >
              <span>View My Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="btn-glow-secondary flex items-center gap-2 cursor-pointer"
            >
              <span>Let's Work Together</span>
            </button>
          </motion.div>

          {/* SOCIAL & QUICK STATS BAR */}
          <motion.div
            className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Connect:</span>
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box"
                aria-label="WhatsApp Message"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-box"
                aria-label="Instagram Profile"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D INTERACTIVE FLOATING LAPTOP SCENE */}
        <motion.div
          className="lg:col-span-7 xl:col-span-7 relative h-[560px] sm:h-[680px] lg:h-[800px] xl:h-[860px] flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full h-full relative">
            <HeroScene />
            {/* Subtle Interactive Hint Badge */}
            <div className="absolute bottom-2 right-2 glass-badge-3d text-[11px] text-slate-400 font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Interactive 3D Scene</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL DOWN ARROW INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-slate-600 flex justify-center pt-1">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
