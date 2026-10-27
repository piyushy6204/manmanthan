import Image from "next/image";
import Link from "next/link";
import { areasOfHelp } from "@/lib/areas";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const { contact } = siteConfig;
  const hasContact = contact.phone || contact.email || contact.address;
  return (
    <footer className="on-dark bg-forest text-ivory">
      <div className="container-x pb-8 pt-12 lg:pt-16">
        <div className="grid gap-9 lg:grid-cols-[40fr_60fr] lg:gap-12">
          <div>
            <div className="inline-block bg-[#FCF8F3] p-1">
              <Image src={siteConfig.images.logoFull.src} alt={siteConfig.images.logoFull.alt} width={1000} height={1000} sizes="160px" className="h-auto w-28 sm:w-36" />
            </div>
            <p className="mt-4 font-serif text-[1.3rem] italic text-ivory">{siteConfig.tagline}</p>
            <p className="mt-2 max-w-[26rem] text-[0.9375rem] leading-[1.65] text-sage">
              Mann Manthan is a counselling psychology practice offering a safe space to understand, heal and grow, founded by {siteConfig.counsellor.name}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            <div>
              <h2 className="font-serif text-[1.125rem] text-ivory">Explore</h2>
              <ul className="mt-3 space-y-0.5">
                {siteConfig.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={`/${n.href}`} className="inline-flex min-h-[40px] items-center text-[0.98rem] text-sage hover:text-ivory">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-[1.125rem] text-ivory">Areas of Help</h2>
              <ul className="mt-3 space-y-0.5">
                {areasOfHelp.map((a) => (
                  <li key={a.id}>
                    <Link href="/#areas" className="inline-flex min-h-[40px] items-center text-[0.98rem] text-sage hover:text-ivory">{a.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="font-serif text-[1.125rem] text-ivory">Contact</h2>
              <ul className="mt-3 space-y-0.5 text-[0.98rem] text-sage">
                <li>
                  <Link href="/#contact" className="inline-flex min-h-[40px] items-center hover:text-ivory">Send an enquiry</Link>
                </li>
                {contact.phoneHref && (
                  <li><a href={contact.phoneHref} className="inline-flex min-h-[40px] items-center hover:text-ivory">+{contact.phone}</a></li>
                )}
                {contact.whatsappHref && (
                  <li><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center hover:text-ivory">WhatsApp</a></li>
                )}
                {contact.emailHref && (
                  <li><a href={contact.emailHref} className="inline-flex min-h-[40px] items-center break-all hover:text-ivory">{contact.email}</a></li>
                )}
                {contact.address && <li className="py-2">{contact.address}</li>}
              </ul>
              {!hasContact && <p className="mt-2 text-[0.9rem] text-sage/80">More ways to get in touch will be added here.</p>}
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-gold/40 pt-6 text-[0.9rem] text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="inline-flex min-h-[40px] items-center hover:text-ivory">Privacy Policy</Link></li>
            <li><Link href="/terms" className="inline-flex min-h-[40px] items-center hover:text-ivory">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
