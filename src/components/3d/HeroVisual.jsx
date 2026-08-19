import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroVisual() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.02);
    setRotateY(x * 0.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* AMBIENT BACKDROP GLOWS */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none -top-10 -right-10 animate-pulse" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-500/20 blur-[130px] pointer-events-none -bottom-10 -left-10" />

      {/* 3D TILT & FLOATING CONTAINER */}
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        animate={{
          y: [-8, 8, -8]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative w-full max-w-[850px] flex items-center justify-center"
      >
        {/* MAIN 3D SHOWCASE ARTWORK */}
        <img
          src="/images/hero-showcase.jpg"
          alt="Saksham Agrahari 3D MERN Developer Workstation"
          className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,240,255,0.25)] pointer-events-none"
          loading="eager"
        />

        {/* INTERACTIVE AMBIENT OVERLAY PARTICLES / RINGS */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 mix-blend-screen" />
      </motion.div>
    </div>
  );
}
