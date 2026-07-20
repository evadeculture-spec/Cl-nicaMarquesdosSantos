import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Preciso de prescrição médica? Quanto custa? Trabalham com seguros? Respostas às perguntas mais frequentes sobre fisioterapia na Clínica Marques dos Santos.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="As respostas antes das perguntas."
        lead="Se a sua dúvida não estiver aqui, o assistente no canto do ecrã responde a qualquer hora — e a Carla responde em 15 minutos, em horário de clínica."
      />
      <FaqSection />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema())} />
    </>
  );
}
