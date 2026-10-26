import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Button from "./Button";
import Reveal from "./Reveal";

export default function AboutCounsellor() {
  const { counsellor } = siteConfig;
  const { portraitSlot } = siteConfig.images;
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y">
      <div className="container-x grid items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="relative w-full max-w-[15rem] sm:max-w-[19rem] lg:col-span-5 lg:max-w-[22rem]">
          <div aria-hidden="true" className="absolute inset-0 hidden -translate-x-3 translate-y-3 border border-gold/70 sm:block" />
          <div className="relative aspect-[4/5] overflow-hidden bg-sage/20">
            {counsellor.photo ? (
              <Image src={counsellor.photo} alt={counsellor.photoAlt} fill sizes="(min-width: 1024px) 22rem, 60vw" className="object-cover" />
            ) : (
              // Image slot: shown until Harsha's actual photograph is supplied. No portrait is fabricated.
              <>
                <Image src={portraitSlot.src} alt="" width={portraitSlot.width} height={portraitSlot.height} sizes="(min-width: 1024px) 22rem, 60vw" className="h-full w-full object-cover" />
                <p className="absolute inset-x-0 bottom-0 bg-ivory/85 px-4 py-2.5 text-center font-serif text-[1.0625rem] italic text-forest">Portrait to be added</p>
              </>
            )}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          <h2 id="about-heading" className="h2">
            A little about me.
          </h2>
          <div className="mt-5 border-t border-gold/50 pt-4">
            <p className="font-serif text-[1.625rem] font-medium leading-tight text-forest sm:text-[1.875rem]">{counsellor.name}</p>
            <p className="mt-1 text-[0.9375rem] text-ink/70">{counsellor.title}</p>
          </div>
          <div className="mt-5 space-y-4">
            <p className="body-copy">
              I’m a counselling professional with a Master’s degree in Clinical Psychology and training in Cognitive Behavioural Therapy (CBT).
            </p>
            <p className="lede max-w-[34rem]">
              I believe that sometimes, what we need most is not advice, but a space where we can slow down, feel heard, and understand what is happening within us.
            </p>
            <p className="body-copy">
              My approach is warm, non judgemental and practical, with a focus on understanding the connection between our thoughts, emotions and behaviours.
            </p>
            <p className="body-copy">
              Through Mann Manthan, I hope to create a space where you can pause, reflect on what you’re experiencing, and reconnect with yourself, one step at a
              time.
            </p>
          </div>
          <div className="mt-7">
            <Button href={siteConfig.bookingHref}>Book a Session</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
