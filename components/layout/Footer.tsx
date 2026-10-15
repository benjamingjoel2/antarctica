"use client";

import Link from "next/link";
import { useRef } from "react";
import { footerNav } from "@/config/nav";
import { site, whatsappHref } from "@/config/site";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { PenguinSvg } from "@/components/penguin/PenguinSvg";
import { useConsent } from "@/lib/consent";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const area = useRef<HTMLElement>(null);
  const { openPrefs } = useConsent();
  const socials = [
    ...site.socials,
    { label: "Email", href: `mailto:${site.contact.email}` },
    { label: "WhatsApp", href: whatsappHref() },
  ];

  return (
    <footer ref={area} className="relative overflow-hidden bg-navy text-glacier">
      <div className="container-site pt-[7rem] pb-[2rem] md:pt-[10rem]">
        <p className="t-h2 indent-space max-w-[60rem] md:text-[3.4rem]">
          Tell us where you dream of standing. One polar specialist will take it from there: the ship, the route, the season,
          and every detail until you step back onto dry land.
        </p>

        <div className="mt-[3rem] grid-site">
          <div className="col-span-12 flex flex-wrap gap-x-[2rem] gap-y-[0.8rem] lg:col-span-8 lg:col-start-5">
            {socials.map((s) => (
              <UnderlineLink key={s.label} href={s.href}>
                {s.label}
              </UnderlineLink>
            ))}
          </div>
        </div>

        <div className="mt-[6rem] grid-site gap-y-[3rem] border-t border-white/15 pt-[2.5rem]">
          {footerNav.map((col, i) => (
            <nav key={i} aria-label={`Footer ${i + 1}`} className="col-span-6 md:col-span-2 lg:col-span-2">
              <ul className="flex flex-col gap-[0.35rem]">
                {col.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-display text-[1.6rem] font-extrabold lowercase leading-[1] tracking-[-0.02em] [font-stretch:75%] transition-colors hover:text-iceberg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-[5rem] flex flex-col gap-[1rem] border-t border-white/15 pt-[1.2rem] text-[0.75rem] text-glacier/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Independent Antarctica specialists. Voyages operated by IAATO-member partners.
          </p>
          <div className="flex gap-[1.2rem]">
            <button type="button" onClick={openPrefs} className="cursor-pointer uppercase hover:text-glacier">
              Cookie preferences
            </button>
            <Link href="/legals" className="uppercase hover:text-glacier">
              Legals
            </Link>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="t-hero translate-y-[18%] whitespace-nowrap text-center text-[17.5vw] text-white/[0.06]">seventh continent</p>
      </div>

      <CursorFollow area={area} offset={{ x: -40, y: -110 }} stiffness={200}>
        <PenguinSvg pose="wave" className="w-[5.5rem] origin-bottom animate-[waddle_0.9s_ease-in-out_infinite]" />
      </CursorFollow>
    </footer>
  );
}
