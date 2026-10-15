import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Pill } from "@/components/ui/Pill";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { season } from "@/config/season";
import { site, whatsappHref } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contact", description: "Talk to a polar specialist by email, WhatsApp or phone.", path: "/contact" });

export default function ContactPage() {
  const methods = [
    { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: "WhatsApp", value: "Message a specialist", href: whatsappHref() },
    { label: "Telephone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ];
  return (
    <>
      <PageHero label="Contact" lines={["say", "hello"]} />
      <section className="bg-glacier pb-[8rem]">
        <div className="container-site">
          <p className="t-h2 indent-space max-w-[60rem] md:text-[3.2rem]">
            Tell us where you dream of standing. One polar specialist will reply within one working day, with honest advice and
            no obligation.
          </p>
          <div className="mt-[4rem] grid grid-cols-1 gap-[1rem] md:grid-cols-3">
            {methods.map((m) => (
              <a key={m.label} href={m.href} className="group rounded-[1.2rem] bg-snow p-[1.6rem] transition-colors hover:bg-navy hover:text-glacier" target={m.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <p className="t-label text-slate group-hover:text-iceberg">{m.label}</p>
                <p className="mt-[2.5rem] font-display text-[2rem] font-extrabold lowercase leading-[0.95] tracking-[-0.03em] [font-stretch:75%] break-words">{m.value}</p>
              </a>
            ))}
          </div>
          <div className="mt-[3rem] grid-site gap-y-[1.5rem]">
            <div className="col-span-12 md:col-span-6">
              <p className="t-label text-slate">Hours</p>
              <p className="mt-[0.4rem]">{site.contact.hours}</p>
              <p className="t-label mt-[1.2rem] text-slate">Address</p>
              <p className="mt-[0.4rem]">{site.contact.address}</p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="t-label text-slate">Next season</p>
              <p className="mt-[0.4rem]">{season.nextSeason} · {season.label}</p>
              <div className="mt-[1.2rem] flex flex-wrap items-center gap-[1rem]">
                <Pill href="/plan-my-expedition" variant="accent">Plan my expedition</Pill>
                <UnderlineLink href="/faq">Read the FAQ</UnderlineLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
