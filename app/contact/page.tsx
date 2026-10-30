import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Pill } from "@/components/ui/Pill";
import { season } from "@/config/season";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact", description: "Talk to a polar specialist by email.", path: "/contact" });

export default function ContactPage() {
  const methods = [
    { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  ];
  return (
    <>
      <PageHero label="Contact" lines={["say hello"]} intro="Tell us where you dream of standing. One polar specialist replies within one working day, with honest advice and no obligation." />
      <section className="bg-ink pb-[8rem] text-ice">
        <div className="container-site">
          <ul>
            {methods.map((m) => (
              <li key={m.label} className="border-t border-ice/15">
                <a href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group grid-site items-baseline py-[1.6rem]">
                  <span className="t-mono col-span-12 opacity-60 md:col-span-3">{m.label}</span>
                  <span className="t-h2 col-span-12 break-words transition-opacity group-hover:opacity-60 md:col-span-9">{m.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-[4rem] grid-site gap-y-[2rem] border-t border-ice/15 pt-[2rem]">
            <div className="col-span-12 md:col-span-6">
              <p className="t-mono opacity-60">Address</p>
              <p className="t-small mt-[0.4rem]">{site.contact.address}</p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="t-mono opacity-60">Next season</p>
              <p className="t-small mt-[0.4rem]">{season.nextSeason} · {season.label}</p>
              <div className="mt-[1.2rem] flex gap-[0.3rem]">
                <Pill href="/plan-my-expedition" variant="accent">Plan my expedition</Pill>
                <Pill href="/faq">Read the FAQ</Pill>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
