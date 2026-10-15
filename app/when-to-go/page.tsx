import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { season } from "@/config/season";
import { months } from "@/data/months";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "When to go to Antarctica",
  description: "A month-by-month guide to the Antarctic season, November to March: snow, penguin chicks, long days and peak whale season.",
  path: "/when-to-go",
});

export default function WhenToGoPage() {
  return (
    <>
      <PageHero label={`Season · ${season.label}`} lines={["follow", "the light"]} intro="The Antarctic season is short and every month has its own character: pristine snow, fluffy chicks or breaching whales." />
      <section className="bg-ink pb-[6rem] text-ice">
        <ol>
          {months.map((m, i) => (
            <li key={m.month} className="border-t border-ice/15 py-[4rem]">
              <div className="container-site grid-site gap-y-[2rem]">
                <div className="col-span-12 lg:col-span-5">
                  <p className="t-mono opacity-60">{String(i + 1).padStart(2, "0")} / {String(months.length).padStart(2, "0")}</p>
                  <h2 className="t-giant mt-[0.8rem]">{m.month}</h2>
                  <p className="t-h3 mt-[1.2rem]">{m.headline}</p>
                </div>
                <Reveal className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-7">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[0.3rem]">
                    <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <dl className="space-y-[1rem]">
                    <div><dt className="t-mono opacity-60">Daylight</dt><dd className="t-small mt-[0.2rem]">{m.daylight}</dd></div>
                    <div><dt className="t-mono opacity-60">Temperature</dt><dd className="t-small mt-[0.2rem]">{m.temp}</dd></div>
                    <div>
                      <dt className="t-mono opacity-60">Wildlife</dt>
                      <dd className="mt-[0.2rem]"><ul>{m.wildlife.map((w) => <li key={w} className="t-small">— {w}</li>)}</ul></dd>
                    </div>
                  </dl>
                  <div className="t-small mt-[1.2rem] space-y-[0.8em] opacity-80">{m.body.split("\n\n").map((p, k) => <p key={k}>{p}</p>)}</div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="container-site"><VerifyNote className="mt-[2rem]">{season.note}</VerifyNote></div>
      </section>
      <CtaBand lines={["pick", "your month"]} />
    </>
  );
}
