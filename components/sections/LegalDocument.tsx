import Link from "next/link";
import type { ReactNode } from "react";
import { NumberedClauses } from "@/components/sections/NumberedClauses";
import { legalUpdated, type LegalDoc } from "@/data/legal";

/** Renders "[text](/path)" as internal links inside plain legal text. */
function linkify(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\(\/[^)]*\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
    return m ? <Link key={i} href={m[2]} className="underline underline-offset-[0.15em]">{m[1]}</Link> : part;
  });
}

/** Reference legals layout: heading, date, numbered clauses. */
export function LegalDocument({ doc, after }: { doc: LegalDoc; after?: ReactNode }) {
  return (
    <section className="bg-ice pb-[8rem] pt-[8rem] text-ink">
      <div className="container-site">
        <div className="grid-site mb-[5rem]">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3">
            <h1 className="t-h2">{doc.title}</h1>
            <p className="t-small mt-[0.6rem] opacity-60">Last updated: {legalUpdated}</p>
          </div>
        </div>
        <NumberedClauses items={doc.sections.map((s) => ({ title: s.h, body: <>{s.p.map((p, i) => <p key={i}>{linkify(p)}</p>)}</> }))} />
        {after}
      </div>
    </section>
  );
}
