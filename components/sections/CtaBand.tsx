import { Pill } from "@/components/ui/Pill";
import { SplitWords } from "@/components/ui/SplitWords";

export function CtaBand({ lines = ["ready", "when you are"], href = "/plan-my-expedition", label = "Plan my expedition", text }: { lines?: string[]; href?: string; label?: string; text?: string }) {
  return (
    <section className="bg-iceberg-soft py-[6rem] md:py-[8rem]">
      <div className="container-site flex flex-col gap-[2rem] md:flex-row md:items-end md:justify-between">
        <SplitWords as="h2" className="t-split" lines={lines.map((l, i) => ({ text: l, className: i === 1 ? "md:pl-[10%]" : undefined }))} />
        <div className="max-w-[22rem] md:pb-[1rem]">
          <p className="mb-[1.2rem] text-[1rem] text-slate">{text ?? "Tell us when, who and what you dream of seeing. One polar specialist will shortlist the right voyages, free and without obligation."}</p>
          <Pill href={href} variant="accent">{label}</Pill>
        </div>
      </div>
    </section>
  );
}
