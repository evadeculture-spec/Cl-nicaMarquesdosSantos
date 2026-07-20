import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Technology } from "@/components/sections/Technology";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Tecnologia",
  description:
    "Avaliação com dados objetivos, relatórios de progresso digitais, marcação online e assistente digital — tecnologia ao serviço do tratamento.",
  alternates: { canonical: "/tecnologia" },
};

export default function TecnologiaPage() {
  return (
    <>
      <PageHeader
        image="/images/clinica-parede.jpg"
        eyebrow="Tecnologia"
        title="Medimos, para não termos de adivinhar."
        lead="Dinamometria, análise de movimento, relatórios digitais e marcação online. A tecnologia trata da precisão e da comodidade — as mãos e o tempo continuam a ser nossos."
      />
      <Technology />
      <FinalCta />
    </>
  );
}
