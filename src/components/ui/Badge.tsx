import React from "react";

type BadgeVariant = "default" | "accent" | "muted";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--color-bone)",
    color: "var(--color-ink)",
    padding: "0.125rem 0.75rem",
  },
  accent: {
    background: "var(--color-pistachio)",
    color: "var(--color-ink)",
    padding: "0.125rem 0.75rem",
  },
  muted: {
    background: "transparent",
    color: "var(--color-taupe)",
    padding: "0.125rem 0.75rem",
  },
};

export default function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full text-xs font-medium ${className}`}
      style={{
        fontFamily: "var(--font-sans)",
        ...variantStyles[variant],
      }}
      {...props}
    >
      {children}
    </span>
  );
}
