import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button, SectionHeader } from "@/components/ui";
import ProductCard from "./ProductCard";

// ── Featured product pool (cycled via arrow pager) ─────────────────────────

const FEATURED_PRODUCTS = [
  {
    id: "red-velvet",
    image:
      "https://images.unsplash.com/photo-1761746350777-b86ae72e8f41?auto=format&fit=crop&w=1080&q=80",
    name: "Red Velvet Supreme",
    description:
      "Classic red velvet cupcake with a keto-friendly cream cheese frosting.",
    calories: 130,
    price: 360,
  },
  {
    id: "pistachio-mac",
    image:
      "https://images.unsplash.com/photo-1519734014-fec887b3d784?auto=format&fit=crop&w=1080&q=80",
    name: "Pistachio Macaron",
    description:
      "Real ground pistachio shell and ganache. Delicate and nutty.",
    calories: 70,
    price: 240,
  },
  {
    id: "blueberry-cheese",
    image:
      "https://images.unsplash.com/photo-1720586407185-c7651d7d0397?auto=format&fit=crop&w=1080&q=80",
    name: "Blueberry Cheesecake",
    description:
      "Fresh blueberry compote swirled into vanilla bean cheesecake.",
    calories: 220,
    price: 540,
  },
  {
    id: "mango-sorbet",
    image:
      "https://images.unsplash.com/photo-1561223463-8fd373e00087?auto=format&fit=crop&w=1080&q=80",
    name: "Mango Sorbet",
    description: "Pure mango puree frozen to refreshing perfection.",
    calories: 90,
    price: 440,
  },
  {
    id: "salted-caramel",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1080&q=80",
    name: "Salted Caramel Tart",
    description: "Buttery pastry shell filled with rich golden caramel and flaky sea salt.",
    calories: 180,
    price: 480,
  },
  {
    id: "rose-eclair",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1080&q=80",
    name: "Rose Petal Éclair",
    description: "Choux pastry filled with rose cream and topped with a delicate glaze.",
    calories: 150,
    price: 320,
  },
];

// ── Gallery photos ─────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
  "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=80",
];

// ── Per-page constants ─────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 3;
const TESTIMONIALS_PER_PAGE = 3;

// ── Testimonials data ──────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Calora has completely redefined what a weekly sweet treat can feel like. Every box arrives like a small celebration — beautifully composed and always memorable.",
    author: "Priya Sharma",
    role: "Creative Director",
  },
  {
    quote:
      "I've sent Calora gift boxes to every single one of our corporate partners this year. The response is always the same: pure delight. Nothing else comes close.",
    author: "Arjun Mehta",
    role: "Head of Partnerships",
  },
  {
    quote:
      "The pistachio macarons are genuinely the best I've had outside of Paris. Calora brings proper craft to Indian patisserie and it shows in every bite.",
    author: "Kavya Reddy",
    role: "Food Writer",
  },
  {
    quote:
      "We chose Calora for our wedding dessert table and it was the talk of the reception. Thoughtful, elegant, and absolutely delicious.",
    author: "Rohan & Ishaani",
    role: "Newlyweds",
  },
  {
    quote:
      "Subscribing was the best decision. Knowing a box of something beautiful is on its way every month is a small luxury I refuse to give up.",
    author: "Meera Iyer",
    role: "Architect",
  },
  {
    quote:
      "The presentation is museum-quality and the flavours live up to it. Calora is not a dessert brand — it's a ritual.",
    author: "Vikram Joshi",
    role: "Restaurateur",
  },
];

// ── Pricing plans ──────────────────────────────────────────────────────────

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Essential",
    price: "₹1,499",
    features: [
      "6 curated desserts monthly",
      "Standard city delivery",
      "Seasonal flavour rotation",
      "Recipe cards included",
    ],
  },
  {
    name: "Signature",
    price: "₹2,999",
    recommended: true,
    features: [
      "12 curated desserts monthly",
      "Priority express delivery",
      "First access to new drops",
      "Complimentary tasting note",
      "Quarterly chef's surprise",
    ],
  },
  {
    name: "Prestige",
    price: "₹5,499",
    features: [
      "24 curated desserts monthly",
      "Free same-day delivery",
      "Custom flavour requests",
      "Private chef consultation",
      "Annual gift hamper",
    ],
  },
];

