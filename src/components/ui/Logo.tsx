import Image from "next/image";
import { cn } from "@/lib/utils";

/** Símbolo oficial da marca — mãos que acolhem, branco sobre dourado. */
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

/**
 * Lockup completo, recriado tipograficamente para ficar nítido em
 * qualquer fundo claro: símbolo + CLÍNICA + MARQUES DOS SANTOS + subtítulo.
 */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <LogoMark className="size-16 rounded-2xl shadow-soft" />
      <p className="mt-5 text-sm font-light uppercase tracking-[0.5em] text-gold-600">
        Clínica
      </p>
      <p className="mt-1 text-2xl font-bold uppercase tracking-[0.12em] text-gold-700">
        Marques dos Santos
      </p>
      <p className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
        Fisioterapia, Osteopatia e outras especialidades médicas
      </p>
    </div>
  );
}

/** Artwork oficial completo (recorte do original), para painéis dourados. */
export function LogoArtwork({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-lockup-gold.png"
      alt="Clínica Marques dos Santos — Fisioterapia, Osteopatia e outras especialidades médicas"
      width={1100}
      height={1051}
      className={cn("h-auto w-full", className)}
      priority
    />
  );
}
