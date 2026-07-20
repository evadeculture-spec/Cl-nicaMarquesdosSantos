import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { allServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Sete valências clínicas em Castelo Branco: fisioterapia, osteopatia, reabilitação perineal, reabilitação estética, podoposturologia, terapia da fala e psicologia.",
  alternates: { canonical: "/especialidades" },
};

export default function EspecialidadesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Especialidades"
        title="Mais de vinte formas de cuidar de si."
        lead="Das valências principais às consultas de especialidade, tudo num só espaço — com um médico fisiatra que garante a avaliação e prescrição necessárias ao reembolso dos tratamentos."
      />
      <SpecialtiesGrid />
      <section className="container-site py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-display text-3xl text-ink sm:text-4xl">
            Consultas de especialidade e serviços
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Para além das valências principais, encontra na clínica todas estas
            consultas e serviços. Marque diretamente ou fale connosco para
            perceber por onde começar.
          </p>
        </Reveal>
        <Stagger className="mt-12 flex flex-wrap gap-3" stagger={0.02}>
          {allServices.map((service) => (
            <StaggerItem key={service}>
              <span className="inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-sm text-slate shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-200 hover:text-ink">
                {service}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <FinalCta />
    </>
  );
}
