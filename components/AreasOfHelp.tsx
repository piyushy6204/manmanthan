"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BatteryLow, CloudDrizzle, Flame, Minus, Plus, Sprout, Waves, Wind, X, type LucideIcon } from "lucide-react";
import { areasOfHelp } from "@/lib/areas";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import Button from "./Button";
import Reveal from "./Reveal";

const icons: Record<string, LucideIcon> = { Wind, CloudDrizzle, Waves, BatteryLow, Flame, Sprout };

function AreaRow({ area }: { area: (typeof areasOfHelp)[number] }) {
  const [open, setOpen] = useState(false);
  const Icon = icons[area.icon];
  const panelId = `area-more-${area.id}`;
  return (
    <li id={`area-${area.id}`} className="pb-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
        <Image src={area.photoWide} alt="" fill sizes="(min-width: 1024px) 24rem, 46vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 border border-gold/40" />
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <Icon aria-hidden="true" strokeWidth={1.1} className="h-6 w-6 shrink-0 text-gold" />
        <h3 className="font-serif text-[clamp(1.4rem,1.2rem+0.8vw,1.75rem)] font-medium leading-tight text-forest">{area.name}</h3>
      </div>
      <p className="mt-1.5 max-w-[26rem] text-base leading-[1.65] text-ink/85 md:min-h-[4.95rem]">{area.description}</p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-medium text-forest underline decoration-gold decoration-1 underline-offset-[6px] hover:decoration-forest"
      >
        {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        {open ? "Less" : "How this can look in sessions"}
        <span className="sr-only"> for {area.name}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${area.name}: more detail`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-1 max-w-[26rem] border-l border-gold pl-4 font-serif text-[1.1875rem] italic leading-[1.45] text-forest">{area.more}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

type Area = (typeof areasOfHelp)[number];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Mobile only: photo tiles. Tapping a tile opens a popup with the topic's description and session detail. */
function AreaTiles() {
  const [current, setCurrent] = useState<Area | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setCurrent(null);
    triggerRef.current?.focus();
  }, []);

  // Lock background scroll, move focus into the popup, trap Tab, close on Escape.
  const isOpen = current !== null;
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
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
  }, [isOpen, close]);

  return (
    <div className="mt-8 md:hidden">
      <ul className="grid grid-cols-2 gap-2.5">
        {areasOfHelp.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setCurrent(a);
              }}
              className="relative block aspect-[1/1.05] w-full overflow-hidden rounded-[3px] text-left transition-transform duration-200 active:scale-[0.98]"
            >
              <Image src={a.photo} alt="" fill sizes="(max-width: 767px) 46vw, 0px" className="object-cover" />
              <span className="absolute inset-x-0 top-0 bg-forest/85 px-2 py-2 font-serif text-[0.9375rem] font-medium leading-[1.15] text-ivory min-[380px]:px-2.5 min-[380px]:text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">{a.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {current && <AreaPopup key={current.id} area={current} dialogRef={dialogRef} closeRef={closeRef} onClose={close} />}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function AreaPopup({
  area,
  dialogRef,
  closeRef,
  onClose,
}: {
  area: Area;
  dialogRef: React.RefObject<HTMLDivElement | null>;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const Icon = icons[area.icon];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:hidden" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))", paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
      <motion.div
        className="absolute inset-0 bg-forest/70 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="area-popup-title"
        className="relative max-h-full w-full max-w-[26rem] overflow-y-auto border border-gold/60 bg-ivory text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image src={area.photoWide} alt="" fill sizes="26rem" className="object-cover" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-forest/85 text-ivory hover:bg-forest"
          >
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <div className="p-5 pb-6">
          <div className="flex items-center gap-2.5">
            <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 shrink-0 text-gold" />
            <h3 id="area-popup-title" className="font-serif text-[1.75rem] font-medium leading-none text-forest">
              {area.name}
            </h3>
          </div>
          <p className="mt-3 text-base leading-[1.65] text-ink/90">{area.description}</p>
          <p className="mt-5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-forest/80">How this can look in sessions</p>
          <p className="mt-2 border-l border-gold pl-4 font-serif text-[1.25rem] italic leading-[1.45] text-forest">{area.more}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AreasOfHelp() {
  return (
    <section id="areas" aria-labelledby="areas-heading" className="bg-mist section-y">
      <div className="container-x">
        <Reveal className="grid items-end gap-4 lg:grid-cols-2 lg:gap-12">
          <h2 id="areas-heading" className="h2 max-w-[20ch]">
            What would you like to understand better?
          </h2>
          <p className="max-w-[34rem] text-base leading-[1.65] text-ink/85 sm:text-[1.0625rem]">
            Everyone&apos;s experiences are different. Counselling offers a space to explore what you are going through and work towards healthier ways of coping.
          </p>
        </Reveal>

        <AreaTiles />

        <ul className="mt-9 hidden items-start gap-x-10 gap-y-8 md:grid md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-12">
          {areasOfHelp.map((area) => (
            <AreaRow key={area.id} area={area} />
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-5 border-t border-gold/50 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <p className="max-w-[40rem] text-[0.875rem] leading-[1.6] text-ink/70">
            Whether counselling is suitable, and what support you may need, is discussed individually. This website cannot diagnose any condition.
          </p>
          <Button href={siteConfig.bookingHref} className="shrink-0">
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
}
