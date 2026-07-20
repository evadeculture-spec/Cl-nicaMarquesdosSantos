import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Termos e condições",
  alternates: { canonical: "/termos" },
  robots: { index: false },
};

const sections = [
  {
    title: "Marcações e desmarcações",
    text: "As marcações online ficam pendentes até confirmação pela clínica, enviada por email. Pode desmarcar ou remarcar sem custo até 24 horas antes; depois disso, poderá ser cobrado o valor da sessão reservada.",
  },
  {
    title: "Pagamentos",
    text: "O pagamento é efetuado na clínica, por multibanco, MB Way ou numerário. Emitimos fatura-recibo com os elementos necessários para reembolso por seguros e subsistemas.",
  },
  {
    title: "Conteúdo informativo",
    text: "Os artigos e respostas do assistente digital têm caráter informativo e não substituem avaliação, diagnóstico ou tratamento por profissionais de saúde. Em emergência, ligue 112.",
  },
  {
    title: "Área do paciente",
    text: "O acesso é pessoal e intransmissível. Os documentos disponibilizados são confidenciais e destinam-se exclusivamente ao próprio paciente.",
  },
];

export default function TermosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Termos e condições."
        lead="As regras do serviço, em linguagem clara."
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
