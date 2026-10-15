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
      {/* Hero testimonial (reference cause hero) */}
      <section className="bg-glacier">
        <div className="container-site pt-[8.5rem] pb-[4rem] md:pt-[11rem]">
          <p className="t-label text-slate">Protect</p>
          <div className="mt-[1.5rem] grid-site">
            <div className="col-span-12 lg:col-span-10">
              <h1 className="t-h2 md:text-[3.4rem]">
                “We visit as guests. Antarctica sets the rules. Every landing we plan is shaped by{" "}
                <span className="underline decoration-orange decoration-[0.08em] underline-offset-[0.12em]">the Antarctic Treaty</span> and IAATO&apos;s
                guidelines, so the continent looks the same after we leave as it did when we arrived.”
              </h1>
              <div className="mt-[2.5rem] flex items-center gap-[1rem]">
                <div className="flex -space-x-[0.6rem]">
                  <span className="grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full bg-navy font-mono text-[0.6rem] uppercase text-glacier ring-4 ring-glacier">IAATO*</span>
                  <span className="relative h-[3.4rem] w-[3.4rem] overflow-hidden rounded-full ring-4 ring-glacier">
                    <Image src={img.redParka} alt="Portrait placeholder" fill sizes="4rem" className="object-cover" />
                  </span>
                </div>
                <div>
                  <p className="font-medium uppercase">Name to come</p>
                  <p className="text-[0.85rem] text-slate">Head of Polar Operations (placeholder)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[75vh] min-h-[28rem] overflow-hidden">
          <Image src={img.penguinsSnow} alt="Penguins on snow, observed from a respectful distance" fill sizes="100vw" className="object-cover" />
          <div className="container-site absolute inset-x-0 bottom-[2rem]">
            <WaveCards items={protectFacts.map((f) => f.text)} tone="dark" />
          </div>
        </div>
      </section>

      {/* About block */}
      <section className="bg-glacier py-[7rem]">
        <div className="container-site grid-site items-end gap-y-[2rem]">
          <p className="t-h3 col-span-12 lg:col-span-3">About IAATO</p>
          <Reveal className="col-span-12 lg:col-span-9">
            <p className="t-large">
              The International Association of Antarctica Tour Operators was founded in 1991 to advocate and promote safe and
              environmentally responsible travel to Antarctica. Members agree to visitor guidelines covering landings, wildlife,
              biosecurity and site management. We only sell voyages operated by IAATO members, and we brief every guest before they
              go. (Verify membership details and current guidelines with IAATO before launch.)
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image strip */}
      <section className="bg-glacier">
        <div className="grid grid-cols-3 gap-[0.6rem] px-[0.6rem]">
          {[
            { src: img.snowflake, alt: "A single snowflake: biosecurity starts small" },
            { src: img.glacier, alt: "A glacier, an archive of climate" },
            { src: img.gentooRock, alt: "A gentoo penguin observed at a distance" },
          ].map((im) => (
            <div key={im.src} className="relative aspect-[3/4] overflow-hidden rounded-[1rem] md:aspect-[4/5]">
              <Image src={im.src} alt={im.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Missions + paragraph */}
      <section className="bg-glacier py-[7rem]">
        <div className="container-site grid-site gap-y-[3rem]">
          <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-2">
            <h2 className="t-h3">How we travel</h2>
            <ul className="mt-[1.2rem] space-y-[0.2rem]">
              {commitments.map((c) => (
                <li key={c} className="border-b border-rule py-[0.45rem] text-[1.05rem] font-medium uppercase leading-[1.15]">{c}</li>
              ))}
            </ul>
            <VerifyNote className="mt-[1rem]">* IAATO limits — verify current rules with IAATO before launch.</VerifyNote>
          </div>
          <div className="col-span-12 space-y-[1.2rem] text-[1.05rem] leading-[1.6] text-slate md:col-span-7 lg:col-span-6 lg:col-start-7">
            <h2 className="t-h3 text-navy">The Antarctic Treaty</h2>
            <p>
              Signed in Washington on 1 December 1959 by twelve nations and in force since 23 June 1961, the Antarctic Treaty
              sets the continent aside for peace and science. The 1991 Protocol on Environmental Protection (the Madrid Protocol)
              designates Antarctica a natural reserve and prohibits mineral resource activities other than scientific research.
            </p>
            <h2 className="t-h3 text-navy">Biosecurity</h2>
            <p>
              Seeds, soil and microbes hitch rides on boots, velcro and camera bags. Before landings you&apos;ll vacuum outer
              layers and disinfect boots, and nothing but footprints is left ashore. It is slow, and it matters.
            </p>
            <h2 className="t-h3 text-navy">Wildlife</h2>
            <p>
              Keep your distance (IAATO guidance is typically at least 5 m from penguins and more for seals; verify), let animals
              keep right of way, stay low and quiet, and never feed or touch.
            </p>
            <h2 className="t-h3 text-navy">Climate &amp; ice science</h2>
            <p>
              Antarctica holds about 90% of the world&apos;s ice. Many voyages host citizen-science projects, from cloud
              observations to phytoplankton sampling. We favour itineraries that support science, and help you understand the
              footprint of your trip and how to reduce it.
            </p>
            <div className="pt-[0.6rem]">
              <Pill href="https://iaato.org/visiting-antarctica/visitor-guidelines/" variant="dark">Read IAATO visitor guidelines</Pill>
            </div>
          </div>
        </div>
      </section>
      <CtaBand lines={["travel", "lightly"]} text="Ask us which operators carry citizen-science programmes and how each one approaches its footprint." />
    </>
  );
}
