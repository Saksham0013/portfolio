import { gsap } from 'gsap';

/**
 * Cinematic hero entrance animation.
 * Call once on mount after refs are ready.
 *
 * @param {Object} refs - { nav, lines, desc, ctas, scroll }
 * @param {Function} onComplete - called when the sequence finishes
 */
export function runHeroAnimation({ nav, lines, desc, ctas, scroll }, onComplete) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Instantly show everything
    gsap.set([nav, ...lines, desc, ctas, scroll], { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
    onComplete?.();
    return;
  }

  const tl = gsap.timeline({ onComplete });

  // Set initial states
  gsap.set(nav, { opacity: 0, y: -20 });
  gsap.set(lines, { y: '110%' });          // text lines clip up
  gsap.set(desc, { opacity: 0, y: 24 });
  gsap.set(ctas, { opacity: 0, y: 16 });
  gsap.set(scroll, { opacity: 0 });

  tl
    // Nav slides in
    .to(nav, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.3)

    // Hero text lines reveal sequentially
    .to(lines, {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.12,
    }, 0.55)

    // Description fades up
    .to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, 1.0)

    // CTA buttons
    .to(ctas, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 1.2)

    // Scroll indicator
    .to(scroll, {
      opacity: 1,
      duration: 0.6,
    }, 1.5);

  return tl;
}
