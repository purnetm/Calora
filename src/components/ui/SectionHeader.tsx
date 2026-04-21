import React from "react";

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  description?: string;
  arrows?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

const navBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-ink)",
  background: "transparent",
  color: "var(--color-ink)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
};

export default function SectionHeader({
  eyebrow,
  headline,
  description,
  arrows = false,
  onPrev,
  onNext,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-gold)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        [{eyebrow}]
      </p>

      {/* Headline row */}
      <div className="flex items-center justify-between gap-4">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            color: "var(--color-ink)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {headline}
        </h2>

        {arrows && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onPrev}
              aria-label="Previous"
              disabled={!onPrev}
              className="transition-all duration-200 hover:bg-[--color-ink] hover:text-[--color-cream] cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              style={navBtnStyle}
            >
              ←
            </button>
            <button
              onClick={onNext}
              aria-label="Next"
              disabled={!onNext}
              className="transition-all duration-200 hover:bg-[--color-ink] hover:text-[--color-cream] cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              style={navBtnStyle}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-taupe)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: "36rem",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
