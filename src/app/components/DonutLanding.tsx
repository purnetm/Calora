import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Leaf, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { ALL_PRODUCTS } from "@/app/data/products";

const imgHero = "/dessertphoto.avif";

const CHIP_BG_COLORS = ["var(--color-pistachio)", "var(--color-rose)", "var(--color-bone)"];
const CHIP_PRODUCTS = ALL_PRODUCTS.slice(0, 3).map((p, i) => ({
  name: p.name,
  price: `₹${p.price}`,
  image: p.image,
  bg: CHIP_BG_COLORS[i] ?? "var(--color-bone)",
}));

const MARQUEE_SEGMENT =
  "✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ✦ Made Fresh Daily   ·   ✦ Handcrafted Flavours   ·   ";

function InfoCard({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "var(--color-pistachio)" }}
      >
        <span style={{ color: "var(--color-ink)" }}>{icon}</span>
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "var(--color-taupe)",
            marginTop: "1px",
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function DonutLanding({
  onOpenModal,
}: {
  onOpenModal?: () => void;
}) {
  return (
    <div className="w-full" style={{ background: "var(--color-cream)" }}>
      {/* ── Hero grid ─────────────────────────────────────────────────── */}
      <section
        className="max-w-[1400px] mx-auto px-4 lg:px-10 pt-16 pb-12 lg:pb-0 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-0 items-center"
        style={{ minHeight: "90vh" }}
      >
        {/* Left column — editorial copy */}
        <div className="flex flex-col lg:pr-10">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              color: "var(--color-gold)",
              letterSpacing: "0.15em",
            }}
            className="uppercase"
          >
            [PREMIUM PATISSERIE]
          </motion.p>

          {/* Headline */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 1.05,
              }}
              className="text-5xl lg:text-7xl font-light tracking-[-0.01em] text-[--color-ink]"
            >
              Where every bite is a choice.
            </h1>
          </motion.div>

          {/* Flavor cards — 3-col portrait */}
          <motion.div
            className="grid grid-cols-3 gap-3 mt-8 max-w-lg"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } } }}
          >
            {CHIP_PRODUCTS.map((chip) => (
              <motion.div
                key={chip.name}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } } }}
              >
              <Link to="/shop">
                <div
                  className="flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
                  style={{
                    background: "var(--color-ivory)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Image — square crop */}
                  <div className="w-full aspect-square overflow-hidden">
                    {chip.image ? (
                      <img
                        src={chip.image}
                        alt={chip.name}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }}
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: "var(--color-bone)" }}
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div className="px-3 py-3 flex flex-col gap-1">
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {chip.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        color: "var(--color-gold)",
                        fontWeight: 400,
                      }}
                    >
                      {chip.price}
                    </span>
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex gap-4 mt-8 flex-wrap items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72, ease: [0.23, 1, 0.32, 1] }}
          >
            <Button variant="primary" size="lg" onClick={onOpenModal}>
              Get Started
            </Button>
            <Link to="/shop">
              <Button variant="ghost" size="lg" arrow>
                Explore Our Menu
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right column — cutout image + sticker + info cards */}
        <div className="relative h-[520px] lg:h-[680px]" style={{ overflow: "visible" }}>

          <motion.img
            src={imgHero}
            alt="Gourmet dessert"
            className="w-full h-full object-cover object-center"
            style={{ borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* ── 20% Off sticker — pops in with spring ── */}
          <motion.div
            className="absolute flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.4, rotate: -24 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.65 }}
            style={{
              top: "18%",
              right: 24,
              width: 96,
              height: 96,
              background: "var(--color-pistachio-deep)",
              boxShadow: "var(--shadow-lg)",
              zIndex: 10,
              /* 20-tooth scalloped polygon */
              clipPath: `polygon(
                50% 0%, 56.7% 7.5%,
                65.5% 2.5%, 69.5% 11.7%,
                79.4% 9.5%, 80.4% 19.6%,
                90.5% 20.6%, 88.3% 30.5%,
                97.5% 34.5%, 92.5% 43.3%,
                100% 50%, 92.5% 56.7%,
                97.5% 65.5%, 88.3% 69.5%,
                90.5% 79.4%, 80.4% 80.4%,
                79.4% 90.5%, 69.5% 88.3%,
                65.5% 97.5%, 56.7% 92.5%,
                50% 100%, 43.3% 92.5%,
                34.5% 97.5%, 30.5% 88.3%,
                20.6% 90.5%, 19.6% 80.4%,
                9.5% 79.4%, 11.7% 69.5%,
                2.5% 65.5%, 7.5% 56.7%,
                0% 50%, 7.5% 43.3%,
                2.5% 34.5%, 11.7% 30.5%,
                9.5% 20.6%, 19.6% 19.6%,
                20.6% 9.5%, 30.5% 11.7%,
                34.5% 2.5%, 43.3% 7.5%
              )`,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                color: "var(--color-cream)",
                lineHeight: 1,
              }}
            >
              20%
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                color: "var(--color-cream)",
                letterSpacing: "0.14em",
                marginTop: 2,
              }}
            >
              OFF
            </span>
          </motion.div>

          {/* ── Info card — slides up from bottom-left ── */}
          <motion.div
            className="absolute flex flex-col"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              bottom: 32,
              left: -8,
              zIndex: 10,
              background: "var(--color-cream)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--color-border)",
              minWidth: 240,
              overflow: "hidden",
            }}
          >
            <InfoCard
              icon={<Leaf size={15} />}
              title="Made Fresh Daily"
              sub="Baked every morning, no preservatives"
            />
            <div style={{ height: 1, background: "var(--color-border)", margin: "0 16px" }} />
            <InfoCard
              icon={<Sparkles size={15} />}
              title="Curated for You"
              sub="AI-personalised to your taste profile"
            />
          </motion.div>
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
