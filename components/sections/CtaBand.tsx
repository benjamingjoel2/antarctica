import { Pill } from "@/components/ui/Pill";
import { SplitWords } from "@/components/ui/SplitWords";

/** Closing call to action in the giant-caps language of the reference. */
export function CtaBand({ lines = ["ready", "when you are"], href = "/plan-my-expedition", label = "Plan my expedition", text }: { lines?: string[]; href?: string; label?: string; text?: string }) {
  return (
    <section className="bg-ink py-[9rem] text-center text-ice">
      <div className="container-site">
        <SplitWords as="h2" className="t-giant" lines={lines.map((l) => ({ text: l, className: "justify-center" }))} />
        <p className="t-small mx-auto mt-[1.6rem] max-w-[30rem] opacity-80">
          {text ?? "Tell us when, who and what you dream of seeing. One polar specialist will shortlist the right voyages, free and without obligation."}
        </p>
        <div className="mt-[1.6rem]">
          <Pill href={href} variant="accent">{label}</Pill>
        </div>
      </div>
    </section>
  );
}
