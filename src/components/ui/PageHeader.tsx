import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

/**
 * Cabeçalho padrão das páginas interiores — respira antes do conteúdo.
 * Com `image`, mostra a fotografia desfocada como ambiente de fundo,
 * sob um véu de creme que mantém o contraste AA do texto.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <header className="hero-field relative overflow-hidden border-b border-line pb-16 pt-36 lg:pb-24 lg:pt-44">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-30 blur-2xl scale-110"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-mist/95"
          />
        </>
      )}
      <div className="container-site relative">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <Badge tone="gold" className="mb-6">
              {eyebrow}
            </Badge>
          )}
          <h1 className="text-display text-balance-pretty text-4xl text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">{lead}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
