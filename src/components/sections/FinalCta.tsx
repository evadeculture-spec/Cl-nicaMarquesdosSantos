import { ArrowRight, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Ambient } from "@/components/ui/Ambient";
import { clinic } from "@/content/clinic";

/**
 * Bloco final de conversão: painel dourado da marca sobre fotografia
 * real da clínica — o momento de decisão merece o contraste mais forte
 * de todo o site.
 */
export function FinalCta() {
  return (
    <section className="container-site py-24 lg:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center shadow-lift lg:py-28">
          <Ambient image="/images/tratamento-maos.jpg" veil="gold" />
          <div className="relative">
            <p className="text-brand-accent text-xl text-white/90">
              Uma nova perspectiva de cuidar
            </p>
            <h2 className="text-display text-balance-pretty mx-auto mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              A dor não tem de fazer parte do seu dia.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Marque a sua avaliação inicial. Uma hora inteira, um plano claro,
              e a resposta chega em {clinic.metrics.responseMinutes} minutos.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink
                href="/marcar"
                size="lg"
                className="bg-white text-gold-700 hover:bg-gold-50 hover:text-gold-700"
              >
                Marcar Consulta
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href={`tel:${clinic.phoneHref}`}
                size="lg"
                className="border border-white/40 bg-transparent text-white shadow-none hover:bg-white/10"
              >
                <PhoneCall className="size-4" aria-hidden />
                {clinic.phone}
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-white/70">
              Reembolsos ADSE, SAMS e outros seguros · Desmarcação gratuita até 24h antes
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
