import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamSection } from "@/components/sections/TeamSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "A equipa",
  description:
    "Fisioterapeutas, osteopata, podoposturologista, terapeuta da fala e psicóloga — conheça a equipa da Clínica Marques dos Santos, em Castelo Branco.",
  alternates: { canonical: "/equipa" },
};

export default function EquipaPage() {
  return (
    <>
      <PageHeader
        image="/images/equipa-grupo.jpg"
        imageAlt="A equipa da Clínica Marques dos Santos"
        eyebrow="A equipa"
        title="Quem vai cuidar de si."
        lead="Uma equipa multidisciplinar — fisioterapia, osteopatia, podoposturologia, terapia da fala e psicologia — e uma assistente que responde antes de o telefone tocar duas vezes."
      />
      <TeamSection showPhotos={false} />
      <FinalCta />
    </>
  );
}
