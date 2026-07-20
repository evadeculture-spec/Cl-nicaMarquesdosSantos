import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Dez especialidades de fisioterapia em Lisboa: dor lombar, cervical, lesões desportivas, pós-operatório, osteopatia, pilates clínico, ATM, neurológica, pediátrica e saúde da mulher.",
  alternates: { canonical: "/especialidades" },
};

export default function EspecialidadesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Especialidades"
        title="Dez áreas, um mesmo cuidado."
        lead="Cada especialidade tem um fisioterapeuta com formação avançada dedicada. Escolha a sua área — ou fale com o assistente e ajudamos a decidir."
      />
      <SpecialtiesGrid />
      <FinalCta />
    </>
  );
}
