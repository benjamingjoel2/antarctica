import type { ReactNode } from "react";

/** Four-column headed lists (reference credits: Production / Credits / Sponsors / Press). */
export function CreditsGrid({ columns }: { columns: { title: string; items: ReactNode[] }[] }) {
  return (
    <section className="bg-glacier py-[5rem]">
      <div className="container-site grid grid-cols-1 gap-[2.5rem] border-t border-rule pt-[3rem] sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h2 className="t-h3">{c.title}</h2>
            <ul className="mt-[1.2rem] space-y-[0.55rem] text-[0.98rem] leading-[1.35]">
              {c.items.map((it, i) => (
                <li key={i} className="border-b border-rule pb-[0.55rem]">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
