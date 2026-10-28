import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import BookingForm from "./BookingForm";
import { ArcRing, BackdropSprig } from "./BackdropArt";
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
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-sage/30 section-y">
      <ArcRing className="-bottom-20 -left-20 h-56 w-56 text-gold/60 lg:-bottom-28 lg:-left-28 lg:h-[24rem] lg:w-[24rem]" />
      <BackdropSprig className="-right-2 top-2 h-28 w-16 -rotate-[12deg] text-forest/20 lg:right-3 lg:top-6 lg:h-36 lg:w-20" />
      <div className="container-x relative grid items-start gap-7 lg:grid-cols-[45fr_55fr] lg:items-stretch lg:gap-12">
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

          {/* Fills the remaining height beside the form on desktop so both columns end together */}
          <div className="relative mt-6 hidden min-h-[13rem] flex-1 overflow-hidden lg:block">
            <Image src={contactArt.src} alt="" fill sizes="(min-width: 1024px) 40vw, 0px" className="object-cover object-[60%_50%]" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
