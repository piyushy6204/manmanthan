"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";

/**
 * Reusable testimonial section.
 * Only add entries here with the client's explicit written permission. Never invent names, ratings or stories.
 * Example shape: { quote: "…", attribution: "Client, first name or initials only if they agree" }
 */
export type Testimonial = { quote: string; attribution?: string };

export const verifiedTestimonials: Testimonial[] = [];

export default function Testimonials({ items = verifiedTestimonials }: { items?: Testimonial[] }) {
  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="bg-sage/15 section-y">
      <div className="container-x grid items-start gap-5 lg:grid-cols-[40fr_60fr] lg:gap-12">
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
            <ul className="space-y-10">
              {items.map((t, i) => (
                <li key={i}>
                  <figure className="border-l border-gold pl-5 sm:pl-8">
                    <blockquote className="font-serif text-[1.6rem] italic leading-[1.35] text-forest">{t.quote}</blockquote>
                    {t.attribution && <figcaption className="mt-3 text-[0.95rem] text-ink/70">{t.attribution}</figcaption>}
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
