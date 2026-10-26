"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "What happens during a counselling session?",
    a: "A session is an opportunity to talk about your concerns, explore your experiences, and work together towards understanding and practical goals. The exact approach depends on your needs.",
  },
  {
    q: "Can I attend sessions online?",
    a: "Online appointments may be offered, depending on availability and the arrangements confirmed with the counsellor.",
  },
  {
    q: "What is CBT?",
    a: "Cognitive Behavioural Therapy, or CBT, is a way of working that looks at how our thoughts, feelings and behaviours are connected. By noticing these patterns, it becomes easier to explore other perspectives and try more helpful ways of responding.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can send an enquiry using the booking form on this page, or get in touch by WhatsApp or phone to ask about available times. An appointment is confirmed only once a time has been agreed.",
  },
  {
    q: "Are counselling sessions confidential?",
    a: "Confidentiality is respected within applicable professional, ethical and legal boundaries. You can talk through the specific arrangements before you begin.",
  },
  {
    q: "How many sessions will I need?",
    a: "This varies with each person's circumstances, goals and progress. There is no fixed number of sessions, and none is promised.",
  },
  {
    q: "What if I am not sure whether counselling is right for me?",
    a: "It is completely fine to have questions. An initial enquiry can help clarify how the process works and whether this service may be appropriate for you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 id="faq-heading" className="h2 max-w-[14ch] lg:sticky lg:top-24">
            Questions you may have.
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.08}>
          <div className="border-t border-gold/50">
            {faqs.map((f, i) => {
              const open = openIndex === i;
              const btnId = `${base}-btn-${i}`;
              const panelId = `${base}-panel-${i}`;
              return (
                <div key={f.q} className="border-b border-gold/50">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-5 py-3.5 text-left font-serif text-[1.1875rem] font-medium leading-snug text-forest hover:text-ink sm:text-[1.3125rem]"
                    >
                      <span>{f.q}</span>
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.25}
                        className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ease-calm ${open ? "rotate-45" : ""}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="body-copy pb-5 pr-8 !text-[0.9375rem] sm:!text-base">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
