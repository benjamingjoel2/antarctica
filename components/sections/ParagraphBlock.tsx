import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Reference paragraph wrapper: big indented paragraph, then a date/side label and a smaller body offset right. */
export function ParagraphBlock({ lead, side, body, tone = "dark" }: { lead: ReactNode; side?: ReactNode; body?: ReactNode; tone?: "dark" | "light" }) {
  return (
    <section className={tone === "dark" ? "bg-ink text-ice" : "bg-ice text-ink"}>
      <div className="container-site grid-site gap-y-[2.5rem] py-[8rem]">
        <Reveal className="col-span-12 lg:col-span-9">
          <div className="t-h2">{lead}</div>
        </Reveal>
        <div className="col-span-12 lg:col-span-3">{side && <div className="t-mono opacity-70">{side}</div>}</div>
        {body && (
          <Reveal className="col-span-12 lg:col-span-9" delay={0.1}>
            <div className="t-small max-w-[44rem] space-y-[1em] opacity-80">{body}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
