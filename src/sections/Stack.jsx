import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const STACK = [
  { num: '01', name: 'React',        desc: 'Component-driven UIs' },
  { num: '02', name: 'JavaScript',   desc: 'ES2023+, async patterns' },
  { num: '03', name: 'Node.js',      desc: 'Server-side runtime' },
  { num: '04', name: 'Express',      desc: 'REST API framework' },
  { num: '05', name: 'MongoDB',      desc: 'NoSQL document store' },
  { num: '06', name: 'HTML / CSS',   desc: 'Semantic markup & styling' },
  { num: '07', name: 'Git / GitHub', desc: 'Version control & collab' },
  { num: '08', name: 'REST APIs',    desc: 'Stateless HTTP design' },
];

export default function Stack() {
  const [headRef, headInView] = useScrollInView({ amount: 0.4 });
  const [listRef, listInView] = useScrollInView({ amount: 0.1 });

  return (
    <section id="stack" className="stack section" aria-label="Technology stack">
      <div className="container">
        <SectionLabel number="03" text="STACK" />

        <div ref={headRef} style={{ overflow: 'hidden' }}>
          <motion.h2
            className="text-display"
            style={{ marginBottom: 0 }}
            initial={{ y: '105%', opacity: 0 }}
            animate={headInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            The Stack
          </motion.h2>
        </div>

        <div ref={listRef} className="stack__list" role="list">
          {STACK.map(({ num, name, desc }, i) => (
            <motion.div
              key={name}
              className="stack__item"
              role="listitem"
              tabIndex={0}
              initial={{ opacity: 0, y: 24 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ paddingLeft: '20px', backgroundColor: 'var(--bg-elevated)' }}
            >
              <div className="stack__accent" aria-hidden="true" />
              <span className="stack__num" aria-hidden="true">{num}</span>
              <span className="stack__name">{name}</span>
              <span className="stack__desc" aria-label={desc}>{desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
