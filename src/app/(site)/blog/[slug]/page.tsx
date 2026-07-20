import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { Badge } from "@/components/ui/Badge";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPost, posts } from "@/content/posts";
import { articleSchema, jsonLd } from "@/lib/seo";
import { formatDatePt } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <article className="hero-field border-b border-line pb-24 pt-36 lg:pt-44">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Voltar ao blog
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">{post.category}</Badge>
              <span className="text-sm text-muted">
                <time dateTime={post.date}>{formatDatePt(post.date)}</time> ·{" "}
                {post.readingMinutes} min de leitura
              </span>
            </div>
            <h1 className="text-display text-balance-pretty mt-6 text-3xl text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate">{post.excerpt}</p>
            <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
              Por <span className="font-medium text-ink">{post.author}</span> ·
              Fisioterapeuta, Clínica Marques dos Santos
            </p>
          </Reveal>
        </div>
      </article>

      <div className="container-site py-16 lg:py-24">
        <div className="mx-auto max-w-2xl space-y-7">
          {post.body.map((paragraph, i) => (
            <Reveal key={i} variant="fade">
              <p className="text-[1.0625rem] leading-[1.85] text-slate">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema(post))}
      />
    </>
  );
}
