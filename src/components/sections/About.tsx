import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";

const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: clinic.metrics.yearsExperience, suffix: "", label: "anos de prática clínica" },
  { value: clinic.metrics.patientsPerYear, suffix: "+", label: "pacientes por ano" },
  { value: clinic.metrics.successRate, suffix: "%", label: "recomendam-nos" },
  { value: clinic.metrics.rating, suffix: "", label: "avaliação média", decimals: 1 },
];

export function About() {
  return (
    <section id="sobre" className="container-site py-24 lg:py-36">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <SectionHeading
          eyebrow="Sobre a clínica"
          title="Uma pessoa, um fisioterapeuta, uma hora inteira."
          lead="Fundada em 2007, a Clínica Marques dos Santos nasceu de uma recusa: a de tratar pessoas em série. Aqui, cada sessão é individual, cada plano é desenhado à medida, e cada decisão é apoiada na melhor evidência científica disponível."
        />
        <div className="flex flex-col justify-between gap-12">
          <Reveal variant="fade" delay={0.15}>
            <p className="text-lg leading-relaxed text-slate">
              Não prometemos milagres — prometemos rigor, honestidade e
              acompanhamento próximo. Se não estiver a evoluir, dizemos-lho e
              mudamos a abordagem. Se o seu caso precisar de outro profissional,
              encaminhamos. É assim há {clinic.metrics.yearsExperience} anos.
            </p>
          </Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <div>
                  <dd className="text-display text-4xl text-ink">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </dd>
                  <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
