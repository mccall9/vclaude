'use client';

import {useEffect, useRef} from 'react';

/** Entra suave (sobe, desfoca e aparece) quando chega na tela. */
export const Reveal = ({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'details';
  className?: string;
} & React.HTMLAttributes<HTMLElement>) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      {rootMargin: '0px 0px -10% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as 'div';
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{['--delay' as string]: `${delay}ms`}}
      {...rest}
    >
      {children}
    </Comp>
  );
};
