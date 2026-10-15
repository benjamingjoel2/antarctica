import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import type { Expedition } from "@/data/types";

export function PricingTable({ cabins, note }: { cabins: Expedition["cabins"]; note: string }) {
  return (
    <div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Indicative prices per person by cabin</caption>
        <thead>
          <tr className="border-b border-navy">
            <th scope="col" className="t-label py-[0.8rem] font-normal text-slate">Cabin</th>
            <th scope="col" className="t-label py-[0.8rem] text-right font-normal text-slate">From, per person</th>
          </tr>
        </thead>
        <tbody>
          {cabins.map((c) => (
            <tr key={c.label} className="border-b border-rule">
              <th scope="row" className="py-[1.1rem] text-[1.1rem] font-medium">{c.label}</th>
              <td className="py-[1.1rem] text-right font-display text-[1.9rem] font-extrabold tracking-[-0.03em] [font-stretch:75%]">
                <Price usd={c.priceUSD} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VerifyNote className="mt-[1rem]">{note}</VerifyNote>
    </div>
  );
}
