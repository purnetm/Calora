import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ALL_PRODUCTS } from "@/app/data/products";

const imgHero =
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80";

const CHIP_BG_COLORS = ["var(--color-pistachio)", "var(--color-rose)", "var(--color-bone)"];
const CHIP_PRODUCTS = ALL_PRODUCTS.slice(0, 3).map((p, i) => ({
  name: p.name,
  price: `₹${p.price}`,
  image: p.image,
  bg: CHIP_BG_COLORS[i] ?? "var(--color-bone)",
}));

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
        className="max-w-7xl mx-auto px-6 pt-16 pb-12 lg:pb-0 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-0 items-center"
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
              Where every bite{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  lineHeight: 1.05,
                }}
                className="italic"
              >
                is a choice.
              </span>
            </h1>
          </div>

          {/* Flavor chips */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {CHIP_PRODUCTS.map((chip) => (
              <div
                key={chip.name}
                className="flex items-center gap-3 px-4 py-3 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer"
                style={{
                  background: chip.bg,
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {chip.image ? (
                  <img
                    src={chip.image}
                    alt={chip.name}
                    className="rounded-full object-cover flex-shrink-0"
                    style={{ width: 52, height: 52 }}
                  />
                ) : (
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 52, height: 52, background: "var(--color-taupe)", opacity: 0.4 }}
                  />
                )}
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--color-ink)", fontWeight: 500 }}>
                    {chip.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--color-gold)" }}>
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
            <Link to="/shop">
              <Button variant="ghost" size="lg" arrow>
                Explore Our Menu
              </Button>
            </Link>
          </div>
        </div>

        {/* Right column — hero image */}
        <div className="overflow-hidden h-[480px] lg:h-[600px]" style={{ borderRadius: "var(--radius-xl)" }}>
          <img
            src={imgHero}
            alt="Gourmet dessert"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-3 group"
        style={{ background: "var(--color-pistachio)" }}
      >
        <div
          className="group-hover:[animation-play-state:paused]"
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
            }}
          >
            {MARQUEE_SEGMENT}
            {MARQUEE_SEGMENT}
          </span>
        </div>
      </div>

    </div>
  );
}
