"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Pill, PillButton } from "@/components/ui/Pill";
import { useUi } from "@/lib/ui";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function Header() {
  const { menuOpen, setMenuOpen, penguin, setPenguin } = useUi();
  return (
    <header>
      {/* Logo is its own fixed layer so difference-blending works against the page */}
      <Link
        href="/"
        aria-label="Seventh Continent — home"
        className={`fixed left-[1.25rem] top-[1.25rem] z-[70] md:left-[max(2rem,calc((100vw-89rem)/2+2rem))] ${menuOpen ? "" : "mix-blend-difference"}`}
      >
        <Logo tone={menuOpen ? "dark" : "light"} />
      </Link>
      <div className="fixed right-[1.25rem] top-[1.25rem] z-[70] flex items-center gap-[0.5rem] md:right-[max(2rem,calc((100vw-89rem)/2+2rem))]">
        <CurrencySwitcher className="max-lg:hidden" />
        <PillButton className="max-md:hidden" onClick={() => setPenguin(!penguin)} aria-pressed={penguin}>
          {"{penguin mode}"}
        </PillButton>
        <Pill href="/plan-my-expedition" variant="accent" className="max-sm:hidden">
          Plan my expedition
        </Pill>
        <PillButton
          variant={menuOpen ? "dark" : "light"}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </PillButton>
      </div>
    </header>
  );
}
