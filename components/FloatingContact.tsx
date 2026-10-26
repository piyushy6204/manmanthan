"use client";
import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Two discreet floating controls, bottom right.
 * They stay out of the way in the hero and while the booking section is on screen, so they never cover the form.
 * If a number has not been configured, they point to the enquiry form rather than a made-up number.
 */
export default function FloatingContact() {
  const [inContact, setInContact] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const hidden = inContact || !pastHero;
  const { contact } = siteConfig;

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInContact(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The hero has its own calls to action, so the floats appear once the visitor scrolls past it.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_4px_12px_-6px_rgba(7,63,50,0.5)] transition-transform duration-200 ease-calm hover:-translate-y-0.5 active:scale-95 sm:h-12 sm:w-12";

  return (
    <div
      className={`fixed right-4 z-30 flex flex-col gap-3 transition-opacity duration-300 sm:right-6 ${hidden ? "pointer-events-none invisible opacity-0" : "opacity-100"}`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={contact.whatsappHref || siteConfig.bookingHref}
        {...(contact.whatsappHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label="Contact on WhatsApp"
        className={`${base} border-gold/70 bg-ivory text-forest`}
      >
        <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a href={contact.phoneHref || siteConfig.bookingHref} aria-label="Call the counsellor" className={`${base} border-gold bg-forest text-white`}>
        <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
