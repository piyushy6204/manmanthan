/** Shared (client + server) enquiry validation. Collects the minimum needed to reply. */
export type SessionFormat = "Online" | "Offline";

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  format: SessionFormat | "";
  date: string;
  message: string;
  consent: boolean;
  website: string; // honeypot, must stay empty
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry: EnquiryInput = { name: "", email: "", phone: "", format: "", date: "", message: "", consent: false, website: "" };
export const MESSAGE_MAX = 500;

export function validateEnquiry(v: EnquiryInput, today?: string): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = v.name.trim();
  if (!name) e.name = "Please enter your name.";
  else if (name.length > 100) e.name = "Please keep your name under 100 characters.";

  const email = v.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Please enter a valid email address, for example name@example.com.";

  const phoneDigits = v.phone.replace(/[\s\-()+.]/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a phone number we can reach you on.";
  else if (!/^\d{7,15}$/.test(phoneDigits)) e.phone = "Please enter a valid phone number using digits, with the country code if outside India.";

  if (v.format !== "Online" && v.format !== "Offline") e.format = "Please choose Online or Offline.";

  if (v.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date)) e.date = "Please choose a valid date.";
    else if (today && v.date < today) e.date = "Please choose today or a later date.";
  }

  if (v.message.length > MESSAGE_MAX) e.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (!v.consent) e.consent = "Please tick the box so we know we may contact you about this enquiry.";
  return e;
}
