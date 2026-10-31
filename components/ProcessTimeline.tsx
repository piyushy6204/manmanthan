"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, MessageCircle, Sprout, Video, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Button from "./Button";
import Image from "next/image";
import Reveal from "./Reveal";

const steps: { n: string; icon: LucideIcon; title: string; text: string }[] = [
  { n: "01", icon: MessageCircle, title: "Book a Session", text: "Reach out to enquire about an appointment and discuss your requirements." },
  { n: "02", icon: CalendarCheck, title: "Finalise a Time", text: "Choose a mutually suitable appointment time." },
  { n: "03", icon: Video, title: "Attend Your Session", text: "Meet online or offline, depending on the arrangements confirmed with the counsellor." },
  { n: "04", icon: Sprout, title: "Continue Your Journey", text: "Move forward at your own pace, exploring your concerns and working towards meaningful goals." },
];

const STEP_GAP = 0.7; // seconds between steps on desktop

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return desktop;
}

export default function ProcessTimeline() {
  const { processArt } = siteConfig.images;
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  // Desktop: steps appear one after another. Mobile: each step appears as it scrolls into view.
  const stepDelay = (i: number) => (desktop && !reduced ? i * STEP_GAP : 0);
  return (
    <section id="process" aria-labelledby="process-heading" className="relative overflow-hidden bg-sand section-y">
      <div className="container-x relative">
        <Reveal>
          <h2 id="process-heading" className="h2 text-center sm:whitespace-nowrap">
            Taking the first step can be simple.
          </h2>
        </Reveal>

        <ol className="relative mt-9 grid gap-7 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gold/70 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: STEP_GAP * 4, ease: "linear" }}
          />
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-gold/70 lg:hidden" />

          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative pl-9 lg:pl-0 lg:pt-10"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: desktop ? 0.2 : 0.6 }}
              transition={{ duration: 0.5, delay: stepDelay(i), ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span aria-hidden="true" className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-gold bg-ivory lg:top-0" />
              <div className="flex items-center gap-3">
                <s.icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 text-forest" />
                <p className="font-serif text-[1.375rem] leading-none text-forest/70">{s.n}</p>
              </div>
              <h3 className="h3 mt-2">{s.title}</h3>
              <p className="mt-1.5 max-w-[18rem] justify-copy text-[0.9375rem] leading-[1.65] text-ink/90">{s.text}</p>
            </motion.li>
          ))}
        </ol>

        <Reveal className="mt-9 grid items-center gap-6 lg:mt-12 lg:grid-cols-[1fr_28rem] lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <Button href={siteConfig.bookingHref}>Let&apos;s Get Started</Button>
            <p className="max-w-[34rem] small-copy">
              Sending an enquiry is the first step. A session is only confirmed once a time has been agreed with you.
            </p>
          </div>
          {/* Client-supplied watercolour of a winding path towards the sun: the journey of counselling */}
          <div className="relative aspect-[16/8] overflow-hidden rounded-[3px] border border-gold/50 lg:aspect-[2/1]">
            <Image src={processArt.src} alt="" fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover object-[50%_60%]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
