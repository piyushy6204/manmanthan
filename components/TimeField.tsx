"use client";
import { useState } from "react";

/**
 * 12-hour time picker (Hour, Minutes, AM/PM) built from three native selects.
 * The browser's own <input type="time"> shows 12 or 24 hours depending on the visitor's system settings,
 * so this gives everyone the same AM/PM choice. The value handed to the form is still "HH:MM" (24-hour),
 * so validation and the email code do not change.
 */
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

type Parts = { h: string; m: string; ap: string };

function parse(v: string): Parts {
  const m = /^(\d{2}):(\d{2})$/.exec(v);
  if (!m) return { h: "", m: "", ap: "" };
  const H = Number(m[1]);
  return { h: String(H % 12 === 0 ? 12 : H % 12), m: m[2], ap: H >= 12 ? "PM" : "AM" };
}

function to24({ h, m, ap }: Parts) {
  const H = (Number(h) % 12) + (ap === "PM" ? 12 : 0);
  return `${String(H).padStart(2, "0")}:${m}`;
}

export default function TimeField({
  value,
  onChange,
  invalid,
}: {
  value: string;
  /** value24 is "" until hour, minutes and AM/PM are all chosen; incomplete is true while only some are chosen. */
  onChange: (value24: string, incomplete: boolean) => void;
  invalid?: boolean;
}) {
  const [parts, setParts] = useState<Parts>(() => parse(value));

  const update = (patch: Partial<Parts>) => {
    const next = { ...parts, ...patch };
    // Choosing an hour is enough to suggest ":00" so people only have to add AM or PM.
    if (patch.h && !next.m) next.m = "00";
    setParts(next);
    const complete = Boolean(next.h && next.m && next.ap);
    onChange(complete ? to24(next) : "", Boolean(next.h || next.m || next.ap) && !complete);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <select aria-label="Hour" className="field" value={parts.h} aria-invalid={invalid || undefined} onChange={(e) => update({ h: e.target.value })}>
        <option value="">Hour</option>
        {HOURS.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <select aria-label="Minutes" className="field" value={parts.m} aria-invalid={invalid || undefined} onChange={(e) => update({ m: e.target.value })}>
        <option value="">Min</option>
        {MINUTES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select aria-label="AM or PM" className="field" value={parts.ap} aria-invalid={invalid || undefined} onChange={(e) => update({ ap: e.target.value })}>
        <option value="">AM/PM</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
