import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Big indented paragraph + side label + body (reference paragraph wrapper). */
export function ParagraphBlock({ lead, side, body }: { lead: ReactNode; side?: ReactNode; body?: ReactNode }) {
  return (
    <section className="bg-glacier py-[6rem] md:py-[8rem]">
      <div className="container-site grid-site gap-y-[2.5rem]">
        <Reveal className="col-span-12 lg:col-span-9">
          <div className="t-h2 indent-space">{lead}</div>
        </Reveal>
        {side && (
          <div className="col-span-12 lg:col-span-3">
            <div className="t-label text-slate">{side}</div>
          </div>
        )}
        {body && (
          <Reveal className={side ? "col-span-12 lg:col-span-6" : "col-span-12 lg:col-span-6 lg:col-start-4"} delay={0.1}>
            <div className="space-y-[1em] text-[1.05rem] leading-[1.6] text-slate">{body}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
