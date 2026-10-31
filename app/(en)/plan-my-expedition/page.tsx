import { Suspense } from "react";
import { PlannerFromQuery } from "@/components/planner/PlannerFromQuery";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan my expedition",
  description: "Five short steps. One polar specialist matches you with the right Antarctic ship, route and season.",
  path: "/plan-my-expedition",
});

export default function PlanPage() {
  return (
    <section className="bg-ice pb-[8rem] pt-[7rem] text-ink">
      <div className="container-site">
        <div className="grid-site gap-y-[2rem]">
          <div className="col-span-12 lg:col-span-3">
            <p className="t-mono opacity-60">Expedition planner</p>
            <h1 className="t-h2 mt-[0.8rem]">Plan my expedition</h1>
            <p className="t-small mt-[1rem] opacity-70">
              Five steps, about three minutes. No payment, no obligation: just enough for your specialist to shortlist the right
              voyages.
            </p>
            <VerifyNote className="mt-[1.5rem]">Rules and limits mentioned here are placeholders to verify with partner operators and IAATO.</VerifyNote>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <Suspense>
              <PlannerFromQuery />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
