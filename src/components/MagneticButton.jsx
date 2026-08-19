import { useRef, useCallback } from 'react';

/**
 * Magnetic button — subtle mouse-pull effect on hover.
 * Wraps any children.
 */
export default function MagneticButton({ children, strength = 0.35, className = '', style = {} }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
