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
    <section className="bg-glacier pt-[8rem] pb-[8rem] md:pt-[10rem]">
      <div className="container-site">
        <div className="grid-site gap-y-[2rem]">
          <div className="col-span-12 lg:col-span-3">
            <p className="t-label text-slate">Expedition planner</p>
            <h1 className="mt-[1rem] t-h3 normal-case">Plan my expedition</h1>
            <p className="mt-[1rem] text-[0.95rem] text-slate">
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
