import React from "react";

type CardVariant = "default" | "elevated" | "flat";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    boxShadow: "var(--shadow)",
  },
  elevated: {
    boxShadow: "var(--shadow-lg)",
  },
  flat: {
    boxShadow: "none",
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
        background: "var(--color-ivory)",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
