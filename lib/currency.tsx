"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { baseCurrency, currencies, formatPrice, type Currency } from "@/config/currency";
import { readStore, writeStore } from "./storage";

type Ctx = { currency: Currency; setCurrency: (c: Currency) => void; format: (usd: number) => string };

const CurrencyContext = createContext<Ctx>({
  currency: baseCurrency,
  setCurrency: () => {},
  format: (usd) => formatPrice(usd, baseCurrency),
});

const KEY = "sc-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(baseCurrency);

  useEffect(() => {
    const saved = readStore<Currency>(KEY, baseCurrency);
    if (currencies.includes(saved)) setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    writeStore(KEY, c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format: (usd) => formatPrice(usd, currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
