import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';
import { useScrollInView } from '../hooks/useInView';

export default function Projects() {
  const [ref, inView] = useScrollInView({ amount: 0.1 });

  return (
    <section id="projects" className="section relative overflow-hidden" ref={ref}>
      {/* GLOW DECORATION */}
      <div className="section-glow-left" />

      <div className="container relative z-10">
        <SectionLabel number="04" text="ALL PROJECTS" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Selected <span className="text-gradient-cyan">Creations</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Explore recent client work, full-stack web applications, and interactive digital experiences.
            </p>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
