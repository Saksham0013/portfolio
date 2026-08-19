import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor — desktop only (hidden on touch devices via CSS).
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const wrapRef = useRef(null);
  const [label, setLabel] = useState('');
  const [state, setState] = useState(''); // '' | 'hover-btn' | 'hover-project'

  useEffect(() => {
    // Don't initialise on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const wrap = wrapRef.current;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      if (dot) {
        dot.style.left = `${mx}px`;
        dot.style.top  = `${my}px`;
      }
    };

    // Ring follows with lerp
    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) {
        ring.style.left = `${rx}px`;
        ring.style.top  = `${ry}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    // Hover detection
    const onOver = (e) => {
      const el = e.target;
      if (el.closest('[data-cursor="project"]')) {
        setState('hover-project');
        setLabel('VIEW');
      } else if (el.closest('button, a, [role="button"], .btn')) {
        setState('hover-btn');
        setLabel('');
      } else {
        setState('');
        setLabel('');
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true">
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
      >
        <div className="cursor__dot" />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor ${state}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }}
      >
        <div className="cursor__ring">
          <span className="cursor__label">{label}</span>
        </div>
      </div>
    </div>
  );
}
