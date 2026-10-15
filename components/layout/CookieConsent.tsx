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
            className="fixed bottom-[1rem] left-[1rem] right-[5.5rem] z-[90] max-w-[29rem] rounded-[1.1rem] bg-snow p-[1.3rem] text-navy shadow-[0_20px_60px_-20px_rgba(11,27,46,0.45)] sm:right-auto"
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          >
            <p className="text-[0.92rem] leading-[1.35]">
              Like footprints in snow, cookies leave a trace. We use them to understand what you read and to remember your
              preferences. See our{" "}
              <Link href="/legals#cookies" className="underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="mt-[1rem] flex flex-wrap gap-[0.4rem]">
              <PillButton variant="dark" size="sm" onClick={acceptAll}>Accept</PillButton>
              <PillButton variant="light" size="sm" onClick={rejectAll} className="ring-1 ring-rule">Reject</PillButton>
              <button type="button" onClick={openPrefs} className="cursor-pointer px-[0.6rem] text-[0.72rem] font-medium uppercase underline underline-offset-2">
                Preferences
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {prefsOpen && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center p-[1rem]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close preferences" onClick={closePrefs} className="absolute inset-0 cursor-default bg-navy/60 backdrop-blur-sm" />
            <motion.div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="consent-title"
              data-lenis-prevent
              className="relative max-h-[90vh] w-full max-w-[34rem] overflow-y-auto rounded-[1.3rem] bg-snow p-[1.6rem] text-navy"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 id="consent-title" className="t-display text-[2.6rem]">manage consent</h2>
              <ul className="mt-[1.4rem] divide-y divide-rule border-y border-rule">
                <li className="py-[1rem]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium uppercase">Essentials</span>
                    <span className="t-label text-iceberg-deep">Always active</span>
                  </div>
                  <p className="mt-[0.3rem] text-[0.88rem] text-slate">Needed for the site to work: security, your consent choice, the planner&apos;s saved progress.</p>
                </li>
                {options.map((o) => (
                  <li key={o.key} className="py-[1rem]">
                    <label className="flex cursor-pointer items-center justify-between gap-[1rem]">
                      <span className="font-medium uppercase">{o.label}</span>
                      <span className="relative inline-flex">
                        <input
                          type="checkbox"
                          checked={draft[o.key]}
                          onChange={(e) => setDraft({ ...draft, [o.key]: e.target.checked })}
                          className="peer h-[1.5rem] w-[2.6rem] cursor-pointer rounded-full bg-rule transition checked:bg-navy"
                        />
                        <span className="pointer-events-none absolute left-[0.2rem] top-[0.2rem] h-[1.1rem] w-[1.1rem] rounded-full bg-snow transition-transform peer-checked:translate-x-[1.1rem] peer-checked:bg-orange" />
                      </span>
                    </label>
                    <p className="mt-[0.3rem] text-[0.88rem] text-slate">{o.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-[1.3rem] flex flex-wrap gap-[0.4rem]">
                <PillButton variant="light" size="sm" className="ring-1 ring-rule" onClick={rejectAll}>Reject all</PillButton>
                <PillButton variant="light" size="sm" className="ring-1 ring-rule" onClick={acceptAll}>Accept all</PillButton>
                <PillButton variant="dark" size="sm" onClick={() => save(draft)}>Save choices</PillButton>
              </div>
              <button
                type="button"
                onClick={closePrefs}
                aria-label="Close"
                className="absolute right-[1rem] top-[1rem] grid h-[2.2rem] w-[2.2rem] cursor-pointer place-items-center rounded-full bg-glacier hover:bg-navy hover:text-glacier"
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
