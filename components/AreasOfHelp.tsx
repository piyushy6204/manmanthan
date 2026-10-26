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
    <li id={`area-${area.id}`} className="border-t border-sage/30 py-5 first:border-t-0 first:pt-0 sm:py-6">
      <div className="grid grid-cols-[1.75rem_1fr] gap-x-4 sm:grid-cols-[2rem_1fr] sm:gap-x-6">
        <Icon aria-hidden="true" strokeWidth={1.1} className="mt-1 h-7 w-7 text-gold" />
        <div>
          <h3 className="font-serif text-[clamp(1.4rem,1.2rem+0.8vw,1.75rem)] font-medium leading-tight text-ivory">{area.name}</h3>
          <p className="mt-1.5 max-w-[34rem] text-base leading-[1.65] text-sage">{area.description}</p>

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
                <p className="mt-1 max-w-[34rem] border-l border-gold/70 pl-4 font-serif text-[1.1875rem] italic leading-[1.45] text-ivory">{area.more}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

export default function AreasOfHelp() {
  const { leafSage } = siteConfig.images;
  return (
    <section id="areas" aria-labelledby="areas-heading" className="on-dark bg-forest section-y">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 id="areas-heading" className="h2 max-w-[18ch] !text-ivory">
              What would you like to understand better?
            </h2>
            <p className="mt-4 max-w-[26rem] text-base leading-[1.65] text-sage">
              Everyone&apos;s experiences are different. Counselling offers a space to explore what you are going through and work towards healthier ways of coping.
            </p>
            <div className="relative mt-6 aspect-[16/6] overflow-hidden sm:aspect-[16/5] lg:mt-8 lg:aspect-[4/5] lg:max-w-[20rem]">
              <Image src={leafSage.src} alt="" width={leafSage.width} height={leafSage.height} sizes="(min-width: 1024px) 20rem, 100vw" className="h-full w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 border border-gold/50" />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul>
            {areasOfHelp.map((area) => (
              <AreaRow key={area.id} area={area} />
            ))}
          </ul>

          <div className="mt-8 border-t border-gold/50 pt-7">
            <Button href={siteConfig.bookingHref} variant="light">
              Book a Session
            </Button>
            <p className="mt-4 max-w-[34rem] text-[0.875rem] leading-[1.6] text-sage">
              Whether counselling is suitable, and what support you may need, is discussed individually. This website cannot diagnose any condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
