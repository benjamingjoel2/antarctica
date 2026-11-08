import { CtaBand } from "@/components/sections/CtaBand";
import { HorizontalPanels } from "@/components/sections/HorizontalPanels";
import { PageHero } from "@/components/sections/PageHero";
import { ships } from "@/data/ships";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Expedition ships",
  description: "We don't own ships, so we can recommend the right one. Compare partner expedition ships run by IAATO-member operators.",
  path: "/ships",
});

export default function ShipsPage() {
  return (
    <>
      <PageHero
        label={`Ships (${String(ships.length).padStart(2, "0")})`}
        lines={["the right", "ship", "for you"]}
        intro="We don't own a single ship, and that's the point. We work across IAATO-member operators and recommend the vessel that suits you: small and nimble for maximum landings, or larger and more comfortable for the crossing."
      />
      <HorizontalPanels ships={ships} />
      <CtaBand lines={["which ship", "is yours?"]} />
    </>
  );
}
