/** Page language. The i18n build rewrites this per locale copy ("fr", "de", "es"). */
export const locale: string = "en";
// Built without a "/" literal so the i18n build does not prefix it.
const SLASH = String.fromCharCode(47);

/** Prefixes an internal path with the page's locale ("/ships" -> "/fr/ships"); English paths stay as they are. */
export function localHref(href: string): string {
  if (/^en$/.test(locale) || !href.startsWith(SLASH) || href.startsWith(SLASH + SLASH)) return href;
  if (href === SLASH + locale || href.startsWith(SLASH + locale + SLASH)) return href;
  return href === SLASH ? SLASH + locale : SLASH + locale + href;
}
