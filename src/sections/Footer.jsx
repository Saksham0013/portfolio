import React from 'react';
import { ArrowUp, MessageSquare, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/Icons';
import { profile } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container relative border-t border-slate-800/80 bg-slate-950/80 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* IDENTITY */}
          <div className="footer-brand">
            <div className="logo-badge">
              <span className="logo-text">SA</span>
            </div>
            <div className="footer-brand-text">
              <h3 className="footer-brand-name">
                Saksham Agrahari
              </h3>
              <p className="footer-brand-role">
                MERN Stack Developer &bull; Creative Web Engineer
              </p>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-box"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-box"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-box"
              aria-label="WhatsApp"
            >
              <MessageSquare size={16} />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-box"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>

            {/* SCROLL TO TOP */}
            <button
              onClick={scrollToTop}
              className="social-icon-box text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 cursor-pointer ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* BOTTOM METADATA ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Saksham Agrahari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
