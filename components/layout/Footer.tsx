"use client";

import Link from "next/link";
import { useRef } from "react";
import { footerNav } from "@/config/nav";
import { site } from "@/config/site";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { PenguinSvg } from "@/components/penguin/PenguinSvg";
import { useConsent } from "@/lib/consent";
import { NewsletterForm } from "./NewsletterForm";

/** Letter sign-off footer: a short signed note with the email on the left, link columns and the newsletter on the right. */
export function Footer() {
  const area = useRef<HTMLElement>(null);
  const { openPrefs } = useConsent();

  return (
    <footer ref={area} className="relative overflow-hidden bg-ice text-ink">
      <div className="container-site pb-[1.25rem] pt-[6rem]">
        <div className="grid-site gap-y-[4rem]">
          <div className="col-span-12 lg:col-span-6">
            <p className="t-mono opacity-60">Write to us</p>
            <p className="t-h2 mt-[1.2rem] max-w-[34rem]">
              Tell us where you dream of standing. One polar specialist will match you with the right ship, route and season, and stay
              with you until you step back onto dry land.
            </p>
            <p className="t-h3 mt-[1.6rem]">
              <a href={`mailto:${site.contact.email}`} className="underline decoration-1 underline-offset-[0.2em] hover:opacity-60">
                {site.contact.email}
              </a>
            </p>
            <p className="t-mono mt-[1.6rem]">— {site.name}</p>
            <p className="t-small mt-[0.4rem] opacity-70">{site.contact.address}</p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-2 gap-[2rem] sm:grid-cols-3">
              {footerNav.map((col, i) => (
                <nav key={i} aria-label={`Footer ${i + 1}`}>
                  <ul className="space-y-[0.35rem]">
                    {col.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="t-mono hover:opacity-50">{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div className="mt-[3rem]">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-[4rem] flex flex-col gap-[0.6rem] border-t border-ink/20 pt-[1rem] text-[0.75rem] opacity-70 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · Independent Antarctica specialists · Voyages operated by IAATO-member partners</p>
          <button type="button" onClick={openPrefs} className="t-mono cursor-pointer text-left text-[1rem] hover:opacity-50">Cookie preferences</button>
        </div>
      </div>

      <CursorFollow area={area} offset={{ x: -40, y: -110 }} stiffness={200}>
        <PenguinSvg pose="wave" className="w-[5.5rem] origin-bottom animate-[waddle_0.9s_ease-in-out_infinite]" />
      </CursorFollow>
    </footer>
  );
}
