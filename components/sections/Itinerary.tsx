import type { ItineraryDay } from "@/data/types";

/** Day-by-day accordion using native details/summary (keyboard + no-JS friendly). */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="border-t border-navy">
      {days.map((d, i) => (
        <li key={i} className="border-b border-rule">
          <details className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-baseline gap-[1.5rem] py-[1.3rem] [&::-webkit-details-marker]:hidden">
              <span className="w-[6.5rem] shrink-0 font-mono text-[0.78rem] uppercase text-slate">{d.day}</span>
              <span className="flex-1 font-display text-[1.9rem] font-extrabold lowercase leading-[0.95] tracking-[-0.03em] [font-stretch:75%] md:text-[2.4rem]">{d.title}</span>
              <span aria-hidden className="grid h-[2rem] w-[2rem] shrink-0 place-items-center rounded-full bg-snow transition-transform duration-500 group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-[44rem] pb-[1.5rem] pl-0 text-[1.02rem] leading-[1.6] text-slate md:pl-[8rem]">{d.body}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
