import type { ReactNode } from "react";

/** Reference legals layout: number column + title + body, right-aligned block. */
export function NumberedClauses({ items }: { items: { id?: string; title: string; body: ReactNode }[] }) {
  return (
    <ol className="space-y-[3.5rem]">
      {items.map((it, i) => (
        <li key={it.title} id={it.id} className="grid-site scroll-mt-[7rem]">
          <p className="col-span-12 font-mono text-[0.9rem] text-slate lg:col-span-1 lg:col-start-4">{i + 1}</p>
          <div className="col-span-12 lg:col-span-6">
            <h2 className="t-h3">{it.title}</h2>
            <div className="mt-[1rem] space-y-[0.8em] text-[1rem] leading-[1.6] text-slate">{it.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
