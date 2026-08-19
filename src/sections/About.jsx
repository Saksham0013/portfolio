import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Layers, Flame, CheckCircle2 } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const STATS = [
  { value: '3+', label: 'Shipped MERN Apps', icon: Layers, color: '#00F0FF' },
  { value: '10+', label: 'Modern Technologies', icon: Cpu, color: '#A855F7' },
  { value: '100%', label: 'Responsive Design', icon: Globe, color: '#22C55E' },
  { value: '24/7', label: 'Continuous Learning', icon: Flame, color: '#F97316' },
];

export default function About() {
  const [ref, inView] = useScrollInView({ amount: 0.2 });

  return (
    <section id="about" className="section relative overflow-hidden" ref={ref}>
      {/* BACKGROUND ACCENT GLOW */}
      <div className="section-glow-left" />

      <div className="container relative z-10">
        <SectionLabel number="01" text="ABOUT SAKSHAM" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: TEXT & STORY */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
              Turning Ideas Into <span className="text-gradient-cyan">Digital Experiences</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              Hello! I'm <strong className="text-white font-medium">Saksham Agrahari</strong>, a passionate{' '}
              <span className="text-cyan-400 font-medium">MERN Stack Developer</span> specializing in creating modern,
              high-performance web applications that merge intuitive UI engineering with solid backend architectures.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              I approach every project with a dual focus: ensuring engineering robustness (clean code, scalable REST APIs,
              and efficient database structures) while delivering sleek, responsive, and animated user experiences that engage
              and convert.
            </p>

            {/* KEY PRINCIPLES BULLETS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Full-Stack MERN Architecture',
                'Component-Driven Design Systems',
                'Modern 3D & Micro-Animations',
                'RESTful APIs & Database Optimization',
                'Pixel-Perfect Responsive Layouts',
                'Fast Edge Deployment & CI/CD'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: STATS & VISUAL CARD */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STATS.map(({ value, label, icon: Icon, color }, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-colors group"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white block mb-1">
                      {value}
                    </span>
                    <span className="text-xs text-slate-400 font-medium leading-tight block">
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ARCHITECTURE PREVIEW PILL */}
            <div className="glass-card p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/20">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  MERN Pipeline Status
                </span>
                <span>Production Ready</span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Frontend: React + Tailwind + Motion <br />
                Backend: Node.js + Express.js + REST <br />
                Database: MongoDB Atlas Cloud
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
