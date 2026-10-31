import { Suspense } from "react";
import { PlannerFromQuery } from "@/components/planner/PlannerFromQuery";

export default function PlanModal() {
  return (
    <Suspense>
      <PlannerFromQuery modal />
    </Suspense>
  );
}
