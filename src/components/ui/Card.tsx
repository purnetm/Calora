import React from "react";

type CardVariant = "default" | "elevated" | "flat";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    boxShadow: "var(--shadow)",
    background: "var(--color-ivory)",
  },
  elevated: {
    boxShadow: "var(--shadow-lg)",
    background: "var(--color-ivory)",
  },
  flat: {
    boxShadow: "none",
    background: "var(--color-ivory)",
    border: "1px solid var(--color-border)",
  },
};

export default function Card({
  variant = "default",
  className = "",
  children,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        borderRadius: "var(--radius-lg)",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
