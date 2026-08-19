import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isPlaceholder = project.liveUrl === '#' && project.githubUrl === '#';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.03);
    setRotateY(x * 0.03);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className={`project-card-3d rounded-3xl overflow-hidden glass-card border border-slate-800/80 flex flex-col justify-between group ${
        isPlaceholder ? 'opacity-70 border-dashed' : 'hover:border-cyan-500/40'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* CARD IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800/60">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />

        {/* Fallback Graphic Box */}
        <div
          className="absolute inset-0 hidden flex-col items-center justify-center p-6 text-center"
          style={{
            background: `linear-gradient(135deg, rgba(6,11,25,0.95) 0%, ${project.color || '#00F0FF'}25 100%)`
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: `${project.color || '#00F0FF'}20`, border: `1px solid ${project.color || '#00F0FF'}40` }}
          >
            <Layers size={22} style={{ color: project.color || '#00F0FF' }} />
          </div>
          <span className="text-base font-bold text-white mb-1">{project.title}</span>
          <span className="text-xs text-slate-400 font-mono">Interactive Web Application</span>
        </div>

        {/* ID BADGE */}
        <div className="absolute top-4 left-4 glass-badge-3d text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-lg">
          PROJ_{project.id}
        </div>

        {/* TOP RIGHT GLOW ACCENT */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: project.color || '#00F0FF' }}
        />
      </div>

      {/* CARD CONTENT BODY */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light project-card-desc">
            {project.description}
          </p>

          {/* TECH BADGES (SPACED) */}
          <div className="tech-badges-container pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-4 border-t border-slate-800/80 project-card-actions">
          {!isPlaceholder ? (
            <>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-primary text-xs py-2 px-4 flex items-center gap-1.5 flex-1 justify-center"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={14} />
                </a>
              )}

              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
              )}
            </>
          ) : (
            <span className="text-xs font-mono text-slate-500 py-2 block w-full text-center border border-slate-800/60 rounded-xl">
              Under Active Development
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
