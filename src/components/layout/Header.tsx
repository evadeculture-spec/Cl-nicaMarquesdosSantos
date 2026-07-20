"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE_CALM } from "@/lib/motion";

const nav = [
  { href: "/sobre", label: "Sobre" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/equipa", label: "Equipa" },
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/casos-clinicos", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-calm)]",
        scrolled ? "glass shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Link
          href="/"
          className="flex items-baseline gap-1.5 text-[1.0625rem] font-semibold tracking-tight text-ink"
          aria-label="Clínica Marques dos Santos — página inicial"
        >
          <span className="inline-block size-2 translate-y-px rounded-full bg-azure-500" aria-hidden />
          Marques dos Santos
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                pathname.startsWith(item.href)
                  ? "text-ink font-medium"
                  : "text-slate hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="text-sm text-slate transition-colors duration-300 hover:text-ink"
          >
            Área do Paciente
          </Link>
          <ButtonLink href="/marcar" size="md">
            Marcar Consulta
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navegação principal"
            className="glass fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto px-6 pb-10 pt-4 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_CALM }}
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_CALM, delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink hover:bg-white"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-line pt-6">
              <ButtonLink href="/marcar" size="lg" className="w-full">
                Marcar Consulta
              </ButtonLink>
              <ButtonLink href="/login" variant="secondary" size="lg" className="w-full">
                Área do Paciente
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
