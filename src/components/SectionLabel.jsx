import { motion } from 'framer-motion';
import { useScrollInView } from '../hooks/useInView';

export default function SectionLabel({ number, text }) {
  const [ref, inView] = useScrollInView({ amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className="section-label"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-label__dot" aria-hidden="true" />
      <span>{text}</span>
    </motion.div>
  );
}
