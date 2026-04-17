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
        <div className="h-6 w-24 bg-muted rounded-full" />
        <div className="h-6 w-20 bg-muted rounded-full" />
        <div className="h-6 w-28 bg-muted rounded-full" />
      </div>
      <div className="h-3 bg-muted rounded w-4/5" />
      <div className="h-3 bg-muted rounded w-3/5" />
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

  // Per-card cache — survives re-renders, not persisted
  const cache = useRef<AIProductData | null>(null);
  const buffer = useRef("");

  // ── Streaming fetch ────────────────────────────────────────────────────────
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
          // Try incremental parse so UI can appear as soon as JSON is valid
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
              // JSON parse failed — use mock so the UI never looks broken
              const mock = getMockFlavor(name, description);
              cache.current = mock;
              setAiData(mock);
            }
          }
        },
        onError: () => {
          setIsStreaming(false);
          // API unavailable — show realistic mock data instead of an error
          const mock = getMockFlavor(name, description);
          cache.current = mock;
          setAiData(mock);
        },
      }
    );
  }, [name, description, calories]);

  // ── Toggle expand ──────────────────────────────────────────────────────────
  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      setIsExpanded(true);
      fetchAI();
    } else {
      setIsExpanded(false);
    }
  }, [isExpanded, fetchAI]);

  // ── Escape key to close ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsExpanded(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  const handleAddToCart = () => addToCart({ id, name, price, image, calories });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col group transition-shadow hover:shadow-lg ${
        compact ? "text-sm" : ""
      } ${isExpanded ? "shadow-xl ring-1 ring-primary/20" : ""}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden border-b border-border ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute bg-white/90 backdrop-blur-sm rounded-full border border-border font-medium shadow-sm flex items-center justify-center ${
            compact ? "top-2 right-2 px-2 py-0.5 text-xs" : "top-4 right-4 px-3 py-1 text-sm"
          }`}
        >
          {calories} cal
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-grow ${compact ? "p-3 gap-2" : "p-6 gap-3"}`}>
        {/* Name + price */}
        <div className="flex justify-between items-start gap-2">
          <button
            onClick={toggleExpand}
            className={`font-medium text-foreground text-left hover:text-primary transition-colors ${
              compact ? "text-base leading-tight" : "text-xl"
            }`}
          >
            {name}
          </button>
          <span className="font-semibold shrink-0">₹{price.toFixed(2)}</span>
        </div>

        <p className={`text-muted-foreground line-clamp-2 ${compact ? "text-xs" : "text-sm"}`}>
          {description}
        </p>

        {/* ── AI expanded section ─────────────────────────────────────────── */}
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
              <div className="pt-3 border-t border-border/50">
                {/* Loading skeleton */}
                {isStreaming && !aiData && <AISkeleton />}

                {/* Structured AI data */}
                {aiData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3"
                  >
                    {/* Flavor tags */}
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
                        Flavor Profile
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {aiData.flavorTags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                            className="text-xs px-2.5 py-1 bg-secondary/30 rounded-full border border-border text-foreground"
                          >
                            {tag.emoji} {tag.label}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Pairs with */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Pairs well with</span>{" "}
                      {aiData.pairsWith}
                      {isStreaming && (
                        <span className="inline-block w-1 h-3 bg-primary/60 rounded-sm ml-0.5 animate-pulse" />
                      )}
                    </p>

                    {/* Best for */}
                    <p className="text-xs leading-relaxed">
                      <span className="font-medium text-foreground">Perfect for:</span>{" "}
                      <span className="text-primary">{aiData.bestFor}</span>
                      {isStreaming && (
                        <span className="inline-block w-1 h-3 bg-primary/60 rounded-sm ml-0.5 animate-pulse" />
                      )}
                    </p>

                    {/* Partial error */}
                    {streamError && (
                      <p className="text-[10px] text-muted-foreground/70">
                        — {streamError}{" "}
                        <button
                          onClick={e => { e.stopPropagation(); cache.current = null; fetchAI(); }}
                          className="text-primary hover:underline"
                        >
                          Try again?
                        </button>
                      </p>
                    )}

                    {/* AI-generated label */}
                    <p className="text-[10px] italic text-muted-foreground/50">AI-generated</p>
                  </motion.div>
                )}

                {/* Full error (no data at all) */}
                {!aiData && streamError && (
                  <div className="py-2">
                    <p className="text-xs text-muted-foreground">
                      Couldn't load flavor notes.{" "}
                      <button
                        onClick={e => { e.stopPropagation(); cache.current = null; fetchAI(); }}
                        className="text-primary hover:underline"
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

        {/* ── Footer actions ──────────────────────────────────────────────── */}
        <div className="mt-auto pt-2 flex flex-col gap-1.5">
          <button
            onClick={handleAddToCart}
            className={`w-full border border-border rounded-full hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 font-medium active:scale-95 duration-200 cursor-pointer ${
              compact ? "py-2 text-xs" : "py-3"
            }`}
          >
            <ShoppingBag size={compact ? 14 : 18} /> Add to Cart
          </button>

          <button
            onClick={toggleExpand}
            className={`w-full flex items-center justify-center gap-1.5 text-primary/70 hover:text-primary transition-colors ${
              compact ? "py-1 text-[11px]" : "py-1.5 text-xs"
            }`}
          >
            <Sparkles size={compact ? 11 : 12} />
            {isExpanded ? "Collapse" : "✦ Explore flavors"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
