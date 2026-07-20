import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { treatments } from "@/content/treatments";
import { formatCurrencyPt } from "@/lib/utils";

export function TreatmentsSection() {
  return (
    <section id="tratamentos" className="bg-mist py-24 lg:py-36">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Tratamentos"
            title="Preços claros, sem surpresas."
            lead="Sessões sempre individuais. Emitimos fatura-recibo para reembolso de seguros e subsistemas de saúde."
          />
        </div>
        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {treatments.map((t) => (
            <StaggerItem key={t.id} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift ${
                  t.highlight ? "border-azure-200 ring-4 ring-azure-50" : "border-line"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{t.name}</h3>
                  {t.highlight && <Badge tone="azure">Começa aqui</Badge>}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{t.description}</p>
                <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
                  <span className="text-sm text-muted">{t.durationMinutes} min</span>
                  <span className="text-display text-2xl text-ink">
                    {formatCurrencyPt(t.price)}
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12 text-center">
          <ButtonLink href="/marcar" size="lg">
            Marcar a primeira avaliação
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
