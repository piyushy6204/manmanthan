"use client";
import { useState } from "react";
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
    <li id={`area-${area.id}`} className="border-t border-sage/30 pb-4 pt-6">
      <Icon aria-hidden="true" strokeWidth={1.1} className="h-7 w-7 text-gold" />
      <h3 className="mt-3 font-serif text-[clamp(1.4rem,1.2rem+0.8vw,1.75rem)] font-medium leading-tight text-ivory">{area.name}</h3>
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

export default function AreasOfHelp() {
  const { bannerDark } = siteConfig.images;
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

        <Reveal className="relative mt-8 aspect-[16/7] overflow-hidden sm:aspect-[5/2] lg:mt-10 lg:aspect-[1376/459]">
          <Image src={bannerDark.src} alt="" width={bannerDark.width} height={bannerDark.height} sizes="100vw" className="h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 border border-gold/50" />
        </Reveal>

        <ul className="mt-6 grid items-start gap-x-10 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-x-12">
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
