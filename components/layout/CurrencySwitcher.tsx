"use client";

import { currencies, type Currency } from "@/config/currency";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/cn";

export function CurrencySwitcher({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <label
      className={cn(
        "relative inline-flex h-[2.6rem] items-center rounded-full pl-[1.1rem] pr-[2rem] text-[0.8rem] font-medium uppercase",
        tone === "light" ? "bg-snow text-navy" : "bg-white/10 text-glacier",
        className,
      )}
    >
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="cursor-pointer bg-transparent pr-[0.2rem] uppercase outline-none"
        suppressHydrationWarning
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="text-navy">
            {c}
          </option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 10 6" className="pointer-events-none absolute right-[0.9rem] h-[0.4rem] w-[0.6rem]">
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </label>
  );
}
