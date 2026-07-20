import { Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section id="testemunhos" className="container-site py-24 lg:py-36">
      <SectionHeading
        align="center"
        eyebrow="Testemunhos"
        title="O que dizem quando já não precisam de nós."
        lead="A melhor medida do nosso trabalho é a alta — e o que as pessoas contam depois dela."
      />
      <Stagger className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3" stagger={0.06}>
        {testimonials.map((t) => (
          <StaggerItem key={t.name} className="mb-5 break-inside-avoid">
            <figure className="rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex gap-0.5 text-amber-400" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-slate">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="text-muted"> · {t.context}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
