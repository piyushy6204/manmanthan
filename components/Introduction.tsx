import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { ArcRing, BackdropSprig } from "./BackdropArt";
import Reveal from "./Reveal";

export default function Introduction() {
  const { bannerLight } = siteConfig.images;
  return (
    <section id="introduction" aria-labelledby="intro-heading" className="relative overflow-hidden bg-sage/30 section-y">
      <ArcRing className="-right-16 -top-16 h-56 w-56 text-gold/60 lg:-right-24 lg:-top-24 lg:h-[26rem] lg:w-[26rem]" />
      <BackdropSprig className="left-1 top-5 h-36 w-24 -rotate-[14deg] text-forest/20 lg:left-8 lg:top-8 lg:h-56 lg:w-36" />
      <div className="container-x relative">
        <Reveal>
          <h2 id="intro-heading" className="h2 text-center">
            A little space to understand yourself.
          </h2>
        </Reveal>

        {/* Paragraphs flow across two columns on desktop so the full width is used without long lines */}
        <Reveal className="mt-8 lg:mt-10 lg:columns-2 lg:gap-14" delay={0.06}>
          <p className="body-copy break-inside-avoid !max-w-none">
            Mann Manthan comes from the idea of pausing to look within, reflecting on our thoughts and emotions, and understanding ourselves a little better.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none">
            In the busyness of everyday life, we often move from one responsibility to another without pausing to understand what is happening within us. Our
            thoughts, emotions, relationships and experiences can sometimes feel overwhelming or difficult to make sense of.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none">
            Mann Manthan is built around the belief that sometimes, what we need is simply a safe space to pause, talk, reflect and be heard.
          </p>
          <p className="body-copy mt-4 break-inside-avoid !max-w-none">
            Through a compassionate and evidence based approach to counselling, Mann Manthan aims to help you understand your thoughts and emotions, develop
            healthier ways of coping, and move towards meaningful change at your own pace.
          </p>
        </Reveal>

        <Reveal className="mt-10 lg:mt-12">
          <div className="relative aspect-[16/7] overflow-hidden sm:aspect-[8/3] lg:aspect-[1376/426]">
            <Image src={bannerLight.src} alt="" width={bannerLight.width} height={bannerLight.height} sizes="100vw" className="h-full w-full object-cover" />
          </div>
          <figure className="relative mx-auto mt-8 max-w-[52rem] border border-gold/50 bg-ivory px-6 pb-10 pt-6 text-center sm:px-12 sm:pb-14 sm:pt-8 lg:mt-10">
            <span aria-hidden="true" className="shine-gold block font-serif text-[5rem] leading-[0.75] sm:text-[6.5rem]">
              &ldquo;
            </span>
            <blockquote className="shine-text font-serif text-[clamp(1.5rem,1.05rem+1.9vw,2.6rem)] font-medium italic leading-[1.28] [text-wrap:balance]">
              Because healing does not always begin with having all the answers. Sometimes, it begins with giving yourself the space to{" "}
              <span className="underline decoration-gold decoration-1 underline-offset-[10px]">ask the right questions.</span>
            </blockquote>
            <figcaption className="shine-text mt-7 text-[0.8125rem] font-medium uppercase tracking-[0.2em] sm:text-sm">Pause. Reflect. Reconnect.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
