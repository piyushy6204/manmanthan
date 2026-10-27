import Sprig from "./Sprig";

/**
 * Quiet background artwork for the sage sections. Everything here is decorative (aria-hidden, no pointer events)
 * and drawn in brand colours at low opacity so it never competes with the text.
 * Motifs come from Mann Manthan's work and logo: reflection (arcs, ripples), growth (leaves), the journey (a winding path).
 */
const base = "pointer-events-none absolute select-none";

/** A broken gold ring, like the brush circle in the logo. */
export function ArcRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="640 440" transform="rotate(-35 200 200)" />
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="260 940" transform="rotate(50 200 200)" />
    </svg>
  );
}

/** Concentric ripples: the idea of pausing and reflecting. */
export function Ripples({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      {[36, 72, 110, 150, 192].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth={i === 0 ? 1.1 : 0.9} opacity={1 - i * 0.14} />
      ))}
    </svg>
  );
}

/** A winding dashed path ending in a small leaf: the journey of counselling. */
export function JourneyPath({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 160" fill="none" aria-hidden="true" focusable="false" className={`${base} ${className}`}>
      <path d="M2 140 C 90 150, 130 40, 230 70 S 380 150, 470 90 S 560 30, 580 40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 9" />
      <path d="M580 40 C 586 26 600 22 600 22 C 600 22 598 38 580 40Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** A leafy sprig, tilted. */
export function BackdropSprig({ className = "" }: { className?: string }) {
  return <Sprig className={`${base} ${className}`} />;
}
