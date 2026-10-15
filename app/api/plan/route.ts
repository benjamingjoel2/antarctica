import { NextResponse } from "next/server";
import { plannerSchema } from "@/lib/planner-schema";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = plannerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const reference = `SC-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  console.log("[planner] new enquiry", reference, JSON.stringify(parsed.data));
  // TODO: email/CRM integration — e.g. send to the specialist inbox and create a CRM lead
  // (HubSpot / Pipedrive / Airtable). Include `reference` so the guest can quote it.
  return NextResponse.json({ ok: true, reference });
}
