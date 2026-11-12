import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

/**
 * Enquiry endpoint. The browser posts the form here; the keys below stay on the server.
 *
 * Delivery, in order of preference:
 *  1. EmailJS (defaults below; override with EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID / EMAILJS_PUBLIC_KEY; optional EMAILJS_PRIVATE_KEY).
 *  2. A generic webhook (ENQUIRY_WEBHOOK_URL).
 * If neither is configured the route answers 501, so the page never claims an enquiry was sent when it was not.
 */
const DEFAULT_SERVICE_ID = "service_nkefuxt";
const DEFAULT_TEMPLATE_ID = "template_hgnvu2i";
const DEFAULT_PUBLIC_KEY = "7trNe3iKPLF7UxQkO";
const EMAILJS_URL = process.env.EMAILJS_API_URL ?? "https://api.emailjs.com/api/v1.0/email/send";

async function postJson(url: string, payload: unknown) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    return await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

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

  // Honeypot: pretend success to bots without sending anything.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  // These three identifiers are not secret (EmailJS shows them to browsers by design), so the Mann Manthan account values
  // are the defaults. Vercel environment variables, if set, take priority. The PRIVATE key must only ever come from an env var.
  const serviceId = process.env.EMAILJS_SERVICE_ID || DEFAULT_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID || DEFAULT_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || DEFAULT_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  try {
    if (serviceId && templateId && publicKey) {
      const res = await postJson(EMAILJS_URL, {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        // These names are the {{variables}} used in the EmailJS template (see docs/emailjs-email-template.html).
        template_params: {
          name: input.name.trim(),
          email: input.email.trim(),
          reply_to: input.email.trim(),
          phone: input.phone.trim(),
          format: input.format,
          preferred_date: input.date || "Not specified",
          message: input.message.trim() || "No message",
          submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST",
        },
      });
      if (!res.ok) {
        console.error("EmailJS rejected the enquiry:", res.status, await res.text().catch(() => ""));
        return NextResponse.json({ error: "upstream" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (webhook) {
      const { website: _omit, ...payload } = input;
      void _omit;
      const res = await postJson(webhook, { ...payload, source: "Mann Manthan website", receivedAt: new Date().toISOString() });
      return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error("Enquiry delivery failed:", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 501 });
}
