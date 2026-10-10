'use client';

import {useEffect, useRef} from 'react';

/** Frase grande que acende palavra por palavra conforme passa pela linha de leitura. */
export const Tagline = ({text}: {text: string}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('.w'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            io.unobserve(e.target);
          }
        }
      },
      {rootMargin: '0px 0px -38% 0px'},
    );
    spans.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <p ref={ref}>
      {words.map((w, i) => {
        const hl = w.startsWith('*');
        const clean = w.replace(/\*/g, '');
        return (
          <span key={i}>
            <span className={`w${hl ? ' hl' : ''}`}>{clean}</span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
};
