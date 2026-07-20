import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { clinic } from "@/content/clinic";

export function FinalCta() {
  return (
    <section className="container-site py-24 lg:py-36">
      <Reveal>
        <div className="hero-field relative overflow-hidden rounded-[2.5rem] border border-line px-8 py-20 text-center shadow-soft lg:py-28">
          <h2 className="text-display text-balance-pretty mx-auto max-w-2xl text-3xl text-ink sm:text-5xl">
            A dor não tem de fazer parte{" "}
            <span className="text-brand-accent text-gold-600">do seu dia.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-slate">
            Marque a sua avaliação inicial. Uma hora inteira, um plano claro, e
            a resposta chega em {clinic.metrics.responseMinutes} minutos.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/marcar" size="lg">
              Marcar Consulta
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={`tel:${clinic.phoneHref}`} variant="secondary" size="lg">
              Ligar {clinic.phone}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
