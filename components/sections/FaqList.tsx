import type { Faq } from "@/data/types";
import { VerifyNote } from "@/components/ui/VerifyNote";

/** FAQ in the reference legals rhythm, each row a native disclosure. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <ol>
      {faqs.map((f, i) => (
        <li key={f.q} className="border-t border-ink/20">
          <details className="group">
            <summary className="grid-site cursor-pointer list-none items-baseline py-[1.6rem] [&::-webkit-details-marker]:hidden">
              <span className="col-span-2 t-small lg:col-span-1 lg:col-start-3">{i + 1}</span>
              <span className="t-h3 col-span-9 lg:col-span-6">{f.q}</span>
              <span aria-hidden className="t-mono col-span-1 text-right transition-transform duration-500 group-open:rotate-45">+</span>
            </summary>
            <div className="grid-site pb-[2rem]">
              <div className="col-span-10 col-start-3 lg:col-span-6 lg:col-start-4">
                <p className="t-small opacity-75">{f.a}</p>
                {f.verify && <VerifyNote className="mt-[0.8rem]">To verify with partner operators and IAATO before launch</VerifyNote>}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
