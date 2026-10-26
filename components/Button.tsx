import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "lightOutline";
const styles: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  light: "btn btn-light",
  lightOutline: "btn btn-light-outline",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}
