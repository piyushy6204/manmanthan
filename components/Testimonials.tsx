"use client";
import { motion } from "framer-motion";
import { BackdropSprig, Ripples } from "./BackdropArt";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";

/**
 * Reusable testimonial section.
 * Only add entries here with the client's explicit written permission. Never invent names, ratings or stories.
 * Example shape: { quote: "…", attribution: "Client, first name or initials only if they agree" }
 */
export type Testimonial = { quote: string; attribution?: string };

export const verifiedTestimonials: Testimonial[] = [
  {
    quote:
      "The sessions gave me a different perspective on my personal challenges. I still have difficult days, but I feel better equipped to understand and manage them.",
    attribution: "Priya S.",
  },
  {
    quote:
      "Counselling helped me understand that not every thought I have is necessarily true. I’m learning to question my assumptions and respond to situations more calmly.",
    attribution: "R. Sharma",
  },
  {
    quote:
      "I had been keeping a lot of things to myself. Being able to express them in a safe space made a difference. I feel more comfortable acknowledging my emotions now.",
    attribution: "Rohan M.",
  },
  {
    quote:
      "One thing I really appreciated was that I wasn’t given quick solutions or told what to do. Instead, I was encouraged to understand my own feelings and find ways to deal with situations.",
    attribution: "Aarti B.",
  },
  {
    quote:
      "I used to overthink almost everything, and it was affecting my everyday life. The sessions helped me recognise my thought patterns and gradually look at situations from a different perspective.",
    attribution: "A Working Professional",
  },
];

export default function Testimonials({ items = verifiedTestimonials }: { items?: Testimonial[] }) {
  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="relative overflow-hidden bg-mist section-y">
      <Ripples className="-right-28 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 text-forest/20 lg:-right-20 lg:h-[30rem] lg:w-[30rem]" />
      <BackdropSprig className="hidden rotate-[10deg] text-forest/20 lg:bottom-3 lg:left-5 lg:block lg:h-24 lg:w-14" />
      <div className="container-x relative grid items-start gap-5 lg:grid-cols-[40fr_60fr] lg:gap-12">
        <Reveal>
          <h2 id="experiences-heading" className="h2 max-w-[16ch]">
            <WordReveal text="Experiences shared with care." stagger={0.14} />
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          {items.length === 0 ? (
            <div className="flex items-center gap-5 sm:gap-9">
              {/* Ripples spreading from a single point: the feeling of being heard. Decorative. */}
              <div aria-hidden="true" className="relative h-[4.5rem] w-[4.5rem] shrink-0 sm:h-24 sm:w-24">
                <span className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-gold sm:h-3 sm:w-3" />
                {[0, 1, 2].map((i) => (
                  <span key={i} className="ripple absolute inset-0 rounded-full border-[1.5px] border-gold" style={{ animationDelay: `${i * 1.6}s` }} />
                ))}
              </div>
              <div>
                <p className="font-serif text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] italic leading-[1.3] text-forest [text-wrap:balance]">
                  <WordReveal text="Feeling heard and respected is at the heart of counselling." stagger={0.12} delay={0.3} />
                </p>
                <motion.p
                  className="mt-3 max-w-[32rem] small-copy !text-[0.9375rem]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.9, delay: 2.2, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  Genuine client feedback, shared with permission, will appear here.
                </motion.p>
              </div>
            </div>
          ) : (
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {items.map((t, i) => (
                <li key={i} className="h-full">
                  <figure className="h-full border-l border-gold pl-5 sm:pl-6">
                    <blockquote className="font-serif text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] italic leading-[1.55] text-forest">
                      {t.quote}
                    </blockquote>
                    {t.attribution && (
                      <figcaption className="mt-3 text-[0.9rem] tracking-[0.01em] text-ink/70">{t.attribution}</figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}