'use client';
import { useEffect, useRef } from 'react';

export default function RevealWrapper({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible');
        io.unobserve(el);
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${className ? ' ' + className : ''}`}>
      {children}
    </div>
  );
}
