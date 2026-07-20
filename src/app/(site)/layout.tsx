import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <AssistantWidget />
      <MobileCta />
    </>
  );
}
