/**
 * Central, editable site configuration.
 * Contact details are read from environment variables (see .env.example) so nothing is invented.
 * When a value is blank, the UI falls back to the enquiry form instead of showing a dead link.
 */

const digits = (v?: string) => (v ?? "").replace(/\D/g, "");

const phone = digits(process.env.NEXT_PUBLIC_PHONE);
const whatsapp = digits(process.env.NEXT_PUBLIC_WHATSAPP) || phone;
const email = (process.env.NEXT_PUBLIC_EMAIL ?? "").trim();

export const siteConfig = {
  name: "Mann Manthan",
  tagline: "Pause. Reflect. Reconnect.",
  supporting: "A safe space to understand, heal and grow.",
  title: "Mann Manthan | Counselling Psychology",
  description:
    "Mann Manthan is a counselling psychology practice founded by Harsha Lakhwani. A safe space to pause, reflect and understand yourself through a compassionate, CBT-informed approach to counselling.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  counsellor: {
    name: "Harsha Lakhwani",
    title: "Counselling Psychologist | Certified CBT Practitioner",
    /** Set to e.g. "/images/harsha.jpg" once her photograph is supplied. */
    photo: null as string | null,
    photoAlt: "Portrait of Harsha Lakhwani",
  },
  contact: {
    phone, // digits only
    whatsapp,
    email,
    phoneHref: phone ? `tel:+${phone}` : "",
    whatsappHref: whatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about a counselling session.")}`
      : "",
    emailHref: email ? `mailto:${email}` : "",
    /** Address, social profiles: add only when supplied. */
    address: "",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Areas of Help", href: "#areas" },
    { label: "My Approach", href: "#approach" },
    { label: "The Process", href: "#process" },
    { label: "FAQs", href: "#faq" },
  ],
  bookingHref: "#contact",
  /** Image slots: swap files in /public/images and update here. */
  images: {
    logoFull: { src: "/images/logo-full.jpg", alt: "Mann Manthan logo: a green profile with leaves and a gold arc" },
    logoWordmark: { src: "/images/logo-wordmark.png", alt: "Mann Manthan" },
    /** Emblem and wordmark from the original logo, arranged side by side for the header and drawer. */
    logoLockup: { src: "/images/logo-lockup.png", alt: "Mann Manthan", width: 1209, height: 300 },
    /** Decorative natural-light textures. Replace with real photography when available (keep the same file names or update here). */
    leafLight: { src: "/images/leaf-light-wide.jpg", width: 1600, height: 900 },
    leafSage: { src: "/images/leaf-sage-tall.jpg", width: 900, height: 1200 },
    portraitSlot: { src: "/images/light-portrait-slot.jpg", width: 900, height: 1125 },
    heroEmblem: { src: "/images/logo-emblem.png", alt: "" },
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
