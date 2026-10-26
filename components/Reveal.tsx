"use client";
import { motion } from "framer-motion";

type Props = { children: React.ReactNode; className?: string; delay?: number };

/** Gentle fade and rise as a block enters the viewport. Used per block, never per paragraph. */
export default function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
