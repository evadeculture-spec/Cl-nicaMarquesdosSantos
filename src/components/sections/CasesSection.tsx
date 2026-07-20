import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { clinicalCases } from "@/content/cases";

export function CasesSection({ limit = 2 }: { limit?: number }) {
  const items = limit ? clinicalCases.slice(0, limit) : clinicalCases;

  return (
    <section id="casos" className="bg-mist py-24 lg:py-36">
      <div className="container-site">
        <SectionHeading
          eyebrow="Casos clínicos"
          title="Histórias reais, resultados medidos."
          lead="Não escolhemos os casos mais fáceis — escolhemos os que mostram como trabalhamos: com plano, com critérios e com paciência."
        />
        <Stagger className="mt-16 grid gap-5 lg:grid-cols-2" stagger={0.1}>
          {items.map((c) => (
            <StaggerItem key={c.id}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="gold">{c.specialty}</Badge>
                  <Badge>{c.age}</Badge>
                  <Badge>{c.duration}</Badge>
                </div>
                <h3 className="mt-5 text-display text-2xl text-ink">{c.title}</h3>
                <dl className="mt-6 flex-1 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-medium text-ink">O problema</dt>
                    <dd className="mt-1 text-slate">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">O que fizemos</dt>
                    <dd className="mt-1 text-slate">{c.intervention}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">O resultado</dt>
                    <dd className="mt-1 text-slate">{c.outcome}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex items-center gap-4 rounded-xl bg-mist px-5 py-4">
                  <span className="text-sm text-muted">{c.metric.label}</span>
                  <span className="ml-auto flex items-center gap-2 text-sm font-medium">
                    <span className="text-slate line-through decoration-slate/40">
                      {c.metric.before}
                    </span>
                    <ArrowRight className="size-3.5 text-muted" aria-hidden />
                    <span className="text-sage-600">{c.metric.after}</span>
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
