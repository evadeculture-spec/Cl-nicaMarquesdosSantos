import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Rua Doutor Francisco Robalo Guedes, R/C LT D4, Castelo Branco · +351 939 966 174 · Seg–Sex 09h–20h, Sáb 09h–13h. Fale connosco — respondemos em minutos.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Estamos à distância de uma mensagem."
        lead="Telefone, email, formulário ou assistente digital — escolha o canal. Do outro lado está sempre alguém que conhece a clínica por dentro."
      />
      <ContactSection />
    </>
  );
}
