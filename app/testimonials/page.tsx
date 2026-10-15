import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Testimonials", description: "What travellers say after coming home from Antarctica.", path: "/testimonials" });

export default function TestimonialsPage() {
  return (
    <>
      <PageHero label="Testimonials" lines={["back on", "dry land"]} intro="Placeholder reviews for layout only. Replace with real, verified guest testimonials before launch." />
      <section className="bg-ink pb-[8rem] text-ice">
        <div className="container-site">
          <ul>
            {testimonials.map((t, i) => (
              <li key={i} className="grid-site gap-y-[1.5rem] border-t border-ice/15 py-[3.5rem]">
                <div className="col-span-12 lg:col-span-3">
                  <span className="t-mono bg-orange px-[0.25rem] text-ink">Placeholder</span>
                  <p className="t-mono mt-[1rem]">{t.name}</p>
                  <p className="t-mono opacity-60">{t.trip} · {t.year}</p>
                </div>
                <Reveal className="col-span-12 lg:col-span-9">
                  <blockquote className="t-h2 indent-space">“{t.quote}”</blockquote>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
