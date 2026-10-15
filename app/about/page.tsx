import Image from "next/image";
import { DiscoverCounters } from "@/components/home/DiscoverCounters";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { expeditions } from "@/data/expeditions";
import { img } from "@/data/images";
import { ships } from "@/data/ships";
import { timeline } from "@/data/timeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About us",
  description: "Seventh Continent is an independent Antarctica specialist. One polar specialist plans your journey with IAATO-member operators.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" lines={["one", "specialist,", "one continent"]} intro="We do one thing: Antarctica. Not cruises in general, not the Arctic on the side. Just the White Continent, and getting you there on the voyage that fits." />
      <section className="bg-glacier">
        <div className="relative mx-[0.6rem] h-[70vh] min-h-[26rem] overflow-hidden rounded-[1.2rem]">
          <Image src={img.redParka} alt="A traveller in a red parka on a snow summit" fill sizes="100vw" className="object-cover" />
        </div>
      </section>
      <ParagraphBlock
        lead="We don't operate ships. We match people with them. That independence is the whole idea: our advice follows your priorities, not a fleet we need to fill."
        side="How it works"
        body={
          <>
            <p>
              Every traveller gets one dedicated polar specialist, from the first message to the moment you step back onto dry land.
              They know the ships, the operators, the landing sites and the months, and they&apos;ll tell you when a cheaper cabin or
              a different week is the smarter choice.
            </p>
            <p>
              We sell voyages operated by partner members of IAATO, the International Association of Antarctica Tour Operators, and
              we brief every guest on visitor guidelines before departure. Bookings are made with the operating company under its
              terms; we stay with you throughout. (Team bios and company details: placeholders to complete before launch.)
            </p>
          </>
        }
      />
      <DiscoverCounters
        items={[
          { label: "Expeditions", count: expeditions.length, href: "/expeditions", image: img.icebergsReflect, alt: "Icebergs in still water" },
          { label: "Ships", count: ships.length, href: "/ships", image: img.shipDark, alt: "An expedition-style ship" },
          { label: "Timeline", count: timeline.length, href: "/timeline", image: img.nightPeaks, alt: "Peaks under a starry sky" },
        ]}
      />
      <CtaBand />
    </>
  );
}
