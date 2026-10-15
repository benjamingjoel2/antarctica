import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { faqs } from "@/data/faqs";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Antarctica travel FAQ",
  description: "Getting to Ushuaia and Punta Arenas, the Drake Passage, seasickness, IAATO landing rules, cabins, insurance, packing and environmental rules.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero tone="light" label={`FAQ (${faqs.length})`} lines={["good", "questions"]} intro="The things everyone asks before going south. Rules and requirements change, so every answer is marked for verification with our partner operators and IAATO." />
      <section className="bg-ice pb-[8rem] pt-[2rem] text-ink">
        <div className="container-site">
          <FaqList faqs={faqs} />
        </div>
      </section>
      <CtaBand lines={["still", "wondering?"]} label="Ask a specialist" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
