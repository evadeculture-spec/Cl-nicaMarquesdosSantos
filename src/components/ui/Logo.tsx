import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Sistema de logótipo: o símbolo é a ilustração oficial extraída do
 * artwork; o lettering é renderizado como texto real (Jost, geométrica
 * próxima do desenho original) — totalmente nítido em qualquer tamanho.
 */

const SUBTITLE = "Fisioterapia, Osteopatia e outras especialidades médicas";

/** Símbolo em cartão dourado (avatar da marca) — header e favicons. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark-gold.png"
      alt=""
      aria-hidden
      width={56}
      height={56}
      className={cn("rounded-lg object-cover", className)}
    />
  );
}

/** Lockup horizontal integrado — header e barras de navegação. */
export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 shrink-0" />
      <span className="font-logo flex flex-col leading-none" aria-hidden>
        <span className="text-[0.5625rem] uppercase tracking-[0.4em] text-gold-600">
          Clínica
        </span>
        <span className="mt-1 text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-gold-700">
          Marques dos Santos
        </span>
      </span>
      <span className="sr-only">Clínica Marques dos Santos — {SUBTITLE}</span>
    </span>
  );
}

/** Lockup vertical completo — footer e login, dourado sobre fundos claros. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col items-center text-center", className)}>
      <Image
        src="/brand/symbol-tinted.png"
        alt=""
        aria-hidden
        width={480}
        height={480}
        className="h-auto w-36"
      />
      <span className="font-logo mt-5 flex flex-col items-center leading-none" aria-hidden>
        <span className="text-sm uppercase tracking-[0.5em] text-gold-600">Clínica</span>
        <span className="mt-1.5 text-[1.375rem] font-semibold uppercase tracking-[0.1em] text-gold-700">
          Marques dos Santos
        </span>
        <span className="mt-2 text-[0.625rem] uppercase tracking-[0.12em] text-muted">
          {SUBTITLE}
        </span>
      </span>
      <span className="sr-only">Clínica Marques dos Santos — {SUBTITLE}</span>
    </span>
  );
}

/** Lockup vertical em branco — para o painel dourado do hero. */
export function LogoArtwork({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col items-center text-center", className)}>
      <Image
        src="/brand/symbol-white.png"
        alt=""
        aria-hidden
        width={480}
        height={480}
        priority
        className="h-auto w-[68%]"
      />
      <span className="font-logo mt-6 flex flex-col items-center leading-none" aria-hidden>
        <span className="text-base uppercase tracking-[0.5em] text-white/90">Clínica</span>
        <span className="mt-1.5 text-[1.5rem] font-semibold uppercase tracking-[0.1em] text-white">
          Marques dos Santos
        </span>
        <span className="mt-2 text-[0.5625rem] uppercase tracking-[0.16em] text-white/80">
          {SUBTITLE}
        </span>
      </span>
      <span className="sr-only">Clínica Marques dos Santos — {SUBTITLE}</span>
    </span>
  );
}
