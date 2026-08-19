import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useScrollInView } from '../hooks/useInView';

const SERVICES = [
  { num: '01', name: 'Web Development',       detail: 'Full-featured, scalable websites' },
  { num: '02', name: 'React Development',     detail: 'Modern, component-driven UIs' },
  { num: '03', name: 'Full-Stack Development',detail: 'End-to-end MERN applications' },
  { num: '04', name: 'Responsive Websites',   detail: 'Pixel-perfect on every device' },
  { num: '05', name: 'Landing Pages',         detail: 'High-converting, fast pages' },
  { num: '06', name: 'UI Implementation',     detail: 'Design-to-code precision' },
  { num: '07', name: 'Website Deployment',    detail: 'CI/CD, hosting & setup' },
  { num: '08', name: 'Performance Optimization', detail: 'Core Web Vitals & speed' },
];

export default function Services() {
  const [headRef, headInView] = useScrollInView({ amount: 0.4 });
  const [listRef, listInView] = useScrollInView({ amount: 0.1 });

  return (
    <section id="services" className="services section" aria-label="Services">
      <div className="container">
        <SectionLabel number="06" text="SERVICES" />

        <div ref={headRef} style={{ overflow: 'hidden' }}>
          <motion.h2
            className="text-display"
            initial={{ y: '105%', opacity: 0 }}
            animate={headInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            What I Do
          </motion.h2>
        </div>

        <ul ref={listRef} className="services__list">
          {SERVICES.map(({ num, name, detail }, i) => (
            <motion.li
              key={num}
              className="services__item"
              initial={{ opacity: 0, y: 20 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ paddingLeft: '12px' }}
            >
              <span className="services__num" aria-hidden="true">{num}</span>
              <span className="services__name">{name}</span>
              <span className="services__detail">{detail}</span>
              <motion.span
                className="services__arrow"
                aria-hidden="true"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
              >→</motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
