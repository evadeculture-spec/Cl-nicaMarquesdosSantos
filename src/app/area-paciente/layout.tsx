import Link from "next/link";
import type { Metadata } from "next";
import { PatientNav } from "@/components/patient/PatientNav";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Área do paciente",
  robots: { index: false },
};

export default function PatientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-mist">
      <header className="border-b border-line bg-white">
        <div className="container-site flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight text-ink"
          >
            <LogoMark className="size-6" />
            Marques dos Santos
          </Link>
          <Link
            href="/"
            className="text-sm text-slate transition-colors hover:text-ink"
          >
            Voltar ao site
          </Link>
        </div>
      </header>
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[15rem_1fr] lg:py-14">
        <PatientNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
