import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Button from "./Button";
import { ArcRing, BackdropSprig } from "./BackdropArt";
import Reveal from "./Reveal";

export default function AboutCounsellor() {
  const { counsellor } = siteConfig;
  const { portraitSlot } = siteConfig.images;
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden section-y">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[40fr_60fr] lg:items-center lg:gap-12">
        {/* Arch cutout portrait with the logo's gold ring and a leaf sprig, as in the mood board */}
        <Reveal className="relative mx-auto w-full max-w-[16rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-[25rem]">
          <ArcRing className="-left-[12%] -top-[9%] h-[124%] w-[124%] text-gold/80" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-mist">
            {counsellor.photo ? (
              <Image src={counsellor.photo} alt={counsellor.photoAlt} fill sizes="(min-width: 1024px) 25rem, 70vw" className="object-cover" />
            ) : (
              // Image slot: shown until Harsha's actual photograph is supplied. No portrait is fabricated.
              <>
                <Image src={portraitSlot.src} alt="" width={portraitSlot.width} height={portraitSlot.height} sizes="(min-width: 1024px) 25rem, 70vw" className="h-full w-full object-cover" />
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ivory/90 px-3 py-1 text-[0.8125rem] italic text-forest">Portrait to be added</p>
              </>
            )}
          </div>
          <BackdropSprig className="-right-5 bottom-8 h-32 w-20 rotate-[8deg] text-forest/70 sm:-right-8 sm:h-40 sm:w-24" />
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
