import React from "react";

const imgHero = "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80";

const MARQUEE_TEXT =
  "HANDCRAFTED DAILY  ·  NO ARTIFICIAL PRESERVATIVES  ·  AI-PERSONALISED FOR YOU  ·  SAME-DAY DELIVERY  ·  GOURMET INGREDIENTS  ·  ";

export default function DonutLanding({ onOpenModal }: { onOpenModal?: () => void }) {
  return (
    <div className="w-full bg-[--color-cream]">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-24 lg:pt-40 pb-16 lg:pb-24 flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">
        {/* Left 55%: editorial copy */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8 lg:pr-16">
          {/* Eyebrow */}
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
          >
            Artisan · Gourmet · AI-Curated
          </p>

          {/* Headline */}
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-5xl lg:text-7xl font-light tracking-[-0.01em] leading-[1.1] text-[--color-ink]"
            >
              Where every bite
            </h1>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl lg:text-7xl font-light tracking-[-0.01em] leading-[1.1] text-[--color-ink] italic"
            >
              is a choice.
            </h1>
          </div>

          {/* Subheading */}
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-sm font-light text-[--color-taupe] max-w-sm leading-relaxed"
          >
            Premium desserts, personalised for you by AI.
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={onOpenModal}
              style={{ fontFamily: "var(--font-sans)" }}
              className="bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.14em] font-medium py-3 px-6 border border-[--color-ink] transition-[background-color,color] duration-200 hover:bg-[--color-cream] hover:text-[--color-ink] active:scale-[0.97] rounded-[--radius-sm] cursor-pointer"
            >
              Explore the Menu
            </button>
            <button
              onClick={onOpenModal}
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.14em] font-medium text-[--color-ink] hover:text-[--color-taupe] transition-colors duration-300 cursor-pointer"
            >
              Set Your Taste Profile →
            </button>
          </div>
        </div>

        {/* Right 45%: editorial photograph */}
        <div className="w-full lg:w-[45%] overflow-hidden h-[480px] lg:h-[600px] shrink-0">
          <img
            src={imgHero}
            alt="Gourmet dessert"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Marquee strip ─────────────────────────────────────────────── */}
      <div className="w-full bg-[--color-espresso] overflow-hidden py-3">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          <span
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[11px] uppercase tracking-[0.16em] text-[--color-cream] pr-0"
          >
            {MARQUEE_TEXT}{MARQUEE_TEXT}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
