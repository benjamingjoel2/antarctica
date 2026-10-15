import type { Faq } from "@/data/types";
import { VerifyNote } from "@/components/ui/VerifyNote";

/** FAQ accordion in the numbered legals layout. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <ol className="border-t border-navy">
      {faqs.map((f, i) => (
        <li key={f.q} className="border-b border-rule">
          <details className="group">
            <summary className="grid-site cursor-pointer list-none items-baseline py-[1.4rem] [&::-webkit-details-marker]:hidden">
              <span className="col-span-2 font-mono text-[0.85rem] text-slate lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-9 text-[1.25rem] font-medium leading-[1.2] tracking-[-0.01em] md:text-[1.5rem] lg:col-span-10">{f.q}</span>
              <span aria-hidden className="col-span-1 ml-auto grid h-[2rem] w-[2rem] place-items-center rounded-full bg-snow transition-transform duration-500 group-open:rotate-45">+</span>
            </summary>
            <div className="grid-site pb-[1.6rem]">
              <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                <p className="text-[1.02rem] leading-[1.6] text-slate">{f.a}</p>
                {f.verify && <VerifyNote className="mt-[0.8rem]">To verify with partner operators and IAATO before launch</VerifyNote>}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
