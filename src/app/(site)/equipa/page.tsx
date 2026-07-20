import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamSection } from "@/components/sections/TeamSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "A equipa",
  description:
    "Fisioterapeutas com formação avançada em dor lombar, desporto, saúde da mulher, neurologia, pediatria e ATM. Conheça a equipa da Clínica Marques dos Santos.",
  alternates: { canonical: "/equipa" },
};

export default function EquipaPage() {
  return (
    <>
      <PageHeader
        eyebrow="A equipa"
        title="Quem vai cuidar de si."
        lead="Cinco fisioterapeutas, cada um com uma área de especialização profunda — e uma assistente que responde antes de o telefone tocar duas vezes."
      />
      <TeamSection />
      <FinalCta />
    </>
  );
}
