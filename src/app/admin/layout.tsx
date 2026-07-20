import Link from "next/link";
import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoMark } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Painel de gestão",
  robots: { index: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh bg-mist">
      <header className="border-b border-line bg-white">
        <div className="container-site flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold tracking-tight text-ink"
            >
              <LogoMark className="size-6" />
              Marques dos Santos
            </Link>
            <Badge tone="gold">Admin</Badge>
          </div>
          <Link href="/" className="text-sm text-slate transition-colors hover:text-ink">
            Voltar ao site
          </Link>
        </div>
      </header>
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[15rem_1fr] lg:py-14">
        <AdminNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
