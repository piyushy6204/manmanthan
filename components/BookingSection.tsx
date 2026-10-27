import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import BookingForm from "./BookingForm";
import Reveal from "./Reveal";

export default function BookingSection() {
  const { contact, images } = siteConfig;
  const { contactArt } = images;
  const methods = [
    contact.whatsappHref && { icon: MessageCircle, label: "WhatsApp", href: contact.whatsappHref, external: true, aria: "Contact on WhatsApp" },
    contact.phoneHref && { icon: Phone, label: `Call +${contact.phone}`, href: contact.phoneHref, external: false, aria: "Call the counsellor" },
    contact.emailHref && { icon: Mail, label: contact.email, href: contact.emailHref, external: false, aria: `Email ${contact.email}` },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string; external: boolean; aria: string }[];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-sage/15 section-y">
      <div className="container-x grid items-start gap-7 lg:grid-cols-[45fr_55fr] lg:items-stretch lg:gap-12">
        <Reveal className="flex flex-col">
          <h2 id="contact-heading" className="h2">
            Your space to begin.
          </h2>
          <p className="lede mt-3">
            You do not need to have everything figured out before reaching out. Start with a conversation about what you need.
          </p>

          {methods.length > 0 && (
            <ul className="mt-6 space-y-0.5 border-t border-gold/50 pt-4">
              {methods.map(({ icon: Icon, label, href, external, aria }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={aria}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex min-h-[48px] items-center gap-3 text-base text-forest hover:text-ink"
                  >
                    <Icon size={22} strokeWidth={1.25} aria-hidden="true" className="text-forest" />
                    <span className="underline decoration-gold/70 underline-offset-[6px]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 max-w-[26rem] border-t border-gold/50 pt-4 small-copy">
            This form is for appointment enquiries only. If you are in immediate danger or need urgent help, please contact your local emergency services.
          </p>

          {/* Fills the remaining height beside the form on desktop so both columns end together */}
          <div className="relative mt-6 hidden min-h-[13rem] flex-1 overflow-hidden lg:block">
            <Image src={contactArt.src} alt="" fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
