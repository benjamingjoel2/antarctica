import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), company: z.unknown().optional() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  if (parsed.data.company) return NextResponse.json({ ok: true }); // honeypot: silently drop bots
  console.log("[newsletter] signup", { email: parsed.data.email, at: new Date().toISOString() });
  // TODO: send to email marketing platform (respect consent + double opt-in).
  return NextResponse.json({ ok: true });
}
