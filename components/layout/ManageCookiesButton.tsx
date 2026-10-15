"use client";

import { PillButton } from "@/components/ui/Pill";
import { useConsent } from "@/lib/consent";

export function ManageCookiesButton() {
  const { openPrefs } = useConsent();
  return (
    <PillButton variant="dark" size="sm" onClick={openPrefs}>
      Manage cookie preferences
    </PillButton>
  );
}
