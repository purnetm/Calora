// AI-POWERED (AI-generated flavor descriptions via streaming)
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { streamClaude } from "../lib/anthropic";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlavorTag {
  emoji: string;
  label: string;
}

interface AIProductData {
  flavorTags: FlavorTag[];
  pairsWith: string;
  bestFor: string;
}

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  calories: number;
  price: number;
  compact?: boolean;
}

// ─── Mock flavor generator (fallback when API is unavailable) ────────────────

const MOCK_PROFILES: { keywords: string[]; data: AIProductData }[] = [
  {
    keywords: ["chocolate", "choc", "velvet", "brownie", "fudge", "cocoa"],
    data: {
      flavorTags: [{ emoji: "🍫", label: "Deep Cocoa" }, { emoji: "🧂", label: "Sea Salt Finish" }, { emoji: "🥛", label: "Creamy Milk" }],
      pairsWith: "masala chai or cold-brew coffee",
      bestFor: "Post-dinner treat ✦ Gifting",
    },
  },
  {
    keywords: ["lemon", "citrus", "zest", "orange", "lime"],
    data: {
      flavorTags: [{ emoji: "🍋", label: "Bright Citrus" }, { emoji: "🌸", label: "Floral Lift" }, { emoji: "✨", label: "Tangy Finish" }],
      pairsWith: "sparkling water with mint or green tea",
      bestFor: "Afternoon refresh ✦ Light dessert",
    },
  },
  {
    keywords: ["berry", "blueberry", "raspberry", "strawberry"],
    data: {
      flavorTags: [{ emoji: "🫐", label: "Jammy Berries" }, { emoji: "🌿", label: "Fresh Herb" }, { emoji: "🍦", label: "Vanilla Cream" }],
      pairsWith: "chamomile tea or a light rosé",
      bestFor: "Brunch treat ✦ Gifting",
    },
  },
  {
    keywords: ["macaron", "almond", "pistachio", "vanilla", "french"],
    data: {
      flavorTags: [{ emoji: "🌰", label: "Toasted Nut" }, { emoji: "🍬", label: "Delicate Sweet" }, { emoji: "🧁", label: "Airy Shell" }],
      pairsWith: "Earl Grey tea or a flat white",
      bestFor: "Gifting ✦ Celebration",
    },
  },
  {
    keywords: ["caramel", "salted", "butterscotch", "toffee"],
    data: {
      flavorTags: [{ emoji: "🍯", label: "Golden Caramel" }, { emoji: "🧂", label: "Sea Salt" }, { emoji: "🧈", label: "Butter Richness" }],
      pairsWith: "black coffee or warm oat milk",
      bestFor: "Late-night treat ✦ Self-care",
    },
  },
  {
    keywords: ["mango", "sorbet", "tropical", "passion"],
    data: {
      flavorTags: [{ emoji: "🥭", label: "Ripe Mango" }, { emoji: "🌴", label: "Tropical Burst" }, { emoji: "❄️", label: "Icy Clean Finish" }],
      pairsWith: "chilled coconut water or mint lemonade",
      bestFor: "Summer refresher ✦ Post-workout",
    },
  },
  {
    keywords: ["cheesecake", "cream cheese", "ny"],
    data: {
      flavorTags: [{ emoji: "🧀", label: "Tangy Cream" }, { emoji: "🍪", label: "Buttery Crust" }, { emoji: "🍋", label: "Subtle Citrus" }],
      pairsWith: "filter coffee or a light dessert wine",
      bestFor: "Celebrating ✦ Weekend indulgence",
    },
  },
  {
    keywords: ["cookie", "oatmeal", "raisin", "chunk"],
    data: {
      flavorTags: [{ emoji: "🍪", label: "Warm Spice" }, { emoji: "🍫", label: "Dark Chocolate" }, { emoji: "🌾", label: "Hearty Oat" }],
      pairsWith: "cold milk or a spiced latte",
      bestFor: "Snack time ✦ Kids & adults alike",
    },
  },
];

