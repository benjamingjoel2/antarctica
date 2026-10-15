"use client";

import { useSearchParams } from "next/navigation";
import { Planner } from "./Planner";
import { PlannerModal } from "./PlannerModal";

/** Reads ?route= on the client so the planner page can stay static. */
export function PlannerFromQuery({ modal = false }: { modal?: boolean }) {
  const route = useSearchParams().get("route") ?? undefined;
  return modal ? <PlannerModal initialRoute={route} /> : <Planner initialRoute={route} />;
}
