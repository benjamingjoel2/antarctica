"use client";

import Link from "next/link";
import { useState } from "react";

/** Reference newsletter: mono title, outlined field with "OK", small disclaimer. */
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
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, company: fd.get("company") }) });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setState("error");
    }
  }

  return (
    <div>
      <p className="t-mono max-w-[80%]">Join our field notes for new departures, early cabins and the occasional penguin.</p>
      {state === "done" ? (
        <p role="status" className="t-mono mt-[1.2rem] border border-ink px-[1.25rem] py-[1.56rem]">Thanks — you&apos;re on the list.</p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-[1.2rem] flex border border-ink">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "nl-error" : undefined}
            className="t-mono min-w-0 flex-1 bg-transparent px-[1.25rem] py-[1.56rem] text-ink placeholder:text-ink/40 outline-none"
          />
          <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <button type="submit" disabled={state === "sending"} className="t-mono cursor-pointer px-[1.25rem] transition-colors hover:bg-ink hover:text-ice disabled:opacity-50">
            {state === "sending" ? "…" : "OK"}
          </button>
        </form>
      )}
      {state === "error" && <p id="nl-error" role="alert" className="mt-[0.5rem] text-[0.8rem] text-orange">{error}</p>}
      <p className="mt-[0.8rem] text-[0.7rem] opacity-60">
        By subscribing, you agree to our{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
