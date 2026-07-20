import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { getSpecialty, specialties } from "@/content/specialties";
import { team } from "@/content/team";
import { jsonLd, specialtySchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.short} ${s.description.slice(0, 120)}…`,
    alternates: { canonical: `/especialidades/${s.slug}` },
  };
}

export default async function EspecialidadePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) notFound();

  const specialists = team.filter((m) =>
    m.focus.some((f) => f.toLowerCase().includes(s.name.split(" ")[0].toLowerCase())),
  );

  return (
    <>
      <PageHeader eyebrow="Especialidade" title={s.name} lead={s.short} />

      <section className="container-site grid gap-16 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:py-32">
        <div className="space-y-12">
          <Reveal>
            <h2 className="text-display text-2xl text-ink sm:text-3xl">
              O que é e como tratamos
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">{s.description}</p>
            <p className="mt-4 leading-relaxed text-slate">{s.approach}</p>
          </Reveal>

          <Reveal>
            <h3 className="font-semibold tracking-tight text-ink">
              Sinais de que esta consulta é para si
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.symptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm text-slate shadow-soft"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
                  {symptom}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="rounded-2xl border border-line bg-mist p-8">
              <p className="text-sm font-medium text-muted">Duração típica</p>
              <p className="mt-1 text-display text-2xl text-ink">{s.sessions}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Estimativa honesta apresentada no fim da avaliação inicial, com
                reavaliação objetiva a cada 4 sessões.
              </p>
              <ButtonLink
                href={`/marcar?especialidade=${s.slug}`}
                size="lg"
                className="mt-6 w-full"
              >
                Marcar avaliação
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>

          {specialists.length > 0 && (
            <Stagger className="space-y-4">
              {specialists.map((m) => (
                <StaggerItem key={m.id}>
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl font-semibold ${
                        m.accent === "azure"
                          ? "bg-azure-50 text-azure-700"
                          : "bg-sage-100 text-sage-700"
                      }`}
                      aria-hidden
                    >
                      {m.initials}
                    </span>
                    <div>
                      <p className="font-medium tracking-tight text-ink">{m.name}</p>
                      <p className="text-sm text-muted">{m.role}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(specialtySchema(s))}
      />
    </>
  );
}
