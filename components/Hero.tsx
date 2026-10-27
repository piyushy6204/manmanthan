"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import Button from "./Button";
import Sprig from "./Sprig";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  const { heroImage } = siteConfig.images;
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-8 pb-12 pt-3 sm:gap-10 sm:pb-16 sm:pt-6 lg:min-h-[min(44rem,calc(100svh-var(--header-h)))] lg:grid-cols-[55fr_45fr] lg:gap-12 lg:py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <p className="eyebrow">A Space for You</p>
          <h1 id="hero-heading" className="display mt-4 max-w-[22ch]">
            Sometimes, all you need is a moment to pause.
          </h1>
          <p className="mt-4 max-w-[31rem] text-base leading-[1.7] text-ink/85 sm:text-[1.0625rem]">
            A safe space to understand yourself, make sense of your emotions, and move towards healing and growth at your own pace.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button href={siteConfig.bookingHref}>Book a Session</Button>
            <Button href="#approach" variant="secondary">
              Explore My Approach
            </Button>
          </div>

          <div className="mt-8 sm:mt-10">
            <span aria-hidden="true" className="mb-3 block h-px w-10 bg-gold" />
            <p className="font-serif text-[1.1875rem] italic tracking-[0.03em] text-forest sm:text-[1.3rem]">{siteConfig.tagline}</p>
          </div>
        </motion.div>

        {/* Arch composition with the hero photograph (see lib/site-config.ts) */}
        <div className="relative mx-auto w-full max-w-[13.5rem] sm:max-w-[19rem] lg:max-w-[26rem] lg:justify-self-end">
          <div aria-hidden="true" className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-t-full border border-gold/70 sm:translate-x-4 sm:translate-y-4" />
          <motion.div
            className="relative aspect-[896/1053] overflow-hidden rounded-t-full bg-sage/20"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 26rem, 60vw"
              className="object-cover"
            />
          </motion.div>
          <Sprig className="absolute -left-9 bottom-[-1rem] hidden h-32 w-20 text-sage sm:block" />
        </div>
      </div>
    </section>
  );
}
