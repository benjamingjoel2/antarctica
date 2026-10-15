import type { ReactNode } from "react";

/** Reference legals: rows with a top rule, number column, title + body. */
export function NumberedClauses({ items }: { items: { id?: string; title: string; body: ReactNode }[] }) {
  return (
    <ol>
      {items.map((it, i) => (
        <li key={it.title} id={it.id} className="grid-site scroll-mt-[6rem] border-t border-ink/20 py-[2rem]">
          <p className="col-span-2 t-small lg:col-span-1 lg:col-start-3">{i + 1}</p>
          <div className="col-span-10 lg:col-span-6">
            <h2 className="t-small font-medium">{it.title}</h2>
            <div className="t-small mt-[0.9rem] space-y-[0.7em] opacity-70">{it.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
