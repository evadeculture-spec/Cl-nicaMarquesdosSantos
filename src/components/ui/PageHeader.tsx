import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

/** Cabeçalho padrão das páginas interiores — respira antes do conteúdo. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="hero-field border-b border-line pb-16 pt-36 lg:pb-24 lg:pt-44">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <Badge tone="azure" className="mb-6">
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
