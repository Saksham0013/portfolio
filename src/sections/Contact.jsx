import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/Icons';
import SectionLabel from '../components/SectionLabel';
import { profile } from '../data/profile';
import { useScrollInView } from '../hooks/useInView';

export default function Contact() {
  const [ref, inView] = useScrollInView({ amount: 0.15 });
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Please enter your name.';
    if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'Please provide a valid email.';
    if (!fields.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`Portfolio Project Inquiry from ${fields.name}`);
    const body = encodeURIComponent(
      `Hello Saksham,\n\n${fields.message}\n\nFrom: ${fields.name}\nEmail: ${fields.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section relative overflow-hidden" ref={ref}>
      {/* 3D GLOW BACKGROUND */}
      <div className="contact-glow-center" />

      <div className="container relative z-10">
        <SectionLabel number="07" text="START A CONVERSATION" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: HEADING & DIRECT CONTACT CHANNELS */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Let's Build Something <span className="text-gradient-cyan">Amazing</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                Have an exciting project idea, freelance opportunity, or full-time role? Let's connect and turn it into
                a reality.
              </p>
            </div>

            {/* DIRECT BUTTONS CARDS (INCREASED GAP) */}
            <div className="flex flex-col gap-4 pt-2">
              {/* EMAIL */}
              <a
                href={`mailto:${profile.email}`}
                className="contact-channel-card group"
              >
                <div className="channel-icon channel-icon-cyan">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Email Directly</span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {profile.email}
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* WHATSAPP */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card group"
              >
                <div className="channel-icon channel-icon-green">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">
                    +91 6390385831
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* SOCIAL BUTTONS ROW */}
              <div className="grid grid-cols-3 gap-3 pt-2 social-buttons-grid">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card group"
                >
                  <LinkedinIcon size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-slate-300 group-hover:text-white">LinkedIn</span>
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card group"
                >
                  <GithubIcon size={16} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-slate-300 group-hover:text-white">GitHub</span>
                </a>

                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-card group"
                >
                  <span className="text-pink-400 group-hover:scale-110 transition-transform">
                    <InstagramIcon size={16} />
                  </span>
                  <span className="text-xs text-slate-300 group-hover:text-white">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-7 sm:p-10 border border-slate-800 relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Send a Direct Message</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 font-light">
                Fill out the form below to initiate an immediate mail dispatch.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Opening Email Client...</h4>
                  <p className="text-xs text-slate-300">
                    Your default email application is launching with your pre-filled inquiry. Talk soon!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-cyan-400 underline pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 uppercase tracking-wider font-medium">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={fields.name}
                      onChange={(e) => setFields({ ...fields, name: e.target.value })}
                      className="form-input-3d"
                    />
                    {errors.name && <span className="text-xs text-red-400 font-mono mt-1.5 block">{errors.name}</span>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 uppercase tracking-wider font-medium">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="alex@company.com"
                      value={fields.email}
                      onChange={(e) => setFields({ ...fields, email: e.target.value })}
                      className="form-input-3d"
                    />
                    {errors.email && <span className="text-xs text-red-400 font-mono mt-1.5 block">{errors.email}</span>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 uppercase tracking-wider font-medium">
                      Project Details / Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Describe your goals, requirements, or opportunities..."
                      value={fields.message}
                      onChange={(e) => setFields({ ...fields, message: e.target.value })}
                      className="form-input-3d resize-none min-h-[120px]"
                    />
                    {errors.message && <span className="text-xs text-red-400 font-mono mt-1.5 block">{errors.message}</span>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-glow-primary w-full justify-center py-4 flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Send size={16} />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
