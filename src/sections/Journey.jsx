import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const JOURNEY = [
  {
    year: '2024',
    heading: 'Started the Journey',
    body: 'Began exploring web development, learning the fundamentals of HTML, CSS and JavaScript. Built first projects and discovered a genuine passion for creating things on the web.',
  },
  {
    year: '2025',
    heading: 'Going Full-Stack',
    body: 'Expanded into React for the frontend and Node.js, Express and MongoDB for the backend. Completed the MERN stack, building progressively more complex and polished applications.',
  },
  {
    year: '2026',
    heading: 'Building in Public',
    body: 'Focused on production-quality projects, advanced UI engineering and deploying real applications. Deepening expertise in performance, accessibility and scalable architecture.',
  },
];

export default function Journey() {
  const [headRef, headInView] = useScrollInView({ amount: 0.4 });
  const [listRef, listInView] = useScrollInView({ amount: 0.1 });

  return (
    <section id="journey" className="journey section" aria-label="Development journey">
      <div className="container">
        <SectionLabel number="05" text="JOURNEY" />

        <div ref={headRef} style={{ overflow: 'hidden' }}>
          <motion.h2
            className="text-display"
            initial={{ y: '105%', opacity: 0 }}
            animate={headInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Where I've Been
          </motion.h2>
        </div>

        <div ref={listRef} className="journey__list" role="list">
          <div className="journey__line" aria-hidden="true" />

          {JOURNEY.map(({ year, heading, body }, i) => (
            <motion.div
              key={year}
              className="journey__item"
              role="listitem"
              initial={{ opacity: 0, x: -32 }}
              animate={listInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <time className="journey__year" dateTime={year}>{year}</time>
              <div>
                <motion.div
                  className="journey__dot"
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  animate={listInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
                />
                <h3 className="journey__text-head">{heading}</h3>
                <p className="journey__text-body">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
