"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Pill, PillButton } from "@/components/ui/Pill";
import { useUi } from "@/lib/ui";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { menuOpen, setMenuOpen, penguin, setPenguin } = useUi();
  return (
    <header>
      {/* Logo blends against whatever is underneath, like the reference mark */}
      <Link href="/" aria-label="Seventh Continent — home" className="fixed left-[1.25rem] top-[1.25rem] z-[70] text-white mix-blend-difference">
        <Logo />
      </Link>
      <div className="fixed right-[1.25rem] top-[1.25rem] z-[70] flex items-start gap-[0.3rem]">
        <LanguageSwitcher className="max-md:hidden" />
        <CurrencySwitcher className="max-lg:hidden" />
        <PillButton className="max-md:hidden" onClick={() => setPenguin(!penguin)} aria-pressed={penguin}>
          {"{Penguin mode}"}
        </PillButton>
        <Pill href="/plan-my-expedition" variant="accent" className="max-sm:hidden">
          Plan my expedition
        </Pill>
        <PillButton onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu">
          {menuOpen ? "Close" : "Menu"}
        </PillButton>
      </div>
    </header>
  );
}
