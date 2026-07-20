import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/content/posts";
import { faqs } from "@/content/faqs";
import { testimonials } from "@/content/testimonials";
import { clinicalCases } from "@/content/cases";
import { formatDatePt } from "@/lib/utils";

const inventory = [
  { label: "Artigos de blog", count: posts.length },
  { label: "Perguntas frequentes", count: faqs.length },
  { label: "Testemunhos", count: testimonials.length },
  { label: "Casos clínicos", count: clinicalCases.length },
];

export default function AdminConteudos() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-ink">Gestão de conteúdos</h1>
        <p className="mt-2 text-slate">
          Blog, FAQ, testemunhos e casos clínicos. Em produção, esta gestão vive no Supabase com publicação instantânea.
        </p>
      </div>

      <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {inventory.map((i) => (
          <Card key={i.label} hover={false}>
            <dd className="text-display text-3xl text-ink">{i.count}</dd>
            <dt className="mt-1 text-sm text-muted">{i.label}</dt>
          </Card>
        ))}
      </dl>

      <Card hover={false}>
        <h2 className="font-semibold tracking-tight text-ink">Artigos publicados</h2>
        <ul className="mt-4 divide-y divide-line">
          {posts.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div>
                <p className="text-sm font-medium text-ink">{p.title}</p>
                <p className="text-xs text-muted">
                  {p.author} · {formatDatePt(p.date)}
                </p>
              </div>
              <Badge tone="sage">Publicado</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
