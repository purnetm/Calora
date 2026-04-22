import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  style,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium cursor-pointer transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: "var(--color-ink)",
      color: "var(--color-cream)",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "var(--color-ink)",
      border: "1.5px solid var(--color-ink)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-taupe)",
      border: "none",
    },
  };

  // We handle hover states via CSS class-based approach using a wrapper with data-variant
  const hoverClasses: Record<ButtonVariant, string> = {
    primary: "hover:opacity-90",
    outline:
      "hover:bg-[--color-ink] hover:text-[--color-cream]",
    ghost: "hover:[color:var(--color-ink)]",
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${hoverClasses[variant]} ${className}`}
      style={{
        fontFamily: "var(--font-sans)",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
      {arrow && <span className="ml-1" aria-hidden="true">→</span>}
    </button>
  );
}
