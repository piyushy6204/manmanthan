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
    photo: "/images/harsha.jpg" as string | null,
    photoWidth: 1004,
    photoHeight: 1280,
    photoAlt: "Portrait of Harsha Lakhwani",
    /** true = the photo has a plain white background: it is blended into the warm arch (no white box). Set false for a photo with its own background. */
    photoBlend: false,
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
    /** Hero artwork: the brand emblem (profile, leaves, golden ring), as on the mood board. */
    heroImage: { src: "/images/logo-emblem.png", alt: "", width: 730, height: 650 },
    /** Section imagery. Client-supplied illustrations and artwork; AI-generated stand-ins where noted. */
    introBg: { src: "/images/intro-leaves.jpg", width: 1250, height: 768 },
    bannerLight: { src: "/images/intro-diptych.jpg", width: 1600, height: 639 },
    /** The two halves of the supplied banner, trimmed of their pale margins. */
    introProfile: { src: "/images/intro-profile.jpg", width: 723, height: 560 },
    introLandscape: { src: "/images/intro-landscape.jpg", width: 723, height: 560 },
    processArt: { src: "/images/process-journey.jpg", width: 728, height: 588 },
    contactArt: { src: "/images/contact-books.jpg", width: 740, height: 580 },
    /** About portrait placeholder (armchair room) until Harsha's own photograph is supplied via counsellor.photo. */
    portraitSlot: { src: "/images/about-armchair.jpg", width: 480, height: 600 },
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
