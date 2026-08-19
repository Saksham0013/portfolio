import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Smartphone, Layers, Zap, Award, Box, Palette, Cpu, CheckCircle } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { achievements, highlightsList } from '../data/achievements';
import { useScrollInView } from '../hooks/useInView';

const ICON_MAP = {
  Rocket,
  Smartphone,
  Layers,
  Zap,
  Box,
  Palette,
  Cpu
};

export default function Achievements() {
  const [ref, inView] = useScrollInView({ amount: 0.15 });

  return (
    <section id="achievements" className="section relative overflow-hidden" ref={ref}>
      {/* AMBIENT GLOW */}
      <div className="section-glow-left" />

      <div className="container relative z-10">
        <SectionLabel number="06" text="METRICS & STRENGTHS" />

        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Key Metrics & <span className="text-gradient-cyan">Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
            Quantified delivery standards, code quality benchmarks, and core technical proficiencies.
          </p>
        </div>

        {/* METRICS COUNTER CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {achievements.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Award;
            return (
              <motion.div
                key={i}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-white block mb-1">
                    {item.number}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1.5">{item.label}</h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {highlightsList.map((hl, i) => {
            const HighlightIcon = ICON_MAP[hl.icon] || Layers;
            return (
              <motion.div
                key={i}
                className="glass-card p-6 rounded-2xl border border-slate-800/80 flex items-start gap-4 hover:border-purple-500/30 transition-colors"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 mt-1">
                  <HighlightIcon size={16} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-white">{hl.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      {hl.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
