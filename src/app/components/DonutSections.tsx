import React from "react";
import { Leaf, Award, Zap, Instagram, Twitter, Facebook } from "lucide-react";
import ProductCard from "./ProductCard";

// ── Stats strip ────────────────────────────────────────────────────────────

const STATS = [
  { numeral: "2,400+", lines: ["Desserts", "Personalised", "by AI"] },
  { numeral: "18",     lines: ["Flavour", "Profiles", "Available"] },
  { numeral: "100%",   lines: ["Plant-based", "Ingredients", "Sourced"] },
];

// ── Editorial 3-col features ───────────────────────────────────────────────

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Plant Based",
    body: "Made entirely from plants, so you can indulge while being kind to the planet and your body.",
  },
  {
    icon: Zap,
    title: "Low Calorie",
    body: "Under 150 calories per serving. Finally, a treat that fits your daily macros perfectly.",
  },
  {
    icon: Award,
    title: "Premium Ingredients",
    body: "No artificial flavors, colors, or preservatives. Real, high-quality ingredients you can pronounce.",
  },
];

// ── Pricing ────────────────────────────────────────────────────────────────

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
  onSelect: () => void;
}

function PricingCard({ title, price, features, recommended = false, onSelect }: PricingCardProps) {
  return (
    <div
      className={`border p-8 flex flex-col gap-6 transition-all duration-300 ${
        recommended
          ? "bg-[--color-ink] text-[--color-cream] border-[--color-ink]"
          : "bg-[--color-cream] border-[--color-border] text-[--color-ink] hover:border-[--color-ink]"
      }`}
    >
      {recommended && (
        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-[10px] uppercase tracking-[0.14em] text-[--color-gold]"
        >
          Most Popular
        </p>
      )}
      <div className="flex flex-col gap-2">
        <h3
          style={{ fontFamily: "var(--font-display)" }}
          className={`text-xl font-light ${recommended ? "text-[--color-cream]" : "text-[--color-ink]"}`}
        >
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-serif)" }} className="text-3xl font-medium">
          {price}
        </p>
        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className={`text-[11px] uppercase tracking-[0.1em] ${recommended ? "text-[--color-cream]/60" : "text-[--color-taupe]"}`}
        >
          /box
        </p>
      </div>
      <div className={`h-px w-full ${recommended ? "bg-[--color-cream]/20" : "bg-[--color-border]"}`} />
      <ul className="flex flex-col gap-3 flex-grow">
        {features.map((f, i) => (
          <li
            key={i}
            style={{ fontFamily: "var(--font-sans)" }}
            className={`text-xs leading-relaxed ${recommended ? "text-[--color-cream]/80" : "text-[--color-taupe]"}`}
          >
            — {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        style={{ fontFamily: "var(--font-sans)" }}
        className={`w-full py-3 text-xs uppercase tracking-[0.14em] font-medium border transition-all duration-300 cursor-pointer ${
          recommended
            ? "bg-[--color-cream] text-[--color-ink] border-[--color-cream] hover:bg-transparent hover:text-[--color-cream]"
            : "bg-[--color-ink] text-[--color-cream] border-[--color-ink] hover:bg-[--color-cream] hover:text-[--color-ink]"
        }`}
      >
        Choose {title}
      </button>
    </div>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────

function TestimonialCard({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <div className="border border-[--color-border] p-8 bg-[--color-ivory] flex flex-col gap-6">
      <p style={{ fontFamily: "var(--font-serif)" }} className="text-base font-light leading-relaxed text-[--color-ink] italic">
        "{text}"
      </p>
      <div>
        <p style={{ fontFamily: "var(--font-sans)" }} className="text-xs font-medium text-[--color-ink] uppercase tracking-[0.1em]">
          {author}
        </p>
        <p style={{ fontFamily: "var(--font-sans)" }} className="text-[11px] text-[--color-taupe] mt-0.5">
          {role}
        </p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export default function DonutSections({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex flex-col w-full">

      {/* ── 1. Stats strip + Editorial features ─────────────────────── */}
      <section className="py-24 px-4 w-full bg-[--color-ivory]">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-20">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-5xl font-light text-[--color-ink]"
                >
                  {s.numeral}
                </span>
                <div className="flex flex-col gap-0.5">
                  {s.lines.map((l, j) => (
                    <span
                      key={j}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-xs uppercase tracking-[0.14em] text-[--color-taupe]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3-col editorial features */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[--color-border]">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="flex flex-col gap-4 px-0 py-8 md:py-0 md:px-10 first:pl-0 last:pr-0">
                <Icon size={24} strokeWidth={1.5} className="text-[--color-taupe]" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-light text-[--color-ink]"
                >
                  {title}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-sm font-light text-[--color-taupe] leading-relaxed"
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Featured Flavors ──────────────────────────────────────── */}
      <section className="py-24 px-4 w-full bg-[--color-cream]">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
            >
              This Week
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl lg:text-4xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              Flavor drops of the week
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <ProductCard
              id="red-velvet"
              image="https://images.unsplash.com/photo-1761746350777-b86ae72e8f41?auto=format&fit=crop&w=1080&q=80"
              name="Red Velvet Supreme"
              description="Classic red velvet cupcake with a keto-friendly cream cheese frosting."
              calories={130}
              price={360}
            />
            <ProductCard
              id="pistachio-mac"
              image="https://images.unsplash.com/photo-1519734014-fec887b3d784?auto=format&fit=crop&w=1080&q=80"
              name="Pistachio Macaron"
              description="Real ground pistachio shell and ganache. Delicate and nutty."
              calories={70}
              price={240}
            />
            <ProductCard
              id="blueberry-cheese"
              image="https://images.unsplash.com/photo-1720586407185-c7651d7d0397?auto=format&fit=crop&w=1080&q=80"
              name="Blueberry Cheesecake"
              description="Fresh blueberry compote swirled into vanilla bean cheesecake."
              calories={220}
              price={540}
            />
            <ProductCard
              id="mango-sorbet"
              image="https://images.unsplash.com/photo-1561223463-8fd373e00087?auto=format&fit=crop&w=1080&q=80"
              name="Mango Sorbet"
              description="Pure mango puree frozen to refreshing perfection."
              calories={90}
              price={440}
            />
          </div>
        </div>
      </section>

      {/* ── 3. Subscription Plans ────────────────────────────────────── */}
      <section id="subscription" className="py-24 px-4 w-full bg-[--color-ivory]">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-1">
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
            >
              Membership
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl lg:text-4xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              Join the club
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[--color-border]">
            <PricingCard
              title="Starter"
              price="₹2299"
              features={["6 items per box", "Standard shipping", "Mystery flavor sample"]}
              onSelect={onOpenModal}
            />
            <PricingCard
              title="Snack Pro"
              price="₹3999"
              features={["12 items per box", "Free express shipping", "First access to new drops", "Exclusive merch"]}
              recommended={true}
              onSelect={onOpenModal}
            />
            <PricingCard
              title="Family"
              price="₹6999"
              features={["24 items per box", "Free express shipping", "Custom flavor requests", "Quarterly gift"]}
              onSelect={onOpenModal}
            />
          </div>
        </div>
      </section>

      {/* ── 4. Testimonials ──────────────────────────────────────────── */}
      <section className="py-24 px-4 w-full bg-[--color-cream]">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-1">
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
            >
              Voices
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl lg:text-4xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              Don't take our word for it
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TestimonialCard
              text="I can't believe these are healthy. They taste exactly like the desserts I grew up with, but without the sugar crash."
              author="Sarah Jenkins"
              role="Yoga Instructor"
            />
            <TestimonialCard
              text="Finally a snack I can keep in the office that doesn't derail my fitness goals. The Macarons are incredible."
              author="David Chen"
              role="Software Engineer"
            />
            <TestimonialCard
              text="My kids love them and have no idea they're eating plant-based. Total win for our household!"
              author="Emily Ross"
              role="Mother of 3"
            />
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ─────────────────────────────────────────────── */}
      <section className="py-32 px-4 w-full bg-[--color-bone]">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-3">
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
            >
              Ready?
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-4xl lg:text-5xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              Treat yourself — you've earned it.
            </h2>
          </div>
          <button
            onClick={onOpenModal}
            style={{ fontFamily: "var(--font-sans)" }}
            className="bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.14em] font-medium py-3 px-8 border border-[--color-ink] transition-all duration-300 hover:bg-[--color-cream] hover:text-[--color-ink] cursor-pointer"
          >
            Get Your First Box
          </button>
        </div>
      </section>

      {/* ── 6. Footer ────────────────────────────────────────────────── */}
      <footer className="bg-[--color-espresso] text-[--color-cream] py-16 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl font-light tracking-[0.04em]"
            >
              Calora
            </div>
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs font-light text-[--color-taupe] max-w-xs leading-relaxed"
            >
              Redefining the way you snack, one plant-based treat at a time.
            </p>
            <div className="flex gap-4">
              <Instagram size={16} className="text-[--color-taupe] hover:text-[--color-cream] cursor-pointer transition-colors duration-300" />
              <Twitter size={16} className="text-[--color-taupe] hover:text-[--color-cream] cursor-pointer transition-colors duration-300" />
              <Facebook size={16} className="text-[--color-taupe] hover:text-[--color-cream] cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {[
            { heading: "Shop", links: ["All Flavors", "Variety Boxes", "Subscriptions", "Gift Cards"] },
            { heading: "Company", links: ["Our Story", "Ingredients", "Sustainability", "Careers"] },
            { heading: "Support", links: ["FAQ", "Shipping", "Returns", "Contact Us"] },
          ].map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-[11px] uppercase tracking-[0.16em] text-[--color-cream]"
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li
                    key={link}
                    style={{ fontFamily: "var(--font-sans)" }}
                    className="text-xs font-light text-[--color-taupe] hover:text-[--color-cream] cursor-pointer transition-colors duration-300"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-[--color-cream]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[11px] text-[--color-taupe]"
          >
            © 2024 Calora Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service"].map(item => (
              <span
                key={item}
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-[11px] text-[--color-taupe] hover:text-[--color-cream] cursor-pointer transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
