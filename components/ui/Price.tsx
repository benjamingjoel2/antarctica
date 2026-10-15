"use client";

import { useCurrency } from "@/lib/currency";

export function Price({ usd, prefix, suffix, className }: { usd: number; prefix?: string; suffix?: string; className?: string }) {
  const { format } = useCurrency();
  return (
    <span className={className} suppressHydrationWarning>
      {prefix ? `${prefix} ` : ""}
      {format(usd)}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
}
