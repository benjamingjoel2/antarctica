"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "es", label: "ES", name: "Español" },
] as const;

// Built without a "/" literal so the i18n build does not prefix it.
const SLASH = String.fromCharCode(47);

/** Splits "/fr/ships/x" into ["fr", "/ships/x"]; English has no prefix. */
function split(pathname: string): [string, string] {
  const m = pathname.match(/^\/(fr|de|es)(?=\/|$)(.*)$/);
  return m ? [m[1], m[2] || SLASH] : ["en", pathname || SLASH];
}

/** EN · FR · DE · ES: links to the same page in each language (no automatic redirects). */
export function LanguageSwitcher({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [current, rest] = split(usePathname() || SLASH);
  return (
    <nav aria-label="Language" className={cn("inline-flex items-center font-mono text-[1.12rem] uppercase leading-none", tone === "light" ? "bg-ice text-ink" : "bg-ink text-ice", className)}>
      <ul className="flex items-center px-[0.3rem] py-[0.15rem]">
        {LOCALES.map((l, i) => {
          const href = l.code === "en" ? rest : `/${l.code}${rest.length === 1 ? "" : rest}`;
          return (
            <li key={l.code} className="flex items-center">
              {i > 0 && <span aria-hidden className="px-[0.2rem] opacity-40">·</span>}
              <a
                href={href}
                hrefLang={l.code}
                lang={l.code}
                aria-current={l.code === current ? "true" : undefined}
                title={l.name}
                className={cn("hover:opacity-60", l.code === current ? "underline underline-offset-[0.2em]" : "opacity-70")}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
