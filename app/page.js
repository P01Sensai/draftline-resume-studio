import Hero from "@/components/landing/Hero";
import { Ticker, FeatureList } from "@/components/landing/Sections";

export const metadata = {
  title: "Free Resume & Cover Letter Builder",
  description:
    "Build an ATS-friendly resume and cover letter side by side, with a live paper preview. Free, no sign-up, export instantly.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Draftline",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (web-based)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free resume and cover letter builder with a live, side-by-side preview and ATS-friendly templates.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden" style={{ background: "#050507" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Ticker />
      <FeatureList />
    </main>
  );
}
