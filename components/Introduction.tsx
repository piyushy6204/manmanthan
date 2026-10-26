import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "./Reveal";

export default function Introduction() {
  const { leafLight } = siteConfig.images;
  return (
    <section id="introduction" aria-labelledby="intro-heading" className="bg-sage/15 section-y">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 id="intro-heading" className="h2 max-w-[20ch]">
              A little space to understand yourself.
            </h2>
          </Reveal>

          <Reveal className="space-y-4 lg:col-span-6 lg:col-start-7 lg:pt-1" delay={0.06}>
            <p className="body-copy">
              Mann Manthan comes from the idea of pausing to look within, reflecting on our thoughts and emotions, and understanding ourselves a little better.
            </p>
            <p className="body-copy">
              In the busyness of everyday life, we often move from one responsibility to another without pausing to understand what is happening within us. Our
              thoughts, emotions, relationships and experiences can sometimes feel overwhelming or difficult to make sense of.
            </p>
            <p className="body-copy">
              Mann Manthan is built around the belief that sometimes, what we need is simply a safe space to pause, talk, reflect and be heard.
            </p>
            <p className="body-copy">
              Through a compassionate and evidence based approach to counselling, Mann Manthan aims to help you understand your thoughts and emotions, develop
              healthier ways of coping, and move towards meaningful change at your own pace.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 grid items-center gap-6 sm:mt-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-[16/7] overflow-hidden lg:col-span-5 lg:aspect-[4/3]">
            <Image src={leafLight.src} alt="" width={leafLight.width} height={leafLight.height} sizes="(min-width: 1024px) 28rem, 100vw" className="h-full w-full object-cover" />
          </div>
          <figure className="border-l border-gold pl-5 sm:pl-8 lg:col-span-7">
            <blockquote className="font-serif text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] font-medium italic leading-[1.28] text-forest [text-wrap:balance]">
              Because healing does not always begin with having all the answers. Sometimes, it begins with giving yourself the space to ask the right questions.
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
