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
    angle: -90,
    meaning: "Thoughts are the interpretations we make about a situation, often so quickly that we barely notice them.",
    exampleLabel: "A thought might be",
    example: "“I'm going to get everything wrong.”",
    link: "A thought like this can bring on worry, which in turn can shape what we do next.",
  },
  feelings: {
    label: "Feelings",
    icon: Heart,
    angle: 150,
    meaning: "Feelings are the emotions, and often the physical sensations, that tend to come with our thoughts.",
    exampleLabel: "A feeling might be",
    example: "Anxiety, worry or self doubt.",
    link: "Strong feelings can colour how we see the situation, and they often prompt us to act in particular ways.",
  },
  behaviours: {
    label: "Behaviours",
    icon: Footprints,
    angle: 30,
    meaning: "Behaviours are what we do, or avoid doing, in response to a situation and how we feel about it.",
    exampleLabel: "A behaviour might be",
    example: "Avoiding a task or repeatedly seeking reassurance.",
    link: "What we do can ease a feeling for a moment, yet it can also keep the original thought in place.",
  },
} as const satisfies Record<string, { icon: LucideIcon; angle: number } & Record<string, unknown>>;

/*
 * Diagram geometry (viewBox 400 x 360). The three elements sit on one circle and are joined by arcs of that
 * same circle, trimmed so every arrow ends exactly short of the next node. Cycle: thoughts → behaviours → feelings → thoughts.
 */
const CX = 200;
const CY = 205;
const R = 125; // circle radius
const NODE_R = 36; // node radius
const GAP = 8; // space between an arc end and a node edge
const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (deg: number) => ({ x: CX + R * Math.cos(rad(deg)), y: CY + R * Math.sin(rad(deg)) });
const trim = 2 * Math.asin((NODE_R + GAP) / (2 * R)) * (180 / Math.PI); // degrees to cut off each end
const arc = (from: number, to: number) => {
  const a = pt(from + trim);
  const b = pt(to - trim);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${R} ${R} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};
const edges = [
  { id: "t-b", from: "thoughts", to: "behaviours", d: arc(-90, 30) },
  { id: "b-f", from: "behaviours", to: "feelings", d: arc(30, 150) },
  { id: "f-t", from: "feelings", to: "thoughts", d: arc(150, 270) },
] as const;

type Key = keyof typeof elements;
const keys = Object.keys(elements) as Key[];

export default function CBTSection() {
  const [active, setActive] = useState<Key>("thoughts");
  const current = elements[active];

  return (
    <section id="approach" aria-labelledby="approach-heading" className="section-y">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[45fr_55fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-5">
        {/* Mobile order: heading, then the interactive cycle, then the explanation. Desktop: text left, cycle right. */}
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <h2 id="approach-heading" className="h2">
            Understanding Cognitive Behavioural Therapy.
          </h2>
          <p className="lede mt-3">Small shifts in understanding can create new ways forward.</p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="border border-gold/50 bg-sage/10 p-4 sm:p-7">
            <p className="text-center text-[0.875rem] text-ink/70">Select Thoughts, Feelings or Behaviours to explore the cycle.</p>

            <div className="relative mx-auto mt-3 aspect-[400/360] w-full max-w-[26rem]">
              <svg viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true" focusable="false">
                <defs>
                  <marker id="cbt-arrow-on" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M1 2 L10 6 L1 10z" className="fill-gold" />
                  </marker>
                  <marker id="cbt-arrow-off" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
                    <path d="M1 2 L10 6 L1 10z" className="fill-forest/30" />
                  </marker>
                </defs>
                {/* faint track the three elements sit on */}
                <circle cx={CX} cy={CY} r={R} className="stroke-forest/10" strokeWidth="1" strokeDasharray="2 6" />
                {edges.map((e) => {
                  const on = e.from === active || e.to === active;
                  return (
                    <path
                      key={`${e.id}-${on ? active : "off"}`}
                      d={e.d}
                      strokeWidth={on ? 2.5 : 1.5}
                      strokeLinecap="round"
                      markerEnd={`url(#${on ? "cbt-arrow-on" : "cbt-arrow-off"})`}
                      className={`${on ? "stroke-gold cbt-flow" : "stroke-forest/30"} transition-colors duration-300`}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute left-1/2 flex w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center" style={{ top: `${(CY / 360) * 100}%` }}>
                <Sprig className="h-9 w-6 text-gold min-[380px]:h-12 min-[380px]:w-8 sm:h-14 sm:w-9" />
                <p className="mt-1 font-serif text-[0.9375rem] italic leading-snug text-forest sm:text-[1.0625rem]">Each one influences the others</p>
              </div>

              {keys.map((k) => {
                const el = elements[k];
                const Icon = el.icon;
                const selected = k === active;
                const p = pt(el.angle);
                const labelAbove = el.angle === -90;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="cbt-panel"
                    onClick={() => setActive(k)}
                    style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 360) * 100}%` }}
                    className={`group absolute flex aspect-square w-[18%] min-w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-300 ease-calm ${
                      selected
                        ? "border-gold bg-forest text-white shadow-[0_0_0_3px_rgb(var(--ivory)),0_0_0_4.5px_rgb(var(--gold))]"
                        : "border-forest/50 bg-ivory text-forest hover:border-forest hover:bg-sage/30"
                    }`}
                  >
                    <Icon aria-hidden="true" strokeWidth={1.25} className="h-[42%] w-[42%]" />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[1rem] font-medium leading-none sm:text-[1.15rem] ${
                        labelAbove ? "bottom-full mb-2" : "top-full mt-2"
                      } ${selected ? "text-forest" : "text-forest/75"}`}
                    >
                      {el.label}
                    </span>
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

        <Reveal className="space-y-4 lg:col-start-1 lg:row-start-2">
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
        </Reveal>
      </div>
    </section>
  );
}
