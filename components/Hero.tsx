"use client";
import Image from "next/image";
import { ArrowDown, ArrowRight, Heart, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 0.61, 0.36, 1] as const;

const points = [
  { icon: Leaf, long: "A Safe Space", short: "Safe space" },
  { icon: Heart, long: "Your Own Pace", short: "Own pace" },
  { icon: Sprout, long: "Healing and Growth", short: "Growth" },
];

export default function Hero() {
  const { heroImage } = siteConfig.images;
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Soft green hills, bottom right, as on the mood board */}
      <svg viewBox="0 0 820 220" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="pointer-events-none absolute bottom-0 right-0 h-28 w-[88%] lg:h-52 lg:w-[62%]">
        <path d="M0 220 C90 205 160 110 340 112 C520 114 650 36 820 66 L820 220Z" className="fill-mist" />
        <path d="M180 220 C360 190 540 120 820 138 L820 220Z" className="fill-sage/40" />
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-sand/70 blur-3xl lg:block" />

      <div className="container-x relative grid items-center gap-4 pb-14 pt-2 sm:pb-16 lg:min-h-[min(46rem,calc(100svh-var(--header-h)))] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-10">
        {/* The emblem leads on mobile and sits on the right on desktop */}
        <motion.div
          className="order-first mx-auto w-full max-w-[10.5rem] sm:max-w-[15rem] lg:order-last lg:max-w-[34rem] lg:justify-self-end"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <Image src={heroImage.src} alt={heroImage.alt} width={heroImage.width} height={heroImage.height} priority sizes="(min-width: 1024px) 34rem, 45vw" className="h-auto w-full" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <p className="eyebrow !text-gilt">A Space for You</p>
          <h1 id="hero-heading" className="display-xl mt-3">
            <span className="block">Pause.</span>
            <span className="block">Reflect.</span>
            <span className="block text-gilt">Reconnect.</span>
          </h1>
          <p className="mt-5 font-serif text-[1.125rem] italic leading-snug text-forest sm:text-[1.3rem]">Sometimes, all you need is a moment to pause.</p>
          <p className="mt-2 max-w-[31rem] text-base leading-[1.7] text-ink/85 sm:text-[1.0625rem]">
            A safe space to understand yourself, make sense of your emotions, and move towards healing and growth at your own pace.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a href={siteConfig.bookingHref} className="btn btn-primary">
              Book a Session
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#approach" className="group inline-flex min-h-[44px] items-center gap-2.5 text-[0.9375rem] font-medium text-forest">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ivory">
                <ArrowDown size={17} aria-hidden="true" />
              </span>
              Explore My Approach
            </a>
          </div>

          <ul className="mt-7 flex justify-around gap-3 sm:justify-start sm:gap-9 lg:mt-9">
            {points.map(({ icon: Icon, long, short }) => (
              <li key={long} className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-forest sm:h-auto sm:w-auto sm:bg-transparent sm:text-gilt">
                  <Icon aria-hidden="true" strokeWidth={1.4} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="text-[0.75rem] font-medium text-forest sm:hidden">{short}</span>
                <span className="hidden text-[0.9375rem] font-medium text-forest sm:inline">{long}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
