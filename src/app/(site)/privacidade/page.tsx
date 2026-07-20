import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = {
  title: "Política de privacidade",
  alternates: { canonical: "/privacidade" },
  robots: { index: false },
};

const sections = [
  {
    title: "Quem somos",
    text: `A ${clinic.name}, com sede em ${clinic.address.street}, ${clinic.address.locality}, é a responsável pelo tratamento dos seus dados pessoais recolhidos através deste site.`,
  },
  {
    title: "Que dados recolhemos",
    text: "Recolhemos apenas os dados necessários: nome, contactos e informação que decida partilhar nos formulários de marcação e contacto. Os dados clínicos são recolhidos exclusivamente em consulta e tratados ao abrigo do sigilo profissional.",
  },
  {
    title: "Para que os usamos",
    text: "Gestão de marcações, comunicação consigo, faturação e obrigações legais. Nunca vendemos nem cedemos os seus dados a terceiros para fins de marketing.",
  },
  {
    title: "Durante quanto tempo",
    text: "Os registos clínicos são conservados pelos prazos legais aplicáveis à prestação de cuidados de saúde. Os dados de contacto são eliminados quando deixarem de ser necessários ou quando o solicitar.",
  },
  {
    title: "Os seus direitos",
    text: `Pode aceder, corrigir, limitar ou apagar os seus dados, e apresentar reclamação à CNPD. Para exercer qualquer direito, escreva-nos para ${clinic.email}.`,
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Política de privacidade."
        lead="Escrita para ser lida — sem juridiquês desnecessário."
      />
      <section className="container-site py-16 lg:py-24">
        <div className="mx-auto max-w-2xl space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold tracking-tight text-ink">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-slate">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
