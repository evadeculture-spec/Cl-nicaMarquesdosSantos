import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Tratamentos e preços",
  description:
    "Preços claros em Castelo Branco: avaliação inicial, fisioterapia, osteopatia, reabilitação perineal e estética, podoposturologia, terapia da fala e psicologia.",
  alternates: { canonical: "/tratamentos" },
};

export default function TratamentosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tratamentos"
        title="Sabe sempre o que paga e porquê."
        lead="Sessões individuais, fatura-recibo para reembolso e desmarcação gratuita até 24 horas antes. Sem pacotes forçados, sem letras pequenas."
      />
      <TreatmentsSection />
      <FaqSection />
    </>
  );
}
