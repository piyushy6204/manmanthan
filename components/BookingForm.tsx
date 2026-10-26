"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { emptyEnquiry, MESSAGE_MAX, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "failed";

function localToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[0.9rem] leading-snug text-danger">
      <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

export default function BookingForm() {
  const [values, setValues] = useState<EnquiryInput>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [today, setToday] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { contact } = siteConfig;

  useEffect(() => setToday(localToday()), []);

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "submitting") return;
    const found = validateEnquiry(values, today || undefined);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]');
        first?.focus();
      });
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (res.ok) setStatus("sent");
      else if (res.status === 501) setStatus("not_configured");
      else if (res.status === 422) {
        const data = await res.json().catch(() => null);
        setErrors(data?.errors ?? {});
        setStatus("idle");
      } else setStatus("failed");
    } catch {
      setStatus("failed");
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const describe = (key: keyof EnquiryInput, hint?: string) => [errors[key] ? `${key}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;

  // Fallback contact message: first name and format only, no sensitive detail.
  const prefilled = `Hello, my name is ${values.name.trim() || "[name]"}. I would like to enquire about a ${values.format ? values.format.toLowerCase() : ""} counselling session.`.replace("a  ", "a ");
  const waFallback = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(prefilled)}` : "";

  if (status === "sent") {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="border border-gold/60 bg-ivory p-6 outline-none sm:p-8">
        <h3 className="h3">Your enquiry has been sent.</h3>
        <p className="body-copy mt-3">
          Thank you for reaching out. This is an enquiry, not a confirmed booking. A session is only confirmed once a time has been agreed with you.
        </p>
        <button type="button" className="btn btn-secondary mt-6" onClick={() => { setValues(emptyEnquiry); setErrors({}); setStatus("idle"); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="privacy-note" className="border border-gold/60 bg-ivory p-5 sm:p-8">
      {errorCount > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 border border-danger/50 bg-danger/5 p-4 text-[0.95rem] text-danger outline-none">
          Please check {errorCount === 1 ? "one field" : `${errorCount} fields`} below. Details are shown next to each.
        </div>
      )}

      {(status === "not_configured" || status === "failed") && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 border border-danger/50 bg-danger/5 p-4 text-[0.95rem] leading-[1.6] text-danger outline-none">
          <p className="font-medium">Your enquiry has not been sent.</p>
          <p className="mt-1">
            {status === "not_configured"
              ? "Online enquiries are not switched on for this website yet."
              : "Something went wrong while sending. Please try again in a moment."}
            {(waFallback || contact.emailHref) && " You can reach out directly instead:"}
          </p>
          {(waFallback || contact.emailHref) && (
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {waFallback && (
                <a className="font-medium underline underline-offset-4" href={waFallback} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              )}
              {contact.emailHref && (
                <a className="font-medium underline underline-offset-4" href={contact.emailHref}>
                  Send an email
                </a>
              )}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="field-label">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" className="field" value={values.name} onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={describe("name")} aria-required="true" />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="field-label">Email address</label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className="field" value={values.email} onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={describe("email")} aria-required="true" />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="field-label">Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={values.phone} onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone} aria-describedby={describe("phone")} aria-required="true" />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={describe("format")}>
          <legend className="field-label">Preferred session format</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["Online", "Offline"] as const).map((opt, i) => (
              <label key={opt} className={`flex min-h-[46px] cursor-pointer items-center justify-center rounded-[3px] border px-4 py-2.5 text-base transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest ${
                values.format === opt ? "border-forest bg-forest text-white" : "border-forest/30 text-forest hover:border-forest/60"
              }`}>
                <input type="radio" name="format" value={opt} className="sr-only" checked={values.format === opt} onChange={() => set("format", opt)}
                  data-invalid={i === 0 && !!errors.format ? "true" : undefined} />
                {opt}
              </label>
            ))}
          </div>
          <FieldError id="format-error" message={errors.format} />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="date" className="field-label">
            Preferred appointment date <span className="font-normal text-ink/70">(optional)</span>
          </label>
          <input id="date" name="date" type="date" min={today || undefined} className="field sm:max-w-xs" value={values.date} onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date} aria-describedby={describe("date", "date-hint")} />
          <p id="date-hint" className="mt-1.5 text-[0.9rem] text-ink/70">A guide only. The final time is agreed with you.</p>
          <FieldError id="date-error" message={errors.date} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Message <span className="font-normal text-ink/70">(optional)</span>
          </label>
          <textarea id="message" name="message" rows={4} maxLength={MESSAGE_MAX + 50} className="field resize-y" value={values.message} onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message} aria-describedby={describe("message", "message-hint")} />
          <p id="message-hint" className="mt-1.5 text-[0.9rem] leading-snug text-ink/70">
            A line or two is plenty. Please don&apos;t share detailed personal or health information here. {values.message.length}/{MESSAGE_MAX}
          </p>
          <FieldError id="message-error" message={errors.message} />
        </div>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked)}
              className="mt-1 h-6 w-6 shrink-0 cursor-pointer accent-forest" aria-invalid={!!errors.consent} aria-describedby={describe("consent")} aria-required="true" />
            <label htmlFor="consent" className="cursor-pointer text-[0.98rem] leading-[1.6] text-ink/90">
              I agree to be contacted about this enquiry using the details I have provided.
            </label>
          </div>
          <FieldError id="consent-error" message={errors.consent} />
        </div>
      </div>

      <p id="privacy-note" className="mt-5 small-copy">
        We use these details only to reply to your enquiry. See our{" "}
        <Link href="/privacy" className="text-forest underline underline-offset-4">Privacy Policy</Link>.
        Submitting this form sends an enquiry. It does not book or confirm a session.
      </p>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending enquiry" : "Submit Enquiry"}
      </button>
    </form>
  );
}
