import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Marcar consulta",
  description:
    "Marque a sua consulta de fisioterapia online em 60 segundos: escolha o tratamento, o profissional e o horário. Confirmação automática por email.",
  alternates: { canonical: "/marcar" },
  robots: { index: true, follow: true },
};

export default async function MarcarPage({
  searchParams,
}: {
  searchParams: Promise<{ especialidade?: string }>;
}) {
  const { especialidade } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Marcação online"
        title="Sessenta segundos até à sua consulta."
        lead="Escolha o tratamento, o profissional e a hora. Confirmamos por email em 15 minutos, dentro do horário da clínica — e lembramos-lhe no dia anterior."
      />
      <section className="container-site py-16 lg:py-24">
        <BookingWizard initialSpecialty={especialidade} />
      </section>
    </>
  );
}
