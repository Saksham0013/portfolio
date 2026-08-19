import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const defaults = {
  start: 'top 88%',
  end: 'bottom 10%',
  toggleActions: 'play none none reverse',
};

/**
 * Fade-up reveal for a single element or NodeList.
 */
export function fadeUp(targets, options = {}) {
  if (prefersReduced()) return;

  gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.9,
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0,
      scrollTrigger: {
        trigger: options.trigger ?? targets,
        ...defaults,
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Text lines reveal (from clip-bottom up).
 * Wrap each line in a .clip-wrapper before calling.
 */
export function linesReveal(targets, options = {}) {
  if (prefersReduced()) {
    gsap.set(targets, { y: 0, opacity: 1 });
    return;
  }

  gsap.fromTo(
    targets,
    { y: '105%' },
    {
      y: '0%',
      duration: options.duration ?? 1.0,
      ease: 'power4.out',
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: options.trigger ?? targets,
        ...defaults,
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Clip-path image reveal (left → right).
 */
export function imageReveal(target, options = {}) {
  if (prefersReduced()) return;

  gsap.fromTo(
    target,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: options.duration ?? 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: options.trigger ?? target,
        ...defaults,
        start: options.start ?? 'top 85%',
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Scale + fade for elements.
 */
export function scaleReveal(target, options = {}) {
  if (prefersReduced()) return;

  gsap.fromTo(
    target,
    { scale: 1.08, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: options.duration ?? 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: options.trigger ?? target,
        ...defaults,
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Horizontal slide-in.
 */
export function slideIn(target, direction = 'left', options = {}) {
  if (prefersReduced()) return;

  const x = direction === 'left' ? -60 : 60;

  gsap.fromTo(
    target,
    { x, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: options.duration ?? 0.9,
      ease: 'power3.out',
      stagger: options.stagger ?? 0,
      scrollTrigger: {
        trigger: options.trigger ?? target,
        ...defaults,
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Parallax effect bound to scroll.
 */
export function parallax(target, yAmount = 40, options = {}) {
  if (prefersReduced()) return;

  gsap.fromTo(
    target,
    { y: -yAmount },
    {
      y: yAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger ?? target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: options.scrub ?? 1.5,
      },
    }
  );
}

/**
 * Staggered reveal for a list of items.
 */
export function staggerReveal(targets, options = {}) {
  if (prefersReduced()) return;

  gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      ease: 'power3.out',
      stagger: options.stagger ?? 0.08,
      scrollTrigger: {
        trigger: options.trigger ?? targets,
        ...defaults,
        ...options.scrollTrigger,
      },
    }
  );
}
