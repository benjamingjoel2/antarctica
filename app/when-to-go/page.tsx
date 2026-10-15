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
      <PageHero label={`Season · ${season.label}`} lines={["follow", "the", "light"]} intro="The Antarctic season is short and every month has its own character. Here's how the summer unfolds, so you can choose between pristine snow, fluffy chicks and breaching whales." />
      <section className="bg-glacier pb-[6rem]">
        <ol className="border-t border-rule">
          {months.map((m, i) => (
            <li key={m.month} className="border-b border-rule py-[3rem] md:py-[4.5rem]">
              <div className="container-site grid-site gap-y-[2rem]">
                <div className="col-span-12 lg:col-span-5">
                  <p className="font-mono text-[0.8rem] text-slate">{String(i + 1).padStart(2, "0")} / {String(months.length).padStart(2, "0")}</p>
                  <h2 className="t-split mt-[0.5rem] text-[clamp(3.6rem,10vw,8rem)]">{m.month.toLowerCase()}</h2>
                  <p className="mt-[1rem] t-large">{m.headline}</p>
                </div>
                <Reveal className="col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-7">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
                    <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <dl className="space-y-[1rem]">
                    <div><dt className="t-label text-slate">Daylight</dt><dd className="mt-[0.2rem] font-medium">{m.daylight}</dd></div>
                    <div><dt className="t-label text-slate">Temperature</dt><dd className="mt-[0.2rem] font-medium">{m.temp}</dd></div>
                    <div>
                      <dt className="t-label text-slate">Wildlife</dt>
                      <dd className="mt-[0.2rem]">
                        <ul className="space-y-[0.2rem]">{m.wildlife.map((w) => <li key={w}>— {w}</li>)}</ul>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-[1.2rem] space-y-[0.8em] text-[0.95rem] leading-[1.55] text-slate">
                    {m.body.split("\n\n").map((p, k) => <p key={k}>{p}</p>)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="container-site">
          <VerifyNote className="mt-[2rem]">{season.note}</VerifyNote>
        </div>
      </section>
      <CtaBand lines={["pick", "your month"]} />
    </>
  );
}
