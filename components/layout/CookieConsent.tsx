"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PillButton } from "@/components/ui/Pill";
import { useConsent, type ConsentPrefs } from "@/lib/consent";

const options: { key: keyof ConsentPrefs; label: string; text: string }[] = [
  { key: "analytics", label: "Analytics", text: "Anonymous counts of which pages and voyages people read, so we can improve the site." },
  { key: "personalization", label: "Personalisation", text: "Remembers choices like your currency and the routes you looked at." },
  { key: "marketing", label: "Marketing", text: "Lets us measure campaigns and show relevant departures on other sites." },
];

export function CookieConsent() {
  const { bannerOpen, prefsOpen, prefs, openPrefs, closePrefs, save, acceptAll, rejectAll } = useConsent();
  const [draft, setDraft] = useState<ConsentPrefs>(prefs);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefsOpen) return;
    setDraft(prefs);
    const t = setTimeout(() => dialog.current?.querySelector<HTMLElement>("input,button")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePrefs();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [prefsOpen, prefs, closePrefs]);

  return (
    <>
      <AnimatePresence>
        {bannerOpen && (
          <motion.section
            aria-label="Cookie consent"
            className="fixed bottom-0 right-0 z-[90] w-full max-w-[23rem] bg-ink p-[1rem] text-ice ring-1 ring-ice/15"
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          >
            <p className="text-[0.82rem] leading-[1.3]">
              Cookies, like footprints in snow, leave a trace. Accepting them helps us understand what you read and remember your preferences. See our{" "}
              <Link href="/legals#cookies" className="underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="mt-[0.9rem] flex flex-wrap items-center gap-[0.3rem]">
              <PillButton size="sm" onClick={acceptAll}>Accept</PillButton>
              <PillButton size="sm" onClick={rejectAll}>Reject</PillButton>
              <button type="button" onClick={openPrefs} className="t-mono cursor-pointer px-[0.4rem] text-[1rem] underline underline-offset-2">
                Preferences
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {prefsOpen && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center p-[1rem]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close preferences" onClick={closePrefs} className="absolute inset-0 cursor-default bg-ink/70" />
            <motion.div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="consent-title"
              data-lenis-prevent
              className="relative max-h-[90vh] w-full max-w-[34rem] overflow-y-auto bg-ice p-[1.4rem] text-ink"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 id="consent-title" className="t-h2">Manage consent preferences</h2>
              <ul className="mt-[1.4rem] divide-y divide-ink/15 border-y border-ink/15">
                <li className="py-[1rem]">
                  <div className="flex items-center justify-between">
                    <span className="t-mono">Essentials</span>
                    <span className="t-mono opacity-60">Always active</span>
                  </div>
                  <p className="mt-[0.3rem] text-[0.85rem] opacity-70">Needed for the site to work: security, your consent choice, the planner&apos;s saved progress.</p>
                </li>
                {options.map((o) => (
                  <li key={o.key} className="py-[1rem]">
                    <label className="flex cursor-pointer items-center justify-between gap-[1rem]">
                      <span className="t-mono">{o.label}</span>
                      <span className="relative inline-flex">
                        <input
                          type="checkbox"
                          checked={draft[o.key]}
                          onChange={(e) => setDraft({ ...draft, [o.key]: e.target.checked })}
                          className="peer h-[1.3rem] w-[2.4rem] cursor-pointer bg-ink/20 transition checked:bg-ink"
                        />
                        <span className="pointer-events-none absolute left-[0.2rem] top-[0.2rem] h-[0.9rem] w-[0.9rem] bg-ice transition-transform peer-checked:translate-x-[1.1rem] peer-checked:bg-orange" />
                      </span>
                    </label>
                    <p className="mt-[0.3rem] text-[0.85rem] opacity-70">{o.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-[1.3rem] flex flex-wrap gap-[0.4rem]">
                <PillButton variant="dark" size="sm" onClick={rejectAll}>Reject all</PillButton>
                <PillButton variant="dark" size="sm" onClick={acceptAll}>Accept all</PillButton>
                <PillButton variant="accent" size="sm" onClick={() => save(draft)}>Save choices</PillButton>
              </div>
              <button
                type="button"
                onClick={closePrefs}
                aria-label="Close"
                className="absolute right-[1rem] top-[1rem] grid h-[1.8rem] w-[1.8rem] cursor-pointer place-items-center bg-ink text-ice hover:bg-orange hover:text-ink"
              >
                <svg viewBox="0 0 12 12" className="h-[0.7rem] w-[0.7rem]" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
