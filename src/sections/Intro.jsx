import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const lineVariants = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i) => ({
    y: '0%', opacity: 1,
    transition: { duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Intro() {
  const [ref, inView] = useScrollInView({ amount: 0.25 });
  const [subRef, subInView] = useScrollInView({ amount: 0.4 });

  const lines = ['I Build', 'Digital', 'Experiences.'];

  return (
    <section id="intro" className="intro section" aria-label="Intro statement">
      <div className="container">
        <SectionLabel number="01" text="INTRO" />

        <h2 aria-label="I build digital experiences." ref={ref}>
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                className="intro__statement"
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {i === 2 ? (
                  <>Experiences<span className="text-accent">.</span></>
                ) : line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          ref={subRef}
          className="intro__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={subInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I turn ideas into fast, responsive and visually polished web applications — built with clean architecture, modern tooling and a sharp eye for detail.
        </motion.p>
      </div>
    </section>
  );
}
