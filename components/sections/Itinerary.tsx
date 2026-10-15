import type { ItineraryDay } from "@/data/types";

/** Day-by-day accordion (native details/summary), mono day + regular title. */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="border-t border-ice/20">
      {days.map((d, i) => (
        <li key={i} className="border-b border-ice/20">
          <details className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-baseline gap-[1.5rem] py-[1.2rem] [&::-webkit-details-marker]:hidden">
              <span className="t-mono w-[6.5rem] shrink-0 opacity-60">{d.day}</span>
              <span className="t-h3 flex-1">{d.title}</span>
              <span aria-hidden className="t-mono shrink-0 transition-transform duration-500 group-open:rotate-45">+</span>
            </summary>
            <p className="t-small max-w-[40rem] pb-[1.4rem] opacity-80 md:pl-[8rem]">{d.body}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
