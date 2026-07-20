import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CasesSection } from "@/components/sections/CasesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Casos clínicos",
  description:
    "Casos reais com resultados medidos: dor lombar crónica, retorno ao desporto após LCA, reabilitação pós-AVC e recuperação pós-parto.",
  alternates: { canonical: "/casos-clinicos" },
};

export default function CasosPage() {
  return (
    <>
      <PageHeader
        image="/images/tratamento-maos.jpg"
        eyebrow="Casos clínicos"
        title="Resultados que se podem medir."
        lead="Quatro percursos reais, anonimizados e partilhados com autorização. Sem casos escolhidos a dedo pela facilidade — escolhidos pelo que ensinam."
      />
      <CasesSection limit={0} />
      <Testimonials />
      <FinalCta />
    </>
  );
}
