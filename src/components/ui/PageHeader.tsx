import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

/**
 * Cabeçalho padrão das páginas interiores.
 * Com `image`, a fotografia aparece nítida num cartão ao lado do título —
 * as pessoas e o espaço da clínica ficam visíveis, não escondidos em blur.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "Clínica Marques dos Santos, em Castelo Branco",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="hero-field border-b border-line pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div
        className={
          image
            ? "container-site grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
            : "container-site"
        }
      >
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
        {image && (
          <Reveal delay={0.15}>
            <figure className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </Reveal>
        )}
      </div>
    </header>
  );
}
