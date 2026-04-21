import React from "react";
import Button from "@/components/ui/Button";
import { ALL_PRODUCTS } from "@/app/data/products";

const imgHero =
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80";

// Use first 3 products for chips, falling back to hardcoded data
const CHIP_PRODUCTS = ALL_PRODUCTS.slice(0, 3).length >= 3
  ? ALL_PRODUCTS.slice(0, 3).map((p) => ({
      name: p.name,
      price: `₹${p.price}`,
      image: p.image,
      bg: "",
    }))
  : [
      { name: "Pistachio Cream", price: "₹180", image: "", bg: "" },
      { name: "Rose Petal", price: "₹160", image: "", bg: "" },
      { name: "Classic Glazed", price: "₹140", image: "", bg: "" },
    ];

const CHIP_BG_COLORS = [
  "var(--color-pistachio)",
  "var(--color-rose)",
  "var(--color-bone)",
];

const MARQUEE_SEGMENT =
  "✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ";

export default function DonutLanding({
  onOpenModal,
}: {
  onOpenModal?: () => void;
}) {
  return (
    <div className="w-full" style={{ background: "var(--color-cream)" }}>
      {/* ── Hero grid ─────────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-0 items-center"
        style={{ minHeight: "90vh" }}
      >
        {/* Left column — editorial copy */}
        <div className="flex flex-col lg:pr-16">
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              color: "var(--color-gold)",
              letterSpacing: "0.15em",
            }}
            className="uppercase"
          >
            [PREMIUM PATISSERIE]
          </p>

          {/* Headline */}
          <div className="mt-5">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 1.05,
              }}
              className="text-5xl lg:text-7xl font-light tracking-[-0.01em] text-[--color-ink]"
            >
              Where every bite
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                lineHeight: 1.05,
              }}
              className="text-5xl lg:text-7xl font-light tracking-[-0.01em] text-[--color-ink] italic"
            >
              is a choice.
            </h1>
          </div>

          {/* Flavor chips */}
          <div className="flex gap-3 mt-6 flex-wrap">
            {CHIP_PRODUCTS.map((chip, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2"
                style={{
                  background: CHIP_BG_COLORS[i],
                  borderRadius: "var(--radius-base, 14px)",
                }}
              >
                {/* Small circular image */}
                {chip.image ? (
                  <img
                    src={chip.image}
                    alt={chip.name}
                    className="rounded-full object-cover flex-shrink-0"
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--color-taupe)",
                      opacity: 0.4,
                    }}
                  />
                )}
                {/* Name + price */}
                <div className="flex flex-col">
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "var(--color-ink)",
                    }}
                  >
                    {chip.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      color: "var(--color-gold)",
                    }}
                  >
                    {chip.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-4 mt-8 flex-wrap items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenModal}
            >
              Book Your Event
            </Button>
            <Button
              variant="ghost"
              size="lg"
              arrow
              onClick={onOpenModal}
            >
              Explore Our Menu
            </Button>
          </div>
        </div>

        {/* Right column — hero image */}
        <div className="overflow-hidden h-[480px] lg:h-[600px]">
          <img
            src={imgHero}
            alt="Gourmet dessert"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-3"
        style={{ background: "var(--color-pistachio)" }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee 28s linear infinite",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "var(--color-ink)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {MARQUEE_SEGMENT}
            {MARQUEE_SEGMENT}
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
