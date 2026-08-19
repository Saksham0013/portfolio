import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { experiences } from '../data/experience';
import { useScrollInView } from '../hooks/useInView';

export default function Experience() {
  const [ref, inView] = useScrollInView({ amount: 0.15 });

  return (
    <section id="experience" className="section relative overflow-hidden" ref={ref}>
      {/* BACKGROUND ACCENT */}
      <div className="section-glow-right" />

      <div className="container relative z-10">
        <SectionLabel number="05" text="CAREER & JOURNEY" />

        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Experience & <span className="text-gradient-purple">Milestones</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
            A chronological timeline of my development evolution, full-stack achievements, and technical contributions.
          </p>
        </div>

        {/* TIMELINE CONTAINER (RESPONSIVE & OVERFLOW SAFE) */}
        <div className="relative pl-4 sm:pl-8 border-l border-slate-800 space-y-12 sm:space-y-16 max-w-4xl mx-auto">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="relative group pb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* TIMELINE GLOWING NODE */}
              <div className="absolute -left-[25px] sm:-left-[39px] top-2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:border-purple-400 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
              </div>

              {/* EXPERIENCE CARD */}
              <div className="glass-card rounded-2xl p-5 sm:p-8 mb-4 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 shadow-lg w-full overflow-hidden break-words">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors break-words">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium mt-1">
                      <span className="text-cyan-400">{exp.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="self-start sm:self-center shrink-0 px-3.5 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30">
                    {exp.period}
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light break-words">
                  {exp.description}
                </p>

                {/* HIGHLIGHTS */}
                {exp.highlights && (
                  <div className="space-y-2.5 mb-6">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="flex-1 break-words">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* TECH STACK CHIPS (SPACED) */}
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
