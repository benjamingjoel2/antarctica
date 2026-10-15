import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function UnderlineLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const cls = cn(
    "relative inline-block uppercase text-[0.82rem] font-medium tracking-[0.02em] pb-[0.15em]",
    "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-current after:origin-right after:scale-x-0",
    "after:transition-transform after:duration-500 after:ease-[var(--ease-expo)] hover:after:origin-left hover:after:scale-x-100",
    className,
  );
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
