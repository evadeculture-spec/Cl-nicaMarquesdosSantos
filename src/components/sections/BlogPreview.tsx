import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/content/posts";
import { formatDatePt } from "@/lib/utils";

export function BlogPreview() {
  return (
    <section id="blog" className="container-site py-24 lg:py-36">
      <SectionHeading
        eyebrow="Blog"
        title="Conhecimento que também trata."
        lead="Artigos escritos pela equipa clínica — sem sensacionalismo, com evidência e em português claro."
      />
      <Stagger className="mt-16 grid gap-5 md:grid-cols-3" stagger={0.08}>
        {posts.map((post) => (
          <StaggerItem key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:border-gold-200/70 hover:shadow-lift"
            >
              <div className="flex items-center gap-3 text-xs text-muted">
                <Badge tone="gold">{post.category}</Badge>
                <span>{post.readingMinutes} min de leitura</span>
              </div>
              <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug tracking-tight text-ink">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-sm">
                <time dateTime={post.date} className="text-muted">
                  {formatDatePt(post.date)}
                </time>
                <span className="flex items-center gap-1 font-medium text-gold-600">
                  Ler
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
