import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { clinic } from "@/content/clinic";
import { specialties } from "@/content/specialties";

const columns = [
  {
    title: "Clínica",
    links: [
      { href: "/sobre", label: "Sobre nós" },
      { href: "/equipa", label: "A equipa" },
      { href: "/tecnologia", label: "Tecnologia" },
      { href: "/casos-clinicos", label: "Casos clínicos" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Especialidades",
    links: specialties.slice(0, 6).map((s) => ({
      href: `/especialidades/${s.slug}`,
      label: s.name,
    })),
  },
  {
    title: "Pacientes",
    links: [
      { href: "/marcar", label: "Marcar consulta" },
      { href: "/login", label: "Área do paciente" },
      { href: "/tratamentos", label: "Preços e tratamentos" },
      { href: "/faq", label: "Perguntas frequentes" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
            >
              <LogoMark className="size-7" />
              {clinic.shortName}
            </Link>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">
              Fisioterapia, osteopatia e outras especialidades médicas
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              {clinic.tagline} Em Castelo Branco, com uma regra que nunca
              muda: uma pessoa, um profissional, todo o tempo necessário.
            </p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-slate">
              <p>{clinic.address.street}</p>
              <p>
                {clinic.address.postalCode} {clinic.address.locality}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${clinic.phoneHref}`}
                  className="text-gold-600 transition-colors hover:text-gold-700"
                >
                  {clinic.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${clinic.email}`}
                  className="text-gold-600 transition-colors hover:text-gold-700"
                >
                  {clinic.email}
                </a>
              </p>
            </address>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}. Todos os direitos
            reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacidade" className="transition-colors hover:text-ink">
              Privacidade
            </Link>
            <Link href="/termos" className="transition-colors hover:text-ink">
              Termos
            </Link>
            <a
              href="https://www.livroreclamacoes.pt"
              rel="noopener noreferrer"
              target="_blank"
              className="transition-colors hover:text-ink"
            >
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
