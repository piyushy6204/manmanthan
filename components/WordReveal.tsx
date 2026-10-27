"use client";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** Seconds between words. Slower = more time to read. */
  stagger?: number;
  /** Seconds before the first word appears. */
  delay?: number;
  /** Index of the first word that gets the emphasised style (gold underline draws in last). */
  accentFrom?: number;
  /** Called with the total reveal duration so siblings can follow on after the last word. */
  onTotal?: (seconds: number) => void;
};

const word = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const } },
};

/** Reveals text word by word as it scrolls into view, which paces the reader. Plain text for reduced motion. */
export default function WordReveal({ text, className, stagger = 0.09, delay = 0, accentFrom }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return (
      <span className={className}>
        {accentFrom === undefined ? (
          text
        ) : (
          <>
            {words.slice(0, accentFrom).join(" ")}{" "}
            <span className="underline decoration-gold decoration-1 underline-offset-[10px]">{words.slice(accentFrom).join(" ")}</span>
          </>
        )}
      </span>
    );
  }
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => {
        const accent = accentFrom !== undefined && i >= accentFrom;
        return (
          <motion.span
            key={i}
            variants={
              accent
                ? {
                    hidden: { ...word.hidden, textDecorationColor: "rgba(201,154,69,0)" }, // champagne gold #C99A45
                    show: { ...word.show, textDecorationColor: "rgba(201,154,69,1)", transition: { duration: 1.4, ease: [0.22, 0.61, 0.36, 1] as const } },
                  }
                : word
            }
            className={`inline-block ${!accent && i < words.length - 1 ? "mr-[0.27em]" : ""} ${accent ? "underline decoration-1 underline-offset-[10px]" : ""}`}
          >
            {/* accent words carry a trailing non-breaking space so the underline is continuous */}
            {accent && i < words.length - 1 ? `${w}\u00A0` : w}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
