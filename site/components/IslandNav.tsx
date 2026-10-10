'use client';

import {useEffect, useState} from 'react';

const links = [
  {href: '/#como-funciona', id: 'como-funciona', label: 'Como funciona'},
  {href: '/#o-que-vem', id: 'o-que-vem', label: 'O que vem'},
  {href: '/#preco', id: 'preco', label: 'Preço'},
  {href: '/#duvidas', id: 'duvidas', label: 'Dúvidas'},
];

/** Menu flutuante de vidro; no celular abre em tela cheia. */
export const IslandNav = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  // Marca a seção visível no menu
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      {rootMargin: '-45% 0px -50% 0px'},
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="island">
        <a href="/" className="brand" aria-label="Motion Pronto, início">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          Motion Pronto
        </a>
        <nav className="nav-links" aria-label="Seções">
          {links.map((l) => (
            <a key={l.id} href={l.href} className="nav-link" aria-current={current === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="island-end">
          <a href="/#preco" className="btn btn-primary btn-small">
            Comprar
          </a>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-celular"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav id="menu-celular" className="overlay" data-open={open} aria-label="Menu" aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.id} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
        <a href="/acesso" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Acessar minha compra
        </a>
      </nav>
    </>
  );
};
