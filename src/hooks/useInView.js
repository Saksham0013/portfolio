/**
 * Shared hook — wraps framer-motion's useInView with sensible defaults.
 * Usage: const ref = useScrollInView()
 * Pair with <motion.div ref={ref} variants={...} animate={inView ? 'visible' : 'hidden'}>
 */
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollInView(options = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, ...options });
  return [ref, inView];
}
