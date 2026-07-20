import { CalendarCheck, LineChart, MessageCircleHeart, ScanLine } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  {
    icon: ScanLine,
    title: "Avaliação com dados objetivos",
    text: "Dinamometria, testes de salto e análise de movimento. Medimos antes, durante e depois — a evolução deixa de ser uma opinião.",
  },
  {
    icon: LineChart,
    title: "Relatórios de progresso",
    text: "A cada 4 sessões recebe um relatório claro na sua área de paciente: onde estava, onde está, o que falta.",
  },
  {
    icon: CalendarCheck,
    title: "Marcação online em 60 segundos",
    text: "Escolha o profissional, o tratamento e a hora. Confirmação automática por email e lembrete no dia anterior.",
  },
  {
    icon: MessageCircleHeart,
    title: "Assistente digital",
    text: "Tire dúvidas a qualquer hora e faça uma triagem inicial dos seus sintomas antes mesmo da primeira consulta.",
  },
];

export function Technology() {
  return (
    <section id="tecnologia" className="container-site py-24 lg:py-36">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Tecnologia"
            title="Tecnologia ao serviço do cuidado — nunca o contrário."
            lead="Usamos dados e ferramentas digitais para uma coisa apenas: tornar o seu tratamento mais preciso, mais transparente e mais cómodo."
          />
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift">
                <span className="flex size-11 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Reveal className="mt-20 rounded-2xl border border-line bg-mist p-8 text-center lg:p-10">
        <p className="mx-auto max-w-2xl text-balance-pretty text-lg text-slate">
          E quando a tecnologia não acrescenta nada, guardamo-la na gaveta.
          O centro da sessão é sempre o mesmo:{" "}
          <span className="font-medium text-ink">as suas mãos nas nossas.</span>
        </p>
      </Reveal>
    </section>
  );
}
