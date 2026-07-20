import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="hero-field flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">Erro 404</p>
      <h1 className="text-display mt-4 text-4xl text-ink sm:text-5xl">
        Esta página fez alongamentos e saiu.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
        O endereço que procura não existe ou mudou de lugar. O resto do site
        está exatamente onde devia estar.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-13 items-center gap-2 rounded-full bg-gold-600 px-8 font-medium text-white shadow-soft transition-all duration-300 hover:bg-gold-700 hover:shadow-lift"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar ao início
      </Link>
    </main>
  );
}
