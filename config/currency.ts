export const currencies = ["USD", "EUR", "GBP", "AUD", "CAD"] as const;
export type Currency = (typeof currencies)[number];
export const baseCurrency: Currency = "USD";

/**
 * Static indicative rates from 1 USD. TODO: replace with a live FX source
 * (e.g. a daily cron writing to an edge config) before launch.
 */
export const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.37,
};

export const currencyLocale: Record<Currency, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AUD: "en-AU",
  CAD: "en-CA",
};

export function convert(usd: number, to: Currency) {
  // Round to a tidy figure: brochure prices, not invoices.
  return Math.round((usd * rates[to]) / 10) * 10;
}

export function formatPrice(usd: number, to: Currency) {
  return new Intl.NumberFormat(currencyLocale[to], {
    style: "currency",
    currency: to,
    maximumFractionDigits: 0,
  }).format(convert(usd, to));
}
