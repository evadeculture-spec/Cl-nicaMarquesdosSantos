import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Av. da República 42, Lisboa · +351 21 000 00 00 · Seg–Sex 08h–20h, Sáb 09h–13h. Fale connosco — respondemos em 15 minutos.",
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
