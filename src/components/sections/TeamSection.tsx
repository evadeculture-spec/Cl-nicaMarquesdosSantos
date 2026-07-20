import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { team } from "@/content/team";
import { cn } from "@/lib/utils";

const photos = [
  { src: "/images/equipa-grupo.jpg", alt: "A equipa da Clínica Marques dos Santos", width: 402, height: 382 },
  { src: "/images/equipa-tres.jpg", alt: "Profissionais da clínica", width: 404, height: 234 },
  { src: "/images/estudio-pilates.jpg", alt: "Estúdio de pilates clínico da clínica", width: 402, height: 385 },
];

export function TeamSection({
  limit,
  showPhotos = true,
}: {
  limit?: number;
  /** Desligar quando a página já mostra a fotografia da equipa no cabeçalho. */
  showPhotos?: boolean;
}) {
  const members = limit ? team.slice(0, limit) : team;

  return (
    <section id="equipa" className="container-site py-24 lg:py-36">
      <SectionHeading
        eyebrow="A equipa"
        title="Pessoas que sabem o nome de cada paciente."
        lead="Profissionais especializados em cada valência, anos de prática e — tão importante quanto isso — tempo para si. Conheça quem vai cuidar do seu caso."
      />

      {/* Fotografias reais da clínica (Instagram @clinicamarquesdossantos) */}
      {showPhotos && (
        <>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-3" stagger={0.1}>
            {photos.map((p, i) => (
              <StaggerItem key={p.src} className={cn(i === 1 && "sm:mt-10")}>
                <figure className="group overflow-hidden rounded-2xl border border-line shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="h-56 w-full object-cover object-[center_30%] transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.03]"
                  />
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal variant="fade">
            <p className="mt-4 text-center text-xs text-muted">
              A nossa equipa e o nosso espaço, em Castelo Branco.
            </p>
          </Reveal>
        </>
      )}

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {members.map((m) => (
          <StaggerItem key={m.id}>
            <article className="group h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold tracking-tight transition-transform duration-500 group-hover:scale-105",
                    m.accent === "gold"
                      ? "bg-gold-50 text-gold-700"
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
