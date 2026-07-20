import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { team } from "@/content/team";
import { cn } from "@/lib/utils";

export function TeamSection({ limit }: { limit?: number }) {
  const members = limit ? team.slice(0, limit) : team;

  return (
    <section id="equipa" className="container-site py-24 lg:py-36">
      <SectionHeading
        eyebrow="A equipa"
        title="Pessoas que sabem o nome de cada paciente."
        lead="Fisioterapeutas com formação avançada, anos de prática e — tão importante quanto isso — tempo para si. Conheça quem vai cuidar do seu caso."
      />
      <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {members.map((m) => (
          <StaggerItem key={m.id}>
            <article className="group h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold tracking-tight transition-transform duration-500 group-hover:scale-105",
                    m.accent === "azure"
                      ? "bg-azure-50 text-azure-700"
                      : "bg-sage-100 text-sage-700",
                  )}
                  aria-hidden
                >
                  {m.initials}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight text-ink">{m.name}</h3>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate">{m.bio}</p>
              <p className="mt-4 text-xs text-muted">{m.credentials}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.focus.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
