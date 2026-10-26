/** Fine botanical line motif drawn to echo the leaves in the Mann Manthan logo. Decorative only. */
const leaf = "M0 0 C 8 -6 24 -8 34 -24 C 14 -30 -2 -18 0 0Z";
const vein = "M1 -1 L 26 -20";
const placements = [
  { y: 162, side: 1, s: 1.0 },
  { y: 130, side: -1, s: 1.0 },
  { y: 98, side: 1, s: 0.85 },
  { y: 68, side: -1, s: 0.75 },
  { y: 42, side: 1, s: 0.6 },
];

export default function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d="M60 198 C 58 150 62 100 66 18" />
      {placements.map((p, i) => {
        const x = 60 + ((198 - p.y) / 180) * 6;
        return (
          <g key={i} transform={`translate(${x} ${p.y}) scale(${p.side * p.s} ${p.s})`}>
            <path d={leaf} />
            <path d={vein} strokeWidth="0.6" />
          </g>
        );
      })}
      <path d="M66 18 C 72 8 80 6 86 4 C 82 12 74 18 66 18Z" />
    </svg>
  );
}
