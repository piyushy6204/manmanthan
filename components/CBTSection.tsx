"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const elements = {
  thoughts: {
    label: "Thoughts",
    pos: "left-1/2 top-[13%]",
    meaning: "Thoughts are the interpretations we make about a situation, often so quickly that we barely notice them.",
    exampleLabel: "A thought might be",
    example: "“I'm going to get everything wrong.”",
    link: "A thought like this can bring on worry, which in turn can shape what we do next.",
  },
  feelings: {
    label: "Feelings",
    pos: "left-[20%] top-[84%]",
    meaning: "Feelings are the emotions, and often the physical sensations, that tend to come with our thoughts.",
    exampleLabel: "A feeling might be",
    example: "Anxiety, worry or self doubt.",
    link: "Strong feelings can colour how we see the situation, and they often prompt us to act in particular ways.",
  },
  behaviours: {
    label: "Behaviours",
    pos: "left-[80%] top-[84%]",
    meaning: "Behaviours are what we do, or avoid doing, in response to a situation and how we feel about it.",
    exampleLabel: "A behaviour might be",
    example: "Avoiding a task or repeatedly seeking reassurance.",
    link: "What we do can ease a feeling for a moment, yet it can also keep the original thought in place.",
  },
} as const;
type Key = keyof typeof elements;
const keys = Object.keys(elements) as Key[];

export default function CBTSection() {
  const [active, setActive] = useState<Key>("thoughts");
  const current = elements[active];

  return (
    <section id="approach" aria-labelledby="approach-heading" className="section-y">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 id="approach-heading" className="h2">
            Understanding Cognitive Behavioural Therapy.
          </h2>
          <p className="lede mt-3">Small shifts in understanding can create new ways forward.</p>
          <div className="mt-5 space-y-4">
            <p className="body-copy">
              Cognitive Behavioural Therapy, commonly known as CBT, helps people understand the connection between their thoughts, feelings and behaviours.
            </p>
            <p className="body-copy">
              It introduces practical strategies for recognising unhelpful thinking patterns, exploring alternative perspectives, and developing healthier ways of
              responding to difficult situations.
            </p>
            <p className="body-copy">
              By learning to notice and work with these patterns, people can gradually build practical coping skills and greater self awareness.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          <div className="border border-gold/50 bg-sage/10 p-4 sm:p-7">
            <p className="text-center text-[0.875rem] text-ink/70">Select a point on the triangle to explore it.</p>

            <div className="relative mx-auto mt-4 aspect-[4/4] w-full max-w-[24rem] sm:aspect-[400/340]">
              <svg viewBox="0 0 400 340" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true" focusable="false">
                <polygon points="200,44 80,286 320,286" className="stroke-forest/10" strokeWidth="6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <polygon points="200,44 80,286 320,286" className="stroke-gold" strokeWidth="1.25" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="pointer-events-none absolute left-1/2 top-[58%] w-[38%] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-[0.95rem] italic leading-snug text-forest sm:text-[1.1rem]">
                Each one influences the others
              </p>

              {keys.map((k) => {
                const selected = k === active;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="cbt-panel"
                    onClick={() => setActive(k)}
                    className={`absolute ${elements[k].pos} flex min-h-[44px] min-w-[6rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[3px] border px-3 py-2 font-serif text-[1.0625rem] font-medium transition-colors duration-300 ease-calm sm:min-w-[7rem] sm:text-[1.2rem] ${
                      selected ? "border-forest bg-forest text-white" : "border-forest/50 bg-ivory text-forest hover:border-forest hover:bg-sage/25"
                    }`}
                  >
                    {elements[k].label}
                  </button>
                );
              })}
            </div>

            <div id="cbt-panel" aria-live="polite" className="mt-4 min-h-[15.5rem] border-t border-gold/50 pt-4 sm:min-h-[13rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="h3">{current.label}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-ink/90">{current.meaning}</p>
                  <p className="mt-3 text-[0.875rem] text-ink/70">{current.exampleLabel}</p>
                  <p className="font-serif text-[1.3rem] italic leading-snug text-forest">{current.example}</p>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink/90">{current.link}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-3 small-copy">
              Exploring any one part of this pattern can help a person notice where changes might be possible. This is a simplified educational example, not a
              clinical assessment.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