const DEFAULT_MOCK: AIProductData = {
  flavorTags: [{ emoji: "✨", label: "Artisan Craft" }, { emoji: "🍬", label: "Balanced Sweet" }, { emoji: "🌿", label: "Clean Finish" }],
  pairsWith: "your favourite hot brew or chilled sparkling water",
  bestFor: "Any occasion ✦ Everyday treat",
};

function getMockFlavor(name: string, description: string): AIProductData {
  const hay = `${name} ${description}`.toLowerCase();
  const match = MOCK_PROFILES.find(p => p.keywords.some(k => hay.includes(k)));
  return match?.data ?? DEFAULT_MOCK;
}

// ─── AI system prompt ─────────────────────────────────────────────────────────

const AI_SYSTEM_PROMPT =
  `You are a gourmet dessert flavor writer for Calora. Given a dessert's name, base description, ` +
  `and calorie count, generate a short flavor experience summary in this exact JSON format: ` +
  `{ "flavorTags": [{"emoji": "...", "label": "..."}, {"emoji": "...", "label": "..."}, {"emoji": "...", "label": "..."}], ` +
  `"pairsWith": "...", "bestFor": "..." }. ` +
  `Keep it warm, poetic, and appetizing. Avoid generic words like "delicious" or "yummy". Return only valid JSON.`;

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function AISkeleton() {
  return (
    <div className="flex flex-col gap-2.5 animate-pulse pt-3">
      <div className="flex gap-1.5">
        <div className="h-5 w-20 bg-[--color-bone]" />
        <div className="h-5 w-16 bg-[--color-bone]" />
        <div className="h-5 w-24 bg-[--color-bone]" />
      </div>
      <div className="h-2.5 bg-[--color-bone] w-4/5" />
      <div className="h-2.5 bg-[--color-bone] w-3/5" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({
  id, image, name, description, calories, price, compact = false
}: ProductCardProps) {
  const { addToCart } = useCart();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<AIProductData | null>(null);

  const cache = useRef<AIProductData | null>(null);
  const buffer = useRef("");

  const fetchAI = useCallback(async () => {
    if (cache.current) {
      setAiData(cache.current);
      return;
    }

    setIsStreaming(true);
    setStreamError(null);
    buffer.current = "";

    await streamClaude(
      [{ role: "user", content: `Name: ${name}\nDescription: ${description}\nCalories: ${calories}` }],
      {
        system: AI_SYSTEM_PROMPT,
        maxTokens: 300,
        onChunk: (text) => {
          buffer.current += text;
          try {
            const parsed = JSON.parse(buffer.current) as AIProductData;
            cache.current = parsed;
            setAiData(parsed);
          } catch { /* keep accumulating */ }
        },
        onDone: () => {
          setIsStreaming(false);
          if (!cache.current) {
            try {
              const parsed = JSON.parse(buffer.current) as AIProductData;
              cache.current = parsed;
              setAiData(parsed);
            } catch {
              const mock = getMockFlavor(name, description);
              cache.current = mock;
              setAiData(mock);
            }
          }
        },
        onError: () => {
          setIsStreaming(false);
          const mock = getMockFlavor(name, description);
          cache.current = mock;
          setAiData(mock);
        },
      }
    );
  }, [name, description, calories]);

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      setIsExpanded(true);
      fetchAI();
    } else {
      setIsExpanded(false);
    }
  }, [isExpanded, fetchAI]);

  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsExpanded(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  const handleAddToCart = () => addToCart({ id, name, price, image, calories });

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className={`bg-[--color-card] border border-[--color-border] overflow-hidden flex flex-col group transition-all duration-300 hover:border-[--color-ink] hover:-translate-y-0.5 ${
        compact ? "text-sm" : ""
      } ${isExpanded ? "border-[--color-ink]" : ""}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden border-b border-[--color-border] ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute bg-[--color-cream]/80 backdrop-blur-sm border border-[--color-border] flex items-center justify-center ${
            compact ? "top-2 right-2 px-2 py-0.5" : "top-3 right-3 px-2 py-0.5"
          }`}
        >
          <span
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[10px] uppercase tracking-[0.1em] text-[--color-ink]"
          >
            {calories} cal
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-grow ${compact ? "p-3 gap-2" : "p-5 gap-3"}`}>
        {/* Name + price */}
        <div className="flex justify-between items-start gap-2">
          <button
            onClick={toggleExpand}
            style={{ fontFamily: "var(--font-serif)" }}
            className={`font-normal text-[--color-ink] text-left hover:text-[--color-taupe] transition-colors duration-300 tracking-[-0.01em] ${
              compact ? "text-sm leading-tight" : "text-base"
            }`}
          >
            {name}
          </button>
          <span
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-sm font-medium shrink-0 text-[--color-ink]"
          >
            ₹{price.toFixed(2)}
          </span>
        </div>

        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className={`text-[--color-taupe] font-light line-clamp-2 ${compact ? "text-[11px]" : "text-xs"}`}
        >
          {description}
        </p>

        {/* ── AI expanded section ───────────────────────────────────── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="ai-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-1 border-t border-[--color-border] bg-[--color-bone] -mx-3 px-3 pb-3">
                {isStreaming && !aiData && <AISkeleton />}

                {aiData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 pt-1"
                  >
                    {/* Flavor tags */}
                    <div>
                      <p
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="text-[10px] uppercase tracking-[0.1em] text-[--color-taupe] mb-1.5"
                      >
                        Flavor Profile
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {aiData.flavorTags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                            style={{ fontFamily: "var(--font-sans)" }}
                            className="text-[11px] px-2 py-0.5 border border-[--color-border] text-[--color-ink] uppercase tracking-[0.08em]"
                          >
                            {tag.emoji} {tag.label}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Pairs with */}
                    <p
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-sm italic text-[--color-ink] leading-relaxed"
                    >
                      Pairs well with {aiData.pairsWith}
                      {isStreaming && (
                        <span className="inline-block w-1 h-3 bg-[--color-taupe] ml-0.5 animate-pulse" />
                      )}
                    </p>

                    {/* Best for */}
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[11px] text-[--color-taupe] leading-relaxed"
                    >
                      {aiData.bestFor}
                      {isStreaming && (
                        <span className="inline-block w-1 h-3 bg-[--color-taupe] ml-0.5 animate-pulse" />
                      )}
                    </p>

                    {streamError && (
                      <p className="text-[10px] text-[--color-taupe] italic">
                        — {streamError}{" "}
                        <button
                          onClick={e => { e.stopPropagation(); cache.current = null; fetchAI(); }}
                          className="underline hover:no-underline"
                        >
                          Try again?
                        </button>
                      </p>
                    )}

                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[10px] italic text-[--color-taupe]"
                    >
                      AI-generated
                    </p>
                  </motion.div>
                )}

                {!aiData && streamError && (
                  <div className="py-2">
                    <p style={{ fontFamily: "var(--font-sans)" }} className="text-xs text-[--color-taupe]">
                      Couldn't load flavor notes.{" "}
                      <button
                        onClick={e => { e.stopPropagation(); cache.current = null; fetchAI(); }}
                        className="underline hover:no-underline"
                      >
                        Try again?
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer actions ────────────────────────────────────────── */}
        <div className="mt-auto pt-2 flex flex-col gap-1.5">
          <button
            onClick={handleAddToCart}
            style={{ fontFamily: "var(--font-sans)" }}
            className={`w-full border border-[--color-ink] bg-[--color-ink] text-[--color-cream] uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:bg-[--color-cream] hover:text-[--color-ink] flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
              compact ? "py-2 text-[10px]" : "py-2.5 text-xs"
            }`}
          >
            <ShoppingBag size={compact ? 12 : 14} /> Add to Cart
          </button>

          <button
            onClick={toggleExpand}
            style={{ fontFamily: "var(--font-sans)" }}
            className={`w-full flex items-center justify-center gap-1.5 text-[--color-taupe] hover:text-[--color-ink] transition-colors duration-300 ${
              compact ? "py-1 text-[10px]" : "py-1 text-xs"
            }`}
          >
            <Sparkles size={compact ? 10 : 11} />
            {isExpanded ? "Collapse" : "✦ Explore flavors"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
