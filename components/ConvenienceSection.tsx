import { CalendarClock, Lock, UserRound, Video } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    icon: Lock,
    title: "Confidential Conversations",
    text: "Sessions are approached with respect for privacy and professional confidentiality, subject to applicable ethical and legal limits.",
  },
  { icon: UserRound, title: "One to One Sessions", text: "A dedicated space to discuss your experiences without judgement." },
  { icon: Video, title: "Online Sessions", text: "The option to connect from a comfortable and suitable private space, subject to availability." },
  { icon: CalendarClock, title: "Flexible Scheduling", text: "Appointment times can be discussed based on mutual availability." },
];

export default function ConvenienceSection() {
  return (
    <section id="comfort" aria-labelledby="comfort-heading" className="section-y">
      <div className="container-x">
        <Reveal>
          <h2 id="comfort-heading" className="h2 max-w-[18ch]">
            A space that works for you.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-8 grid border-t border-gold/50 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {items.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className={`border-b border-gold/30 py-6 sm:px-7 sm:py-8 lg:border-b-0 lg:py-8 ${i % 2 === 1 ? "sm:border-l sm:border-gold/30" : ""} lg:border-l lg:border-gold/30 lg:first:border-l-0 lg:first:pl-0`}
              >
                <Icon aria-hidden="true" strokeWidth={1.1} className="h-7 w-7 text-forest" />
                <h3 className="h3 mt-3">{title}</h3>
                <p className="mt-1.5 justify-copy text-[0.9375rem] leading-[1.65] text-ink/90">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
