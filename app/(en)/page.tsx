import { DiscoverCounters } from "@/components/home/DiscoverCounters";
import { DrakeRibbon } from "@/components/home/DrakeRibbon";
import { FullscreenVideo } from "@/components/home/FullscreenVideo";
import { HeroParallax } from "@/components/home/HeroParallax";
import { SailingWith } from "@/components/home/SailingWith";
import { expeditions } from "@/data/expeditions";
import { seasonFacts } from "@/data/facts";
import { img } from "@/data/images";
import { ships } from "@/data/ships";
import { timeline } from "@/data/timeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <HeroParallax />
      <DrakeRibbon />
      <DiscoverCounters
        items={[
          { label: "Expeditions", count: expeditions.length, href: "/expeditions", image: img.icebergsReflect, alt: "Icebergs in still water" },
          { label: "Ships", count: ships.length, href: "/ships", image: img.shipDark, alt: "An expedition-style ship at sea" },
          { label: "Timeline", count: timeline.length, href: "/timeline", image: img.nightPeaks, alt: "Snow peaks under the stars" },
        ]}
      />
      <FullscreenVideo facts={seasonFacts.map((f) => f.text)} />
      <SailingWith ships={ships} />
    </>
  );
}
