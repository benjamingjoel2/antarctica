import type { ReactNode } from "react";

/** Reference credits: four columns, regular heading, mono caps list. */
export function CreditsGrid({ columns }: { columns: { title: string; items: ReactNode[] }[] }) {
  return (
    <section className="bg-ink text-ice">
      <div className="container-site grid grid-cols-1 gap-[3rem] py-[6rem] sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h2 className="t-h3">{c.title}</h2>
            <ul className="mt-[1.6rem] space-y-[0.25rem]">
              {c.items.map((it, i) => (
                <li key={i} className="t-mono leading-[1.1]">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