// ── TestimonialCard (sub-component) ────────────────────────────────────────

function TestimonialCard({ quote, author, role }: Testimonial) {
  return (
    <div
      style={{
        background: "var(--color-ivory)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        padding: 24,
      }}
      className="flex flex-col h-full transition-transform duration-200 hover:-translate-y-1"
    >
      {/* Stars */}
      <p
        style={{
          color: "var(--color-gold)",
          fontSize: 14,
          letterSpacing: "0.12em",
          lineHeight: 1,
        }}
      >
        ★★★★★
      </p>

      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-gold)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginTop: 10,
        }}
      >
        4.8 Star Rating
      </p>

      {/* Quote */}
      <p
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--color-ink)",
          fontSize: 15,
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.6,
          marginTop: 14,
        }}
      >
        "{quote}"
      </p>

      {/* Divider */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          margin: "16px 0",
        }}
      />

      {/* Author row */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-full)",
            background: "var(--color-bone)",
          }}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {author}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-taupe)",
              fontSize: 12,
            }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── PricingCard (sub-component) ────────────────────────────────────────────

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
}

function PricingCard({ plan, onSelect }: PricingCardProps) {
  const { name, price, features, recommended } = plan;

  const cardStyle: React.CSSProperties = recommended
    ? {
        background: "var(--color-ink)",
        color: "var(--color-cream)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: 32,
      }
    : {
        background: "var(--color-ivory)",
        color: "var(--color-ink)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        padding: 32,
      };

  const nameColor = recommended ? "var(--color-cream)" : "var(--color-ink)";
  const priceColor = recommended ? "var(--color-cream)" : "var(--color-ink)";
  const subColor = recommended
    ? "rgba(251, 247, 240, 0.7)" /* --color-cream with opacity */
    : "var(--color-taupe)";
  const featureColor = recommended
    ? "rgba(251, 247, 240, 0.85)" /* --color-cream with opacity */
    : "var(--color-ink)";
  const checkColor = recommended
    ? "var(--color-pistachio)"
    : "var(--color-pistachio-deep)";

  return (
    <div style={cardStyle} className="flex flex-col gap-6 h-full transition-transform duration-200 hover:-translate-y-1">
      {/* Plan badge */}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: recommended ? "var(--color-gold)" : "var(--color-taupe)",
        }}
      >
        {recommended ? `${name} · Recommended` : name}
      </span>

      {/* Price */}
      <div className="flex flex-col gap-1">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            fontWeight: 300,
            color: priceColor,
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: subColor,
          }}
        >
          /month
        </span>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-grow">
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: featureColor,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: checkColor, fontWeight: 600 }} aria-hidden="true">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={onSelect}
        variant={recommended ? "outline" : "primary"}
        size="lg"
        className="self-center"
        style={
          recommended
            ? {
                color: "var(--color-cream)",
                borderColor: "var(--color-cream)",
              }
            : undefined
        }
      >
        Choose {name}
      </Button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export default function DonutSections({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  // Featured products pager: 3 at a time
  const [featuredPage, setFeaturedPage] = useState(0);
  const totalFeaturedPages = Math.max(
    1,
    Math.ceil(FEATURED_PRODUCTS.length / PRODUCTS_PER_PAGE)
  );
  const visibleProducts = useMemo(() => {
    const start = (featuredPage * PRODUCTS_PER_PAGE) % FEATURED_PRODUCTS.length;
    return Array.from({ length: PRODUCTS_PER_PAGE }, (_, i) =>
      FEATURED_PRODUCTS[(start + i) % FEATURED_PRODUCTS.length]
    );
  }, [featuredPage]);

  // Testimonial pager: 3 at a time
  const [testimonialPage, setTestimonialPage] = useState(0);
  const totalTestimonialPages = Math.max(
    1,
    Math.ceil(TESTIMONIALS.length / TESTIMONIALS_PER_PAGE)
  );
  const visibleTestimonials = useMemo(() => {
    const start = (testimonialPage * TESTIMONIALS_PER_PAGE) % TESTIMONIALS.length;
    return Array.from({ length: TESTIMONIALS_PER_PAGE }, (_, i) =>
      TESTIMONIALS[(start + i) % TESTIMONIALS.length]
    );
  }, [testimonialPage]);

  return (
    <div className="flex flex-col w-full">
      {/* === 4a. Stats Bar ====================================== */}
      <section
        className="w-full py-12"
        style={{
          background: "var(--color-ivory)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center">
            {[
              { numeral: "1,200+", label: "Happy Customers" },
              { numeral: "50+", label: "Flavours" },
              { numeral: "4.8★", label: "Avg Rating" },
              { numeral: "3 Cities", label: "Delivery" },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "3rem",
                      fontWeight: 300,
                      color: "var(--color-ink)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.numeral}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--color-taupe)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <span
                    className="mx-6"
                    style={{
                      color: "var(--color-taupe)",
                      fontWeight: 200,
                      fontSize: "2rem",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* === 4b. About / Story ================================= */}
      <section
        className="w-full py-20 lg:py-28"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left column */}
            <div className="flex flex-col gap-8">
              <SectionHeader
                eyebrow="ABOUT CALORA"
                headline="Small-batch patisserie, thoughtfully delivered."
                description="Calora is a patisserie house built around one quiet idea — that dessert should feel like a small, considered ritual. Every box we send is hand-finished by our kitchen, crafted from seasonal ingredients, and packed with the kind of care you'd give a gift."
              />

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-taupe)",
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                We work with a rotating menu of fifty-plus flavours, drawing
                from French technique and Indian pantry. Whether it's a
                subscription, a corporate gift, or a wedding dessert table —
                the goal is always the same: something memorable, made by
                hand.
              </p>

              {/* Social proof row */}
              <div className="flex flex-wrap items-center gap-8">
                {/* Customers */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={"avatar-" + i}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "var(--radius-full)",
                          background:
                            i === 0
                              ? "var(--color-bone)"
                              : i === 1
                              ? "var(--color-pistachio)"
                              : "var(--color-rose)",
                          border: "2px solid var(--color-cream)",
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--color-ink)",
                      fontWeight: 500,
                    }}
                  >
                    1200+ Happy Customers
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      color: "var(--color-gold)",
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--color-ink)",
                      fontWeight: 500,
                    }}
                  >
                    4.8 Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — image */}
            <div className="relative">
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  aspectRatio: "4 / 5",
                }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80"
                  alt="A selection of Calora desserts"
                  className="w-full h-full object-cover"
                />
                {/* Watermark */}
                <div
                  className="absolute bottom-6 left-6 pointer-events-none select-none"
                  style={{
                    fontFamily: "var(--font-script)",
                    color: "var(--color-cream)",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    opacity: 0.75,
                    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                  }}
                  aria-hidden="true"
                >
                  Calora
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === 4c. Featured Products ============================= */}
      <section
        className="w-full py-20 lg:py-28"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <SectionHeader
            eyebrow="WHAT WE OFFER"
            headline="Flavours of the season."
            description="A curated rotation of six desserts this month, hand-finished and delivered fresh to your door."
            arrows
            onPrev={() =>
              setFeaturedPage(
                (p) => (p - 1 + totalFeaturedPages) % totalFeaturedPages
              )
            }
            onNext={() =>
              setFeaturedPage((p) => (p + 1) % totalFeaturedPages)
            }
          />

          <motion.div
            key={featuredPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* === 4d. Feature Strip (pistachio band) ================ */}
      <section
        className="w-full py-16"
        style={{ background: "var(--color-pistachio)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left (40%) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--color-ink)",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Fresh Flavours, Whenever You Need Them
              </h3>
              <div>
                <Link to="/shop">
                  <Button variant="outline" size="md" arrow>
                    View Full Menu
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right (60%) */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Pickup & Delivery",
                  body: "Same-day delivery available",
                },
                {
                  icon: "🎁",
                  title: "Gift Boxes",
                  body: "Custom corporate gifting",
                },
                {
                  icon: "🎉",
                  title: "Event Catering",
                  body: "Weddings & private events",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <span
                    style={{ fontSize: 24, lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--color-taupe)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === 4e. Gallery / A Taste of What We Do ============== */}
      <section
        className="w-full py-20 lg:py-28 overflow-hidden"
        style={{ background: "var(--color-bone)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <SectionHeader
            eyebrow="PAST EVENTS"
            headline="A Taste of What We Do"
            description="From intimate dinners to full-scale weddings — a glimpse of recent Calora moments."
          />

          {/* Photo row */}
          <div className="flex items-end justify-center">
            {GALLERY_PHOTOS.map((src, i) => {
              const isEdge = i === 0 || i === 4;
              const isMid = i === 1 || i === 3;
              const isCenter = i === 2;

              const rotateVal = isEdge ? -6 : isMid ? -3 : 0;
              const scale = isEdge ? 0.9 : isMid ? 0.95 : 1;
              const opacity = isEdge ? 0.8 : isMid ? 0.9 : 1;
              const overlap = !isCenter;

              return (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20, rotate: rotateVal, scale }}
                  whileInView={{ opacity, y: 0, rotate: rotateVal, scale }}
                  whileHover={{ scale: 1.05, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    overflow: "hidden",
                  }}
                  className={`aspect-square w-48 shrink-0 relative hover:z-10 ${
                    isCenter ? "z-[2]" : isMid ? "z-[1]" : "z-0"
                  } ${overlap ? "mx-[-12px]" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Calora gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Instagram pill */}
          <div className="flex justify-center">
            <a
              href="https://instagram.com/calora_sweets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm">
                @calora_sweets
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* === 4f. Testimonials ================================= */}
      <section
        className="w-full py-20 lg:py-28"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <SectionHeader
            eyebrow="TESTIMONIALS"
            headline="What Our Clients Say"
            description="A few words from the people who keep the oven warm."
            arrows
            onPrev={() =>
              setTestimonialPage(
                (p) => (p - 1 + totalTestimonialPages) % totalTestimonialPages
              )
            }
            onNext={() =>
              setTestimonialPage((p) => (p + 1) % totalTestimonialPages)
            }
          />

          <motion.div
            key={testimonialPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleTestimonials.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* === 4g. Subscription / Pricing ======================= */}
      <section
        id="subscription"
        className="w-full py-20 lg:py-28"
        style={{ background: "var(--color-ivory)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
          <SectionHeader
            eyebrow="SUBSCRIBE & SAVE"
            headline="Choose Your Sweet Plan"
            description="Three ways to make Calora part of your month. Pause or cancel any time."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onSelect={onOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* === 4h. Final CTA Banner ============================= */}
      <section
        className="w-full py-16 lg:py-24"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "var(--color-cream)",
                  lineHeight: 1.15,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                Treat yourself — you've earned it.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  color: "rgba(251, 247, 240, 0.75)", /* --color-cream with opacity */
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "34rem",
                }}
              >
                Start a subscription today, or send a Calora box to someone
                who deserves a little sweetness this week.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={onOpenModal}
                style={{
                  color: "var(--color-cream)",
                  borderColor: "var(--color-cream)",
                }}
              >
                Start Subscription
              </Button>
              <Link to="/shop">
                <Button
                  variant="ghost"
                  size="md"
                  arrow
                  style={{ color: "var(--color-cream)" }}
                >
                  Explore Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === 4i. Footer ======================================= */}
      <footer
        className="w-full py-12"
        style={{
          background: "var(--color-cream)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 — Logo + tagline */}
            <div className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: "var(--color-ink)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              >
                Calora
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--color-taupe)",
                  lineHeight: 1.6,
                  maxWidth: "18rem",
                }}
              >
                Small-batch patisserie — delivered with care, crafted with
                intent.
              </p>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="flex flex-col gap-3">
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="#subscription"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Subscription
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 — Support */}
            <div className="flex flex-col gap-3">
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Support
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Delivery Info
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 — Follow Us */}
            <div className="flex flex-col gap-3">
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Follow Us
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--color-taupe)" }}
                    className="hover:text-[--color-ink] transition-colors duration-200"
                  >
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="mt-10 pt-6 text-center"
            style={{
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--color-taupe)",
              }}
            >
              © 2025 Calora. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
