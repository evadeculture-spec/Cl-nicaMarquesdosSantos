import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Fundo fotográfico ambiente: imagem desfocada sob um véu de cor.
 * O desfoque transforma qualquer fotografia em textura de luz — dá
 * profundidade e calor à secção sem competir com o conteúdo (e sem
 * comprometer o contraste AA do texto).
 *
 * Usar dentro de uma secção com `relative`; o conteúdo por cima
 * precisa de `relative` para ficar acima do fundo.
 */
export function Ambient({
  image,
  veil = "light",
  className,
}: {
  image: string;
  /** "light" = véu branco/creme (texto escuro) · "gold" = véu dourado (texto branco). */
  veil?: "light" | "gold";
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          "scale-110 object-cover blur-2xl",
          veil === "light" ? "opacity-35" : "opacity-40",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          veil === "light"
            ? "bg-gradient-to-b from-white/85 via-white/75 to-white/90"
            : "bg-gradient-to-br from-gold-700/90 via-gold-600/85 to-gold-700/92",
        )}
      />
    </div>
  );
}
