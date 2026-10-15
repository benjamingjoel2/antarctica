import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Testimonials", description: "What travellers say after coming home from Antarctica.", path: "/testimonials" });

export default function TestimonialsPage() {
  return (
    <>
      <PageHero label="Testimonials" lines={["back", "on dry", "land"]} intro="Placeholder reviews for layout only. Replace with real, verified guest testimonials before launch." />
      <section className="bg-glacier pb-[8rem]">
        <div className="container-site">
          <ul className="border-t border-navy">
            {testimonials.map((t, i) => (
              <li key={i} className="grid-site gap-y-[1.5rem] border-b border-rule py-[3.5rem]">
                <div className="col-span-12 lg:col-span-3">
                  <span className="inline-block rounded-full bg-orange px-[0.8rem] py-[0.3rem] font-mono text-[0.65rem] uppercase text-navy">Placeholder</span>
                  <p className="mt-[1rem] font-medium uppercase">{t.name}</p>
                  <p className="text-[0.85rem] text-slate">{t.trip} · {t.year}</p>
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
