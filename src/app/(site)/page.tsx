import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SpecialtiesGrid } from "@/components/sections/SpecialtiesGrid";
import { TeamSection } from "@/components/sections/TeamSection";
import { TreatmentsSection } from "@/components/sections/TreatmentsSection";
import { Technology } from "@/components/sections/Technology";
import { CasesSection } from "@/components/sections/CasesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqSchema, jsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SpecialtiesGrid limit={6} />
      <TeamSection limit={3} />
      <TreatmentsSection />
      <Technology />
      <CasesSection limit={2} />
      <Testimonials />
      <FaqSection />
      <BlogPreview />
      <ContactSection />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema())} />
    </>
  );
}
