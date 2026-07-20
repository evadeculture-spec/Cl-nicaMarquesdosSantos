import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { specialties } from "@/content/specialties";

export function SpecialtiesGrid({ limit }: { limit?: number }) {
  const items = limit ? specialties.slice(0, limit) : specialties;

  return (
    <section id="especialidades" className="bg-mist py-24 lg:py-36">
      <div className="container-site">
        <SectionHeading
          eyebrow="Especialidades"
          title="Da fisioterapia à psicologia, cuidamos da pessoa inteira."
          lead="Sete valências principais e mais de vinte consultas de especialidade e serviços num só espaço. Escolha a sua — ou fale connosco e ajudamos a perceber por onde começar."
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {items.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/especialidades/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:border-gold-200/70 hover:shadow-lift"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600 transition-colors duration-500 group-hover:bg-gold-100">
                  <SpecialtyIcon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-ink">
                  {s.name}
                  <ArrowUpRight
                    className="size-4 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.short}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
