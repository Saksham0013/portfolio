import React from 'react';

// 3D Ambient Background
import BackgroundCanvas from './components/3d/BackgroundCanvas';

// Navigation & Sections
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import FeaturedProject from './sections/FeaturedProject';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#05070E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* AMBIENT 3D BACKGROUND PARTICLES & GEOMETRY */}
      <BackgroundCanvas />

      {/* STICKY GLASSMORPHISM NAVIGATION */}
      <Navbar />

      {/* MAIN SECTIONS */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
