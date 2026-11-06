import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Buttons. `accent` and `dark` are one simple solid button; `light` and `glass` are plain
 * text links with an underline. No boxed labels, no separate icon.
 */
type Variant = "light" | "dark" | "accent" | "glass";

type Common = { children: ReactNode; variant?: Variant; className?: string; size?: "sm" | "md" };

function Inner({ children }: { children: ReactNode; variant?: Variant }) {
  return <span>{children}</span>;
}

const solid: Partial<Record<Variant, string>> = {
  accent: "bg-orange text-ink hover:bg-ice focus-visible:bg-ice",
  dark: "bg-ink text-ice hover:bg-orange hover:text-ink focus-visible:bg-orange focus-visible:text-ink",
};

const base = (variant: Variant, size: "sm" | "md") =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "font-mono uppercase leading-none tracking-[0.01em] transition-colors duration-300",
    solid[variant]
      ? cn(solid[variant], size === "sm" ? "px-[0.7rem] py-[0.5rem] text-[1rem]" : "px-[1rem] py-[0.75rem] text-[1.12rem]")
      : cn("underline decoration-1 underline-offset-[0.3em] hover:opacity-60", size === "sm" ? "text-[1rem]" : "text-[1.12rem]"),
  );

export function Pill({ href, children, variant = "light", size = "md", className, ...rest }: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cn(base(variant, size), className)} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base(variant, size), className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function PillButton({ children, variant = "light", size = "md", className, ...rest }: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type="button" className={cn(base(variant, size), "cursor-pointer disabled:opacity-40", className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

/** Single caption label (e.g. over a photo): one panel for the whole caption, never one per word. */
export function PillTag({ children, variant = "light", className }: Common) {
  return (
    <span
      className={cn(
        "pointer-events-none inline-block font-mono text-[1rem] uppercase leading-[1.2]",
        variant === "accent" ? "bg-orange/90 text-ink" : variant === "dark" ? "bg-ink/85 text-ice" : "bg-ink/70 text-ice",
        "px-[0.45rem] py-[0.3rem]",
        className,
      )}
    >
      {children}
    </span>
  );
}
