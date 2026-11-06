"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Pill } from "@/components/ui/Pill";
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
      {/* Plain text menu (blends against whatever is underneath, like the logo) and one solid button */}
      <div className="fixed right-[1.25rem] top-[1.25rem] z-[70] flex items-center gap-[1.1rem]">
        <div className="flex items-center gap-[1.1rem] text-white mix-blend-difference">
          <LanguageSwitcher className="max-md:hidden" tone="plain" />
          <CurrencySwitcher className="max-lg:hidden" tone="plain" />
          <button type="button" className="t-mono cursor-pointer hover:opacity-60 max-md:hidden" onClick={() => setPenguin(!penguin)} aria-pressed={penguin}>
            {"{Penguin mode}"}
          </button>
        </div>
        <Pill href="/plan-my-expedition" variant="accent" size="sm" className="max-sm:hidden">
          Plan my expedition
        </Pill>
        <button
          type="button"
          className="t-mono cursor-pointer text-white mix-blend-difference hover:opacity-60"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
