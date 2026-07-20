"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Clock, Sparkles, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LogoArtwork } from "@/components/ui/Logo";
import { clinic } from "@/content/clinic";
import { EASE_CALM } from "@/lib/motion";

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_CALM, delay },
});

function FloatingCard({
  className,
  delay,
  drift,
  children,
}: {
  className?: string;
  delay: number;
  drift?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      {...entrance(delay)}
      className={`glass pointer-events-auto absolute rounded-2xl px-5 py-4 shadow-lift ${
        drift ? "animate-drift" : ""
      } ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero-field relative flex items-center overflow-hidden lg:min-h-svh">
      {/* Fotografia ambiente do espaço, desfocada em textura de luz */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/estudio-pilates.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
      </div>

      {/* Halo suave a respirar — substitui vídeo/WebGL com custo quase nulo */}
      {!reduce && (
        <div
          aria-hidden
          className="animate-breathe absolute -top-32 right-[-10%] size-[42rem] rounded-full bg-gold-100/50 blur-3xl"
        />
      )}

      <div className="container-site relative z-10 grid items-center gap-16 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-16 lg:pt-24">
        <div className="max-w-xl">
          <motion.p
            {...entrance(0.05)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-sm text-slate"
          >
            <span className="size-1.5 rounded-full bg-sage-600" aria-hidden />
            Fisioterapia, Osteopatia e outras especialidades médicas
          </motion.p>

          <motion.h1
            {...entrance(0.15)}
            className="text-display text-balance-pretty text-[2.5rem] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Uma nova perspectiva{" "}
            <span className="text-brand-accent text-gold-600">de cuidar.</span>
          </motion.h1>

          <motion.p
            {...entrance(0.28)}
            className="mt-7 max-w-md text-lg leading-relaxed text-slate"
          >
            Em Castelo Branco, mais de vinte consultas de especialidade e
            serviços num só espaço. Avaliação rigorosa, tempo só para si e um
            plano feito à medida — do primeiro dia à última sessão.
          </motion.p>

          <motion.div {...entrance(0.4)} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/marcar" size="lg">
              Marcar Consulta
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/sobre" variant="secondary" size="lg">
              Conhecer a Clínica
            </ButtonLink>
          </motion.div>

          <motion.p {...entrance(0.55)} className="mt-8 text-sm text-muted">
            Médico fisiatra na clínica · Reembolsos ADSE, SAMS e outros seguros de saúde
          </motion.p>
        </div>

        {/* Composição visual: painel sereno + floating cards (tablet e desktop) */}
        <div className="pointer-events-none relative mx-auto hidden aspect-[4/5] w-full max-w-sm sm:block lg:max-h-[34rem] lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_CALM, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/70 bg-[linear-gradient(160deg,#a3833b_0%,#c6ab5a_45%,#d9c773_100%)] shadow-lift"
          >
            <LogoArtwork className="w-[82%] -translate-y-2" />
          </motion.div>

          <FloatingCard className="left-[-3rem] top-16" delay={0.7} drift>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Star className="size-5 fill-current" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-ink">
                  {clinic.metrics.rating.toLocaleString("pt-PT")}
                </p>
                <p className="text-xs text-muted">{clinic.metrics.reviews} avaliações</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="right-[-2rem] top-[45%]" delay={0.85} drift>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-ink">7</p>
                <p className="text-xs text-muted">valências clínicas</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bottom-6 left-[-2.5rem]" delay={1}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
                <Clock className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-ink">
                  {clinic.metrics.responseMinutes} min
                </p>
                <p className="text-xs text-muted">tempo médio de resposta</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>

      {/* Indicador de scroll */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          aria-hidden
        >
          <div className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
            <motion.div
              className="size-1 rounded-full bg-slate"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
