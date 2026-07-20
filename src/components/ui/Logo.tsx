import Image from "next/image";
import { cn } from "@/lib/utils";

const LOCKUP_ALT =
  "Clínica Marques dos Santos — Fisioterapia, Osteopatia e outras especialidades médicas";

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
 * Lockup horizontal integrado (símbolo + lettering original numa só peça),
 * para o header e barras de navegação.
 */
export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/lockup-horizontal-tinted.png"
      alt={LOCKUP_ALT}
      width={1309}
      height={300}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
}

/**
 * Ilustração oficial completa (símbolo + nome), extraída do artwork
 * original — versão dourada para fundos claros.
 */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/lockup-tinted.png"
      alt={LOCKUP_ALT}
      width={900}
      height={1018}
      className={cn("h-auto w-64", className)}
    />
  );
}

/**
 * Ilustração oficial completa em branco — para painéis dourados,
 * onde as mãos ganham o dourado do fundo, como no artwork original.
 */
export function LogoArtwork({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/lockup-white.png"
      alt={LOCKUP_ALT}
      width={900}
      height={1018}
      className={cn("h-auto w-full", className)}
      priority
    />
  );
}
