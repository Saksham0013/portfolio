import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const STATEMENTS = [
  { label: 'Clean Code.',           icon: '⌥' },
  { label: 'Responsive Design.',    icon: '⊞' },
  { label: 'Modern Technology.',    icon: '◈' },
  { label: 'Performance First.',    icon: '⚡' },
  { label: 'Pixel-Conscious UI.',   icon: '◉' },
  { label: 'Full-Stack Knowledge.', icon: '∞' },
];

export default function WhyMe() {
  const [headRef, headInView] = useScrollInView({ amount: 0.4 });
  const [listRef, listInView] = useScrollInView({ amount: 0.1 });

  return (
    <section id="why" className="whyme section" aria-label="Why work with Saksham">
      <div className="container">
        <SectionLabel number="07" text="WHY SAKSHAM?" />

        <div ref={headRef} style={{ overflow: 'hidden' }}>
          <motion.h2
            className="text-display"
            style={{ marginBottom: '56px' }}
            initial={{ y: '105%', opacity: 0 }}
            animate={headInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Why Saksham?
          </motion.h2>
        </div>

        <div ref={listRef} aria-label="Key strengths" className="whyme__grid">
          {STATEMENTS.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              className="whyme__card"
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={listInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'var(--accent)', transition: { duration: 0.3 } }}
            >
              <span className="whyme__card-icon" aria-hidden="true">{icon}</span>
              <span className="whyme__card-label">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
