import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Featured',   href: '#featured' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActive('#' + e.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled py-3' : 'py-5'
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container flex items-center justify-between">
          {/* LOGO: SA with neon cyan/purple badge */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 group"
            aria-label="Saksham Agrahari - Home"
          >
            <div className="logo-badge">
              <span className="logo-text">SA</span>
              <div className="logo-glow" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                Saksham Agrahari
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase">
                MERN Developer
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 glass-nav-pill px-4 py-1.5 rounded-full" aria-label="Main Navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className={`nav-pill-item ${isActive ? 'active' : ''}`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="nav-active-indicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION: LET'S TALK */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-glow-primary hidden md:inline-flex items-center gap-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </a>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              className="lg:hidden mobile-burger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col justify-between h-full p-8 pt-24">
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`mobile-nav-link ${active === href ? 'text-cyan-400' : 'text-slate-300'}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <span className="text-xs text-slate-500 font-mono mr-3">0{i + 1}</span>
                    {label}
                  </motion.a>
                ))}
              </nav>

              <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-glow-primary text-center justify-center py-3"
                >
                  Contact Saksham
                </a>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">GitHub</a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">LinkedIn</a>
                  <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">WhatsApp</a>
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
