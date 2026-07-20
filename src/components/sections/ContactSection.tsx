import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { clinic } from "@/content/clinic";

const details: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: MapPin,
    label: "Morada",
    value: `${clinic.address.street}, ${clinic.address.postalCode} ${clinic.address.locality}`,
  },
  { icon: Phone, label: "Telefone", value: clinic.phone, href: `tel:${clinic.phoneHref}` },
  { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
  {
    icon: Clock,
    label: "Horário",
    value: clinic.openingHours.map((o) => `${o.days}: ${o.hours}`).join(" · "),
  },
];

export function ContactSection() {
  return (
    <section id="contacto" className="bg-mist py-24 lg:py-36">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contacto"
          title="Fale connosco. Respondemos em minutos."
          lead="Prefere marcar diretamente? Use a marcação online. Para tudo o resto, este formulário chega à Carla — e a Carla responde depressa."
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-5">
            <ul className="space-y-4">
              {details.map((d) => (
                <li
                  key={d.label}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                    <d.icon className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-0.5 block text-sm text-slate transition-colors hover:text-azure-600"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm leading-relaxed text-slate">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Mapa — placeholder elegante e leve; sem iframes de terceiros a pesar o LCP */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div
                className="h-56 w-full bg-[radial-gradient(24rem_12rem_at_50%_50%,rgb(220_235_250/.8),transparent),linear-gradient(#f7f9fb,#eef2f6)]"
                aria-hidden
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex size-4">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-azure-500/40" />
                    <span className="relative inline-flex size-4 rounded-full border-2 border-white bg-azure-600 shadow-soft" />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-line px-6 py-4">
                <p className="text-sm text-slate">Av. da República · Metro Saldanha</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${clinic.name}, ${clinic.address.street}, ${clinic.address.locality}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-azure-600 transition-colors hover:text-azure-700"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
