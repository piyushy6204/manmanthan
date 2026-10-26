"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  activeId: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileDrawer({ open, onClose, onNavigate, activeId }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { contact } = siteConfig;

  // Lock background scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const whatsappProps = contact.whatsappHref
    ? { href: contact.whatsappHref, target: "_blank", rel: "noopener noreferrer" }
    : { href: siteConfig.bookingHref };
  const phoneProps = contact.phoneHref ? { href: contact.phoneHref } : { href: siteConfig.bookingHref };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-forest/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto bg-ivory shadow-[-12px_0_40px_-20px_rgba(7,63,50,0.5)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/40 px-5 py-3">
              <Image src={siteConfig.images.logoLockup.src} alt={siteConfig.name} width={siteConfig.images.logoLockup.width} height={siteConfig.images.logoLockup.height} sizes="180px" className="h-9 w-auto" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-[3px] text-forest hover:bg-forest/[0.06]"
              >
                <X size={24} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-5 py-4">
              <ul>
                {siteConfig.nav.map((item) => {
                  const active = activeId === item.href.slice(1);
                  return (
                    <li key={item.href} className="border-b border-forest/10">
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(item.href);
                        }}
                        aria-current={active ? "location" : undefined}
                        className={`flex min-h-[52px] items-center font-serif text-[1.5rem] leading-none ${active ? "text-forest" : "text-forest"}`}
                      >
                        {active && <span className="mr-3 h-px w-5 bg-gold" aria-hidden="true" />}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto space-y-4 px-5 pb-6 safe-bottom">
              <a
                href={siteConfig.bookingHref}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(siteConfig.bookingHref);
                }}
                className="btn btn-primary w-full"
              >
                Book a Session
              </a>
              <div className="flex gap-3">
                <a {...whatsappProps} className="btn btn-secondary flex-1 !px-3" aria-label="Contact on WhatsApp">
                  <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
                  WhatsApp
                </a>
                <a {...phoneProps} className="btn btn-secondary flex-1 !px-3" aria-label="Call the counsellor">
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
