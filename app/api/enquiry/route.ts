import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 * Forwards a validated enquiry to ENQUIRY_WEBHOOK_URL (server-side only, never exposed to the browser).
 * If no webhook is configured it answers 501 so the UI never claims an enquiry was sent when it was not.
 */
export async function POST(req: Request) {
  let body: Partial<EnquiryInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input: EnquiryInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    format: body.format === "Online" || body.format === "Offline" ? body.format : "",
    date: String(body.date ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
    website: String(body.website ?? ""),
  };

  // Honeypot: pretend success to bots without forwarding anything.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "not_configured" }, { status: 501 });

  try {
    const { website: _omit, ...payload } = input;
    void _omit;
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "Mann Manthan website", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
