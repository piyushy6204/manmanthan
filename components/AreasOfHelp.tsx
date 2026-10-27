"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BatteryLow, CloudDrizzle, Flame, Minus, Plus, Sprout, Waves, Wind, type LucideIcon } from "lucide-react";
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
        <h3 className="font-serif text-[clamp(1.4rem,1.2rem+0.8vw,1.75rem)] font-medium leading-tight text-ivory">{area.name}</h3>
      </div>
      <p className="mt-1.5 max-w-[26rem] text-base leading-[1.65] text-sage md:min-h-[4.95rem]">{area.description}</p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-medium text-ivory underline decoration-gold/70 decoration-1 underline-offset-[6px] hover:decoration-ivory"
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
            <p className="mt-1 max-w-[26rem] border-l border-gold/70 pl-4 font-serif text-[1.1875rem] italic leading-[1.45] text-ivory">{area.more}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Mobile only: photo tiles. Tapping a tile shows its description and expander in the panel below. */
function AreaTiles() {
  const [selected, setSelected] = useState<(typeof areasOfHelp)[number]["id"]>(areasOfHelp[0].id);
  const [open, setOpen] = useState(false);
  const area = areasOfHelp.find((a) => a.id === selected) ?? areasOfHelp[0];
  const Icon = icons[area.icon];
  const panelRef = useRef<HTMLDivElement>(null);

  // The panel sits below the tiles; bring it into view after a tap so the change is never off-screen.
  const showPanel = () =>
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    });

  return (
    <div className="mt-8 md:hidden">
      <ul className="grid grid-cols-2 gap-2.5">
        {areasOfHelp.map((a) => {
          const on = a.id === selected;
          return (
            <li key={a.id}>
              <button
                type="button"
                aria-pressed={on}
                aria-controls="area-panel"
                onClick={() => {
                  setSelected(a.id);
                  setOpen(false);
                  showPanel();
                }}
                className={`relative block aspect-[1/1.05] w-full overflow-hidden rounded-[3px] text-left outline-offset-2 transition-[outline-color,filter] duration-300 ${
                  on ? "outline outline-2 outline-gold" : "outline outline-2 outline-transparent"
                }`}
              >
                <Image src={a.photo} alt="" fill sizes="(max-width: 767px) 46vw, 0px" className={`object-cover transition-[filter] duration-300 ${on ? "" : "brightness-[0.8]"}`} />
                <span className="absolute inset-x-0 top-0 bg-forest/85 px-2.5 py-2.5 font-serif text-[1.1875rem] font-bold leading-[1.15] text-ivory [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">{a.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={panelRef} id="area-panel" aria-live="polite" className="mt-3.5 scroll-mb-24 border border-gold/60 bg-ivory p-4 text-ink">
        <div className="flex items-center gap-2.5">
          <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 shrink-0 text-gold" />
          <h3 className="font-serif text-[1.625rem] font-medium leading-none text-forest">{area.name}</h3>
        </div>
        <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-ink/90">{area.description}</p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="area-panel-more"
          onClick={() => setOpen((v) => !v)}
          className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-medium text-forest underline decoration-gold decoration-1 underline-offset-[6px] focus-visible:!outline-forest"
        >
          {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
          {open ? "Less" : "How this can look in sessions"}
          <span className="sr-only"> for {area.name}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="area-panel-more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-1 border-l border-gold pl-3.5 font-serif text-[1.1875rem] italic leading-[1.45] text-forest">{area.more}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AreasOfHelp() {
  return (
    <section id="areas" aria-labelledby="areas-heading" className="on-dark bg-forest section-y">
      <div className="container-x">
        <Reveal className="grid items-end gap-4 lg:grid-cols-2 lg:gap-12">
          <h2 id="areas-heading" className="h2 max-w-[20ch] !text-ivory">
            What would you like to understand better?
          </h2>
          <p className="max-w-[34rem] text-base leading-[1.65] text-sage sm:text-[1.0625rem]">
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
          <p className="max-w-[40rem] text-[0.875rem] leading-[1.6] text-sage">
            Whether counselling is suitable, and what support you may need, is discussed individually. This website cannot diagnose any condition.
          </p>
          <Button href={siteConfig.bookingHref} variant="light" className="shrink-0">
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
}
