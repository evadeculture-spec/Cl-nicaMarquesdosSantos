import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre dor, movimento e recuperação, escritos pela equipa clínica da Clínica Marques dos Santos — com evidência e em português claro.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        image="/images/estudio-pilates.jpg"
        eyebrow="Blog"
        title="Ler também faz parte do tratamento."
        lead="Quanto mais souber sobre o seu corpo, melhor decide. Artigos curtos, honestos e sem sensacionalismo — escritos por quem trata."
      />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
