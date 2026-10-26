"use client";
import { MotionConfig } from "framer-motion";

/** Respects the visitor's prefers-reduced-motion setting across every animation. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
