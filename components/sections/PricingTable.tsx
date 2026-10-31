import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import type { Expedition } from "@/data/types";

export function PricingTable({ cabins, note }: { cabins: Expedition["cabins"]; note: string }) {
  return (
    <div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Indicative prices per person by cabin</caption>
        <thead>
          <tr className="border-b border-ice/30">
            <th scope="col" className="t-mono py-[0.8rem] font-normal opacity-60">Cabin</th>
            <th scope="col" className="t-mono py-[0.8rem] text-right font-normal opacity-60">Per person</th>
          </tr>
        </thead>
        <tbody>
          {cabins.map((c) => (
            <tr key={c.label} className="border-b border-ice/15">
              <th scope="row" className="t-h3 py-[1rem] font-normal">{c.label}</th>
              <td className="t-h3 py-[1rem] text-right"><Price usd={c.priceUSD} prefix="From" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <VerifyNote className="mt-[1rem]">{note}</VerifyNote>
    </div>
  );
}
