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
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('#home');

  /* ── SCROLL DETECTION ──────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── ACTIVE SECTION TRACKING ───────────────────────── */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── BODY SCROLL LOCK WHEN DRAWER OPEN ─────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── SMOOTH SCROLL WITH NAVBAR OFFSET ──────────────── */
  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const headerEl = document.querySelector('header');
      const navH = headerEl ? headerEl.getBoundingClientRect().height : 74;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          FIXED HEADER
      ═══════════════════════════════════════ */}
      <motion.header
        className={`navbar-header fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : ''
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container navbar-inner">

          {/* ── BRAND ─────────────────────────────────── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="navbar-brand group"
            aria-label="Saksham Agrahari – Home"
          >
            <div className="logo-badge">
              <span className="logo-text">SA</span>
              <div className="logo-glow" />
            </div>
            <div className="navbar-brand-info">
              <span className="navbar-brand-title">Saksham Agrahari</span>
              <span className="navbar-brand-subtitle">MERN Developer</span>
            </div>
          </a>

          {/* ── DESKTOP NAV PILL (≥ 1200px only) ─────── */}
          <nav className="navbar-desktop-nav" aria-label="Main navigation">
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

          {/* ── RIGHT ACTIONS ─────────────────────────── */}
          {/* flex-shrink: 0 — these NEVER shrink; brand shrinks first */}
          <div className="navbar-actions">
            {/* Let's Talk: hidden below 430px → moved to drawer */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-glow-primary navbar-cta-btn"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Hamburger: hidden at ≥ 1200px */}
            <button
              className="mobile-burger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* ═══════════════════════════════════════
          MOBILE / TABLET DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-modal="true"
            role="dialog"
          >
            <div className="mobile-drawer-content">

              {/* Nav links */}
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`mobile-nav-link ${active === href ? 'text-cyan-400' : 'text-slate-300'}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.08 }}
                  >
                    <span className="text-xs text-slate-500 font-mono mr-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* Footer actions */}
              <div className="mobile-drawer-footer">
                {/* Let's Talk always in drawer (primary CTA for mobile) */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="btn-glow-primary flex items-center justify-center gap-2 w-full py-3.5"
                  style={{ borderRadius: '14px' }}
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight size={16} />
                </a>

                {/* Social links */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <a href={profile.github}    target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
                  <a href={profile.linkedin}  target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                  <a href={profile.whatsapp}  target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">WhatsApp</a>
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Instagram</a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
