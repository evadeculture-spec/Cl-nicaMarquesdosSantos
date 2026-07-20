import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { clinic } from "@/content/clinic";
import { jsonLd, medicalBusinessSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Acento editorial da marca — itálico serifado como nos materiais do Instagram
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.url),
  title: {
    default: `${clinic.name} — Fisioterapia e Osteopatia em Castelo Branco`,
    template: `%s · ${clinic.name}`,
  },
  description: clinic.description,
  keywords: [
    "fisioterapia Castelo Branco",
    "osteopatia Castelo Branco",
    "reabilitação perineal",
    "reabilitação estética",
    "podoposturologia",
    "terapia da fala",
    "psicologia Castelo Branco",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: clinic.url,
    siteName: clinic.name,
    title: `${clinic.name} — Fisioterapia e Osteopatia em Castelo Branco`,
    description: clinic.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} — Fisioterapia e Osteopatia em Castelo Branco`,
    description: clinic.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
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
    <html lang="pt-PT" className={`${inter.variable} ${cormorant.variable}`}>
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
