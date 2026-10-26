"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Footprints, Heart, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import Sprig from "./Sprig";

const elements = {
  thoughts: {
    label: "Thoughts",
    icon: Brain,
    x: 200,
    y: 64,
    meaning: "Thoughts are the interpretations we make about a situation, often so quickly that we barely notice them.",
    exampleLabel: "A thought might be",
    example: "“I'm going to get everything wrong.”",
    link: "A thought like this can bring on worry, which in turn can shape what we do next.",
  },
  feelings: {
    label: "Feelings",
    icon: Heart,
    x: 64,
    y: 304,
    meaning: "Feelings are the emotions, and often the physical sensations, that tend to come with our thoughts.",
    exampleLabel: "A feeling might be",
    example: "Anxiety, worry or self doubt.",
    link: "Strong feelings can colour how we see the situation, and they often prompt us to act in particular ways.",
  },
  behaviours: {
    label: "Behaviours",
    icon: Footprints,
    x: 336,
    y: 304,
    meaning: "Behaviours are what we do, or avoid doing, in response to a situation and how we feel about it.",
    exampleLabel: "A behaviour might be",
    example: "Avoiding a task or repeatedly seeking reassurance.",
    link: "What we do can ease a feeling for a moment, yet it can also keep the original thought in place.",
  },
} as const satisfies Record<string, { icon: LucideIcon; x: number; y: number } & Record<string, unknown>>;

/* The cycle: thoughts → behaviours → feelings → thoughts. Each edge touches two elements. */
const edges = [
  { id: "t-b", from: "thoughts", to: "behaviours", d: "M 236 88 C 306 112 336 170 336 256" },
  { id: "b-f", from: "behaviours", to: "feelings", d: "M 298 336 C 256 384 144 384 102 336" },
  { id: "f-t", from: "feelings", to: "thoughts", d: "M 64 256 C 64 170 94 112 164 88" },
] as const;

type Key = keyof typeof elements;
const keys = Object.keys(elements) as Key[];

export default function CBTSection() {
  const [active, setActive] = useState<Key>("thoughts");
  const current = elements[active];

  return (
    <section id="approach" aria-labelledby="approach-heading" className="section-y">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[45fr_55fr] lg:gap-12">
        <Reveal>
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

        <Reveal delay={0.08}>
          <div className="border border-gold/50 bg-sage/10 p-4 sm:p-7">
            <p className="text-center text-[0.875rem] text-ink/70">Select Thoughts, Feelings or Behaviours to explore the cycle.</p>

            <div className="relative mx-auto mt-3 aspect-square w-full max-w-[26rem]">
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true" focusable="false">
                <defs>
                  <marker id="cbt-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 1 L9 5 L0 9z" className="fill-gold" />
                  </marker>
                  <marker id="cbt-arrow-off" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M0 1 L9 5 L0 9z" className="fill-forest/30" />
                  </marker>
                </defs>
                {/* soft backdrop: a sage disc with a fine gold ring, echoing the logo's circle */}
                <circle cx="200" cy="214" r="150" className="fill-sage/25" />
                <circle cx="200" cy="214" r="168" className="stroke-gold/60" strokeWidth="1" />
                {edges.map((e) => {
                  const on = e.from === active || e.to === active;
                  return (
                    <path
                      key={`${e.id}-${on ? active : "off"}`}
                      d={e.d}
                      strokeWidth={on ? 2 : 1.5}
                      strokeLinecap="round"
                      markerEnd={`url(#${on ? "cbt-arrow-on" : "cbt-arrow-off"})`}
                      className={`${on ? "stroke-gold cbt-flow" : "stroke-forest/25"} transition-colors duration-300`}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute left-1/2 top-[52%] flex w-[40%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <Sprig className="h-14 w-9 text-forest/70 sm:h-16 sm:w-10" />
                <p className="mt-1 font-serif text-[0.9375rem] italic leading-snug text-forest sm:text-[1.0625rem]">Each one influences the others</p>
              </div>

              {keys.map((k) => {
                const el = elements[k];
                const Icon = el.icon;
                const selected = k === active;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="cbt-panel"
                    onClick={() => setActive(k)}
                    style={{ left: `${(el.x / 400) * 100}%`, top: `calc(${(el.y / 400) * 100}% - var(--r))` }}
                    className="group absolute flex -translate-x-1/2 flex-col items-center gap-1.5 [--r:2.125rem] sm:[--r:2.5rem]"
                  >
                    <span
                      className={`flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border transition-all duration-300 ease-calm sm:h-20 sm:w-20 ${
                        selected
                          ? "border-gold bg-forest text-white ring-2 ring-gold ring-offset-2 ring-offset-ivory"
                          : "border-forest/50 bg-ivory text-forest group-hover:border-forest group-hover:bg-sage/30"
                      }`}
                    >
                      <Icon aria-hidden="true" strokeWidth={1.25} className="h-7 w-7 sm:h-8 sm:w-8" />
                    </span>
                    <span className={`font-serif text-[1.0625rem] font-medium leading-none sm:text-[1.2rem] ${selected ? "text-forest" : "text-forest/80"}`}>{el.label}</span>
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
                  <p className="mt-1.5 justify-copy text-[0.9375rem] leading-[1.65] text-ink/90">{current.meaning}</p>
                  <p className="mt-3 text-[0.875rem] text-ink/70">{current.exampleLabel}</p>
                  <p className="font-serif text-[1.3rem] italic leading-snug text-forest">{current.example}</p>
                  <p className="mt-3 justify-copy text-[0.9375rem] leading-[1.65] text-ink/90">{current.link}</p>
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
