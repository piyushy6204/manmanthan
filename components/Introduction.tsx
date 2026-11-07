import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { ArcRing, BackdropSprig } from "./BackdropArt";
import Reveal from "./Reveal";

/** A tall arch with a fine gold outline set just off the edge: matches the arches in the mood board. */
function ArchPicture({ src, width, height, position }: { src: string; width: number; height: number; position: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      <div aria-hidden="true" className="absolute -inset-2.5 rounded-t-full border border-gold/60" />
      <div className="relative aspect-[3/4.3] overflow-hidden rounded-t-full">
        <Image src={src} alt="" width={width} height={height} sizes="19rem" className="h-full w-full object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}

export default function Introduction() {
  const { introProfile, introLandscape, introBg } = siteConfig.images;
  return (
    <section id="introduction" aria-labelledby="intro-heading" className="on-dark relative overflow-hidden bg-forest section-y">
      {/* Leafy photographic backdrop with a deep-green veil, as in the mood board's "permission to pause" card */}
      <Image src={introBg.src} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/88 to-forest/70" />
      <ArcRing className="-right-16 -top-16 h-56 w-56 text-gold/70 lg:-right-24 lg:-top-24 lg:h-[26rem] lg:w-[26rem]" />
      <BackdropSprig className="left-1 top-5 h-36 w-24 -rotate-[14deg] text-gold/40 lg:left-8 lg:top-8 lg:h-56 lg:w-36" />
      <div className="container-x relative">
        <Reveal>
          <h2 id="intro-heading" className="h2 text-center !text-ivory">
            A little space to understand yourself.
          </h2>
        </Reveal>

        {/* Paragraphs flow across two columns on desktop so the full width is used without long lines */}
        <Reveal className="mt-8 lg:mt-10 lg:columns-2 lg:gap-14" delay={0.06}>
          <p className="body-copy break-inside-avoid !max-w-none !text-ivory/90">
            Mann Manthan comes from the idea of pausing to look within, reflecting on our thoughts and emotions, and understanding ourselves a little better.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none !text-ivory/90">
            In the busyness of everyday life, we often move from one responsibility to another without pausing to understand what is happening within us. Our
            thoughts, emotions, relationships and experiences can sometimes feel overwhelming or difficult to make sense of.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none !text-ivory/90">
            Mann Manthan is built around the belief that sometimes, what we need is simply a safe space to pause, talk, reflect and be heard.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none !text-ivory/90">
            Through a compassionate and evidence based approach to counselling, Mann Manthan aims to help you understand your thoughts and emotions, develop
            healthier ways of coping, and move towards meaningful change at your own pace.
          </p>
        </Reveal>

        <Reveal className="mt-10 lg:mt-14">
          {/* Desktop: two arches flank the quote, which sits straight on the green */}
          <div className="hidden items-center gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] xl:gap-12">
            <ArchPicture src={introProfile.src} width={introProfile.width} height={introProfile.height} position="62% 50%" />
            <figure className="text-center">
              <span aria-hidden="true" className="block font-serif text-[5rem] leading-[0.7] text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-3 font-serif text-[clamp(1.5rem,0.9rem+1.35vw,2.15rem)] font-medium italic leading-[1.3] text-ivory [text-wrap:balance]">
                Because healing does not always begin with having all the answers. Sometimes, it begins with giving yourself the space to{" "}
                <span className="underline decoration-gold decoration-1 underline-offset-[9px]">ask the right questions.</span>
              </blockquote>
              <span aria-hidden="true" className="mx-auto mt-6 block h-px w-14 bg-gold" />
              <figcaption className="mt-4 text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-gold">Pause. Reflect. Reconnect.</figcaption>
            </figure>
            <ArchPicture src={introLandscape.src} width={introLandscape.width} height={introLandscape.height} position="60% 50%" />
          </div>

          {/* Mobile and tablet: one ivory card, portrait on top, quote, landscape strip along the bottom */}
          <figure className="mx-auto max-w-[34rem] border border-gold/60 bg-ivory p-2.5 lg:hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={introProfile.src} alt="" fill sizes="34rem" className="object-cover" style={{ objectPosition: "62% 50%" }} />
            </div>
            <div className="px-3 pb-6 pt-4 text-center sm:px-8">
              <span aria-hidden="true" className="block font-serif text-[4rem] leading-[0.75] text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-2 font-serif text-[clamp(1.3rem,1rem+1.5vw,1.75rem)] font-medium italic leading-[1.3] text-forest [text-wrap:balance]">
                Because healing does not always begin with having all the answers. Sometimes, it begins with giving yourself the space to{" "}
                <span className="underline decoration-gold decoration-1 underline-offset-[8px]">ask the right questions.</span>
              </blockquote>
              <figcaption className="mt-5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-gilt sm:text-[0.8125rem]">Pause. Reflect. Reconnect.</figcaption>
            </div>
            <div className="relative aspect-[16/6] overflow-hidden">
              <Image src={introLandscape.src} alt="" fill sizes="34rem" className="object-cover" style={{ objectPosition: "50% 60%" }} />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
