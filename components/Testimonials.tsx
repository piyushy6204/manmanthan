import Reveal from "./Reveal";

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
      <div className="container-x grid gap-5 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 id="experiences-heading" className="h2 max-w-[16ch]">
            Experiences shared with care.
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          {items.length === 0 ? (
            <div className="border-l border-gold pl-5 sm:pl-8">
              <p className="font-serif text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] italic leading-[1.3] text-forest">
                Feeling heard and respected is at the heart of counselling.
              </p>
              <p className="mt-3 max-w-[32rem] small-copy !text-[0.9375rem]">
                Genuine client feedback, shared with permission, will appear here.
              </p>
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
