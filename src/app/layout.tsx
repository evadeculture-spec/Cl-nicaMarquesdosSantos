import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { clinic } from "@/content/clinic";
import { jsonLd, medicalBusinessSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.url),
  title: {
    default: `${clinic.name} — Fisioterapia em Lisboa`,
    template: `%s · ${clinic.name}`,
  },
  description: clinic.description,
  keywords: [
    "fisioterapia Lisboa",
    "fisioterapeuta",
    "dor lombar",
    "dor cervical",
    "lesões desportivas",
    "osteopatia",
    "pilates clínico",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: clinic.url,
    siteName: clinic.name,
    title: `${clinic.name} — Fisioterapia em Lisboa`,
    description: clinic.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} — Fisioterapia em Lisboa`,
    description: clinic.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <body className="min-h-svh font-sans antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink focus:shadow-lift"
        >
          Saltar para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(medicalBusinessSchema())}
        />
      </body>
    </html>
  );
}
