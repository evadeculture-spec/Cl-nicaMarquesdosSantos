import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { TeamSection } from "@/components/sections/TeamSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Sobre a clínica",
  description:
    "Fisioterapia, osteopatia e reabilitação em Castelo Branco: sessões individuais, planos à medida e decisões apoiadas na melhor evidência. Conheça a Clínica Marques dos Santos.",
  alternates: { canonical: "/sobre" },
};

const values = [
  {
    title: "Tempo",
    text: "Uma hora inteira por sessão, sempre individual. O tempo é a primeira condição de um bom diagnóstico — e de uma boa recuperação.",
  },
  {
    title: "Rigor",
    text: "Medimos antes, durante e depois. Se o plano não está a funcionar, mudamo-lo. Se o seu caso precisa de outra especialidade, dizemos-lho.",
  },
  {
    title: "Proximidade",
    text: "Sabemos o seu nome, a sua história e o que é importante para si. A fisioterapia trata pessoas, não articulações.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHeader
        image="/images/clinica-parede.jpg"
        eyebrow="Sobre nós"
        title="Uma nova perspectiva de cuidar."
        lead="A Clínica Marques dos Santos nasceu em Castelo Branco para juntar, num só espaço, fisioterapia, osteopatia, reabilitação perineal e estética, podoposturologia, terapia da fala e psicologia — com uma regra simples: cada pessoa merece tempo, rigor e um plano à medida."
      />
      <About />
      <section className="bg-mist py-24 lg:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <h2 className="text-display text-3xl text-ink sm:text-4xl">
              Três valores, zero exceções.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.08}>
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-2xl border border-line bg-white p-8 shadow-soft">
                  <span className="text-display text-4xl text-gold-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <TeamSection limit={3} />
      <Technology />
      <FinalCta />
    </>
  );
}
