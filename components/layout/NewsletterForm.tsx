"use client";

import Link from "next/link";
import { useState } from "react";
import { season } from "@/config/season";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company: fd.get("company") }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <div>
      <p className="mb-[1.2rem] text-[1rem] leading-[1.3]">
        Field notes from the far south: new departures, early-bird cabins and the occasional penguin. Next season: {season.nextSeason}.
      </p>
      {state === "done" ? (
        <p role="status" className="rounded-full bg-iceberg px-[1.3rem] py-[0.8rem] text-[0.9rem] text-navy">
          You&apos;re on the list. See you on the ice.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex rounded-full bg-white/10 p-[0.3rem] focus-within:ring-2 focus-within:ring-orange">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your email"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "nl-error" : undefined}
            className="min-w-0 flex-1 bg-transparent px-[1rem] text-[0.95rem] text-glacier placeholder:text-glacier/50 outline-none"
          />
          {/* honeypot */}
          <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button
            type="submit"
            disabled={state === "sending"}
            className="h-[2.4rem] cursor-pointer rounded-full bg-glacier px-[1.2rem] text-[0.78rem] font-medium uppercase text-navy transition hover:bg-orange disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
      {state === "error" && (
        <p id="nl-error" role="alert" className="mt-[0.6rem] text-[0.85rem] text-orange">
          {error}
        </p>
      )}
      <p className="mt-[0.8rem] text-[0.75rem] text-glacier/60">
        By subscribing you agree to our{" "}
        <Link href="/legals#privacy" className="underline underline-offset-2 hover:text-glacier">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
