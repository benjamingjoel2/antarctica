"use client";

import { currencies, type Currency } from "@/config/currency";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/cn";

export function CurrencySwitcher({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className={cn("relative inline-flex items-center font-mono text-[1.12rem] uppercase leading-none", tone === "light" ? "bg-ice text-ink" : "bg-ink text-ice", className)}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="cursor-pointer bg-transparent py-[0.15rem] pl-[0.3rem] pr-[1.1rem] uppercase outline-none"
        suppressHydrationWarning
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="bg-ice text-ink">{c}</option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-[0.3rem]">▾</span>
    </label>
  );
}
