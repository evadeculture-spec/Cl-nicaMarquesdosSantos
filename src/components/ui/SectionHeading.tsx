import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * Cabeçalho de secção padronizado: eyebrow + título display + lead.
 * A consistência deste ritmo é o que faz o site parecer "uma coisa só".
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Badge tone="gold" className="mb-5">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-display text-balance-pretty text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-lg leading-relaxed text-slate">{lead}</p>
      )}
    </Reveal>
  );
}
