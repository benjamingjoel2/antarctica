"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { readStore, writeStore } from "./storage";

export type ConsentPrefs = { marketing: boolean; analytics: boolean; personalization: boolean };
type Stored = ConsentPrefs & { decidedAt: string };

type Ctx = {
  prefs: ConsentPrefs;
  decided: boolean;
  bannerOpen: boolean;
  prefsOpen: boolean;
  openPrefs: () => void;
  closePrefs: () => void;
  save: (p: ConsentPrefs) => void;
  acceptAll: () => void;
  rejectAll: () => void;
};

const KEY = "sc-consent-v1";
const none: ConsentPrefs = { marketing: false, analytics: false, personalization: false };
const all: ConsentPrefs = { marketing: true, analytics: true, personalization: true };

const ConsentContext = createContext<Ctx | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<ConsentPrefs>(none);
  const [decided, setDecided] = useState(true); // avoid banner flash on SSR
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    const stored = readStore<Stored | null>(KEY, null);
    if (stored) {
      setPrefs({ marketing: stored.marketing, analytics: stored.analytics, personalization: stored.personalization });
      setDecided(true);
    } else {
      setDecided(false);
    }
  }, []);

  const save = useCallback((p: ConsentPrefs) => {
    setPrefs(p);
    setDecided(true);
    setPrefsOpen(false);
    writeStore(KEY, { ...p, decidedAt: new Date().toISOString() });
    // Mirror as a cookie so server code / tag managers can read it.
    document.cookie = `sc_consent=${encodeURIComponent(JSON.stringify(p))}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`;
    window.dispatchEvent(new CustomEvent("sc:consent", { detail: p }));
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        prefs,
        decided,
        bannerOpen: !decided && !prefsOpen,
        prefsOpen,
        openPrefs: () => setPrefsOpen(true),
        closePrefs: () => setPrefsOpen(false),
        save,
        acceptAll: () => save(all),
        rejectAll: () => save(none),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}
