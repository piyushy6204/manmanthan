import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "./Reveal";

export default function Introduction() {
  const { bannerLight } = siteConfig.images;
  return (
    <section id="introduction" aria-labelledby="intro-heading" className="bg-sage/15 section-y">
      <div className="container-x">
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
          <figure className="mx-auto mt-8 max-w-[52rem] text-center lg:mt-10">
            <span aria-hidden="true" className="mx-auto mb-5 block h-px w-12 bg-gold" />
            <blockquote className="font-serif text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] font-medium italic leading-[1.3] text-forest [text-wrap:balance]">
              Because healing does not always begin with having all the answers. Sometimes, it begins with giving yourself the space to ask the right questions.
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
