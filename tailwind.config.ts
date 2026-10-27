import type { Config } from "tailwindcss";

/** Classic Serenity palette. Values live in app/globals.css as CSS variables; this file only maps them to utilities. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: token("forest"),
        sage: token("sage"),
        ivory: token("ivory"),
        gold: token("gold"),
        ink: token("ink"),
        danger: token("danger"), // functional error state only
      },
      fontFamily: {
        serif: ['"EB Garamond Variable"', "EB Garamond", "Georgia", "serif"],
        sans: ['"Work Sans Variable"', "Work Sans", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      transitionTimingFunction: { calm: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
