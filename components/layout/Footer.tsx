"use client";

import Link from "next/link";
import { useRef } from "react";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { PenguinSvg } from "@/components/penguin/PenguinSvg";
import { useConsent } from "@/lib/consent";
import { NewsletterForm } from "./NewsletterForm";

/** Reference footer: light, big intro paragraph, giant social list, mono link columns, newsletter. */
export function Footer() {
  const area = useRef<HTMLElement>(null);
  const { openPrefs } = useConsent();
  const socials = [
    ...site.socials,
    { label: "Mail", href: `mailto:${site.contact.email}` },
  ];

  return (
    <footer ref={area} className="relative overflow-hidden bg-ice text-ink">
      <div className="container-site pb-[1.25rem] pt-[9rem]">
        <p className="t-h2 indent-space max-w-[62rem]">
          Tell us where you dream of standing. One polar specialist will match you with the right ship, route and season, and stay
          with you until you step back onto dry land.
        </p>

        <div className="grid-site">
          <ul className="col-span-12 mt-[6rem] flex flex-col lg:col-span-8 lg:col-start-5 lg:mt-[8rem]">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="t-giant block transition-[letter-spacing,opacity] duration-500 hover:opacity-50"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[6rem] grid-site gap-y-[2.5rem]">
          {footerNav.map((col, i) => (
            <nav key={i} aria-label={`Footer ${i + 1}`} className="col-span-6 md:col-span-3 lg:col-span-2">
              <ul className="space-y-[0.15rem]">
                {col.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="t-mono hover:opacity-50">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-[5rem] flex flex-col gap-[0.6rem] border-t border-ink/20 pt-[1rem] text-[0.75rem] opacity-70 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · Independent Antarctica specialists · Voyages operated by IAATO-member partners</p>
          <div className="flex gap-[1.2rem]">
            <button type="button" onClick={openPrefs} className="t-mono cursor-pointer text-[1rem] hover:opacity-50">Cookie preferences</button>
            <Link href="/legals" className="t-mono text-[1rem] hover:opacity-50">Legals</Link>
          </div>
        </div>
      </div>

      <CursorFollow area={area} offset={{ x: -40, y: -110 }} stiffness={200}>
        <PenguinSvg pose="wave" className="w-[5.5rem] origin-bottom animate-[waddle_0.9s_ease-in-out_infinite]" />
      </CursorFollow>
    </footer>
  );
}
