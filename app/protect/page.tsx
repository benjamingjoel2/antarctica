import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { WaveCards } from "@/components/ui/WaveCards";
import { protectFacts } from "@/data/facts";
import { img } from "@/data/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Protect Antarctica",
  description: "How we travel responsibly: IAATO visitor guidelines, the Antarctic Treaty, biosecurity, wildlife distances and climate science.",
  path: "/protect",
  image: img.gentooRock,
});

const commitments = [
  "Biosecurity before every landing",
  "Wildlife distances respected*",
  "No more than 100 ashore at once*",
  "One ship per landing site*",
  "Leave nothing behind",
  "Take nothing away",
  "Citizen science on board",
  "Carbon-aware trip planning",
  "Supporting climate & ice science",
  "Respect for the Treaty",
];

export default function ProtectPage() {
  return (
    <>
      {/* Reference cause hero: full-bleed photo, testimonial over it, wave bars at the foot */}
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <Image src={img.penguinsSnow} alt="Penguins on snow, watched from a respectful distance" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="container-site relative grid-site pt-[22vh]">
          <div className="col-span-12 md:pl-[7.5rem] lg:col-span-10">
            <h1 className="t-h2">
              We visit as guests, and Antarctica sets the rules. Every landing we plan is shaped by{" "}
              <span className="underline underline-offset-[0.15em]">the Antarctic Treaty</span> and IAATO&apos;s guidelines, so the continent
              looks the same after we leave as it did when we arrived.
            </h1>
            <div className="mt-[2.5rem] flex items-center gap-[0.6rem]">
              <span className="t-mono grid h-[2.6rem] w-[2.6rem] place-items-center bg-ice text-[0.8rem] text-ink">IAATO*</span>
              <span className="relative h-[2.6rem] w-[2.6rem] overflow-hidden">
                <Image src={img.redParka} alt="Portrait placeholder" fill sizes="3rem" className="object-cover" />
              </span>
              <span className="ml-[0.4rem] text-[0.8rem] leading-[1.2]">
                Name to come
                <br />
                <span className="opacity-70">Head of Polar Operations (placeholder)</span>
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <WaveCards items={protectFacts.map((f) => f.text)} tone="dark" />
        </div>
      </section>

      <section className="relative h-[90vh] min-h-[28rem] overflow-hidden">
        <Image src={img.gentooRock} alt="A gentoo penguin on rock" fill sizes="100vw" className="object-cover" />
      </section>

      <section className="bg-ink text-ice">
        <div className="container-site grid-site items-end gap-y-[1.5rem] py-[8rem]">
          <p className="t-small col-span-12 lg:col-span-3">About IAATO</p>
          <Reveal className="col-span-12 lg:col-span-9">
            <p className="t-h3">
              The International Association of Antarctica Tour Operators was founded in 1991 to advocate and promote safe and
              environmentally responsible travel to Antarctica. Members follow visitor guidelines covering landings, wildlife,
              biosecurity and site management. We only sell voyages run by IAATO members, and we brief every guest before they go.
              (Verify membership details and current guidelines with IAATO before launch.)
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-3">
          {[
            { src: img.snowflake, alt: "A single snowflake: biosecurity starts small" },
            { src: img.glacier, alt: "A glacier, an archive of climate" },
            { src: img.kingPenguins, alt: "King penguins at a distance" },
          ].map((im) => (
            <div key={im.src} className="relative h-[24rem] overflow-hidden">
              <Image src={im.src} alt={im.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="container-site grid-site gap-y-[3rem] py-[8rem]">
          <div className="col-span-12 md:col-span-5 lg:col-span-3 lg:col-start-3">
            <h2 className="t-h3">How we travel</h2>
            <ul className="mt-[1.4rem] space-y-[0.15rem]">
              {commitments.map((c) => (
                <li key={c} className="t-mono">{c}</li>
              ))}
            </ul>
            <VerifyNote className="mt-[1.2rem]">* IAATO limits — verify current rules with IAATO</VerifyNote>
          </div>
          <div className="t-small col-span-12 space-y-[1.2em] opacity-90 md:col-span-7 lg:col-span-4 lg:col-start-7">
            <p>
              <strong className="font-medium">The Antarctic Treaty.</strong> Signed in Washington on 1 December 1959 by twelve nations and in force
              since 23 June 1961, it sets the continent aside for peace and science. The 1991 Protocol on Environmental Protection
              (the Madrid Protocol) designates Antarctica a natural reserve and prohibits mineral resource activities other than
              scientific research.
            </p>
            <p>
              <strong className="font-medium">Biosecurity.</strong> Seeds, soil and microbes hitch rides on boots, Velcro and camera bags. Before
              landings you&apos;ll vacuum outer layers and disinfect boots, and nothing but footprints is left ashore.
            </p>
            <p>
              <strong className="font-medium">Wildlife.</strong> Keep your distance (IAATO guidance is typically at least 5 m from penguins and
              more for seals; verify), give animals right of way, stay low and quiet, and never feed or touch.
            </p>
            <p>
              <strong className="font-medium">Climate &amp; ice science.</strong> Antarctica holds about 90% of the world&apos;s ice. Many voyages
              host citizen-science projects; we favour itineraries that support research and help you understand and reduce your
              trip&apos;s footprint.
            </p>
            <Pill href="https://iaato.org/visiting-antarctica/visitor-guidelines/">Read IAATO visitor guidelines</Pill>
          </div>
        </div>
      </section>
      <CtaBand lines={["travel", "lightly"]} text="Ask us which operators carry citizen-science programmes and how each one approaches its footprint." />
    </>
  );
}
