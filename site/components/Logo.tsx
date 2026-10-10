/**
 * Marca do Motion Pronto: um M desenhado como uma curva de animação contínua,
 * com um keyframe (losango) no lugar do ponto final. Lido junto: "M." de pronto.
 */
export const MARK_PATH = 'M10 52V22c0-5 6-7 9-3l9 13c3 5 10 5 13 0l9-13c3-4 9-2 9 3v30';
export const MARK_DOT = 'M71 46l6 6-6 6-6-6z';

export const Mark = ({size = 28, className}: {size?: number; className?: string}) => (
  <svg width={(size * 80) / 64} height={size} viewBox="0 0 80 64" className={className} aria-hidden="true">
    <path d={MARK_PATH} fill="none" stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <path d={MARK_DOT} fill="var(--fg)" />
  </svg>
);

export const Logo = ({size = 22}: {size?: number}) => (
  <>
    <Mark size={size} />
    <span>Motion Pronto</span>
  </>
);
