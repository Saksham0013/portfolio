import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  FileCode,
  Layout,
  Palette,
  Wind,
  Box,
  Server,
  Cpu,
  Database,
  Network,
  GitBranch,
  Globe,
  Cloud,
  Terminal,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import SectionLabel from '../components/SectionLabel';
import { skillCategories } from '../data/skills';
import { useScrollInView } from '../hooks/useInView';

// Icon Map
const ICON_MAP = {
  Atom,
  FileCode,
  Layout,
  Palette,
  Wind,
  Box,
  Server,
  Cpu,
  Database,
  Network,
  GitBranch,
  Github: GithubIcon,
  Globe,
  Cloud,
  Terminal
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useScrollInView({ amount: 0.15 });

  return (
    <section id="skills" className="section relative overflow-hidden" ref={ref}>
      {/* GLOW BACKGROUND */}
      <div className="section-glow-right" />

      <div className="container relative z-10">
        <SectionLabel number="02" text="TECH STACK & SKILLS" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Technologies & <span className="text-gradient-purple">Capabilities</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Interactive overview of the full-stack MERN ecosystem, modern frontend libraries, backend frameworks, and
              developer tools I use daily.
            </p>
          </div>

          {/* CATEGORY SELECTOR TABS */}
          <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-2xl self-start">
            {skillCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === i
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.category.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE CATEGORY BANNER */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-xl font-semibold text-white">
              {skillCategories[activeTab].category}
            </h3>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              — {skillCategories[activeTab].tagline}
            </span>
          </div>
        </motion.div>

        {/* SKILLS INTERACTIVE CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {skillCategories[activeTab].skills.map((skill, i) => {
              const IconComponent = ICON_MAP[skill.icon] || Code2;
              return (
                <motion.div
                  key={skill.name}
                  className="skill-interactive-card group"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start justify-between mb-4">
                    {/* ICON WITH COLOR ACCENT */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        border: `1px solid ${skill.color}35`,
                        boxShadow: `0 0 15px ${skill.color}10`
                      }}
                    >
                      <IconComponent size={22} style={{ color: skill.color }} />
                    </div>

                    {/* PROFICIENCY LEVEL BADGE */}
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-400 border border-slate-800">
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {skill.desc}
                  </p>

                  {/* BOTTOM HOVER GLOW BAR */}
                  <div
                    className="skill-card-glow-bar"
                    style={{ backgroundColor: skill.color }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
