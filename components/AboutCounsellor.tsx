import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Button from "./Button";
import { ArcRing } from "./BackdropArt";
import Reveal from "./Reveal";

export default function AboutCounsellor() {
  const { counsellor } = siteConfig;
  const { portraitSlot } = siteConfig.images;
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden section-y">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[40fr_60fr] lg:items-center lg:gap-12">
        {/* Client portrait, shown exactly as supplied (no crop, tint or overlay). The frame sits around it:
            a soft sand panel, a fine gold outline offset to the lower right, the logo's gold ring and a falling leaf. */}
        <Reveal className="relative mx-auto w-full max-w-[20rem] pb-4 pr-4 sm:max-w-[24rem] lg:mx-0 lg:max-w-[28rem]">
          <ArcRing className="-right-[14%] -top-[9%] h-[62%] w-[62%] text-gold/80" />
          <div aria-hidden="true" className="absolute -left-4 top-6 h-[78%] w-[70%] bg-sand" />
          <div aria-hidden="true" className="absolute bottom-0 left-4 right-0 top-4 border border-gold/70 sm:left-5 sm:top-5" />
          <div className="relative border-[5px] border-ivory shadow-[0_18px_40px_-22px_rgba(7,61,50,0.55)]">
            {counsellor.photo ? (
              <Image
                src={counsellor.photo}
                alt={counsellor.photoAlt}
                width={counsellor.photoWidth}
                height={counsellor.photoHeight}
                sizes="(min-width: 1024px) 28rem, 80vw"
                className="block h-auto w-full"
              />
            ) : (
              <Image src={portraitSlot.src} alt="" width={portraitSlot.width} height={portraitSlot.height} sizes="(min-width: 1024px) 25rem, 70vw" className="block h-auto w-full" />
            )}
          </div>
          <Image src="/images/leaf-fall.png" alt="" width={170} height={450} aria-hidden="true" className="pointer-events-none absolute -right-1 bottom-[8%] w-[12%] max-w-[3.5rem]" />
        </Reveal>

        <Reveal delay={0.08}>
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
            <p className="lede justify-copy max-w-[40rem]">
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
