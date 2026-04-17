// AI-POWERED
import React, { useState, useRef, useCallback } from "react";
import { Sparkles, X, Info } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { callClaude } from "../lib/anthropic";
import { ALL_PRODUCTS, Product } from "../data/products";
import { getTasteProfile } from "./TasteProfileModal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchState {
  results: (Product & { category: string })[] | null;
  query: string;
  isFallback: boolean; // true = no exact match, showing similar products
}

interface Props {
  onChange: (state: SearchState) => void;
}

// ─── Suggestion chips ─────────────────────────────────────────────────────────

const CHIPS = [
  "Under ₹300",
  "Vegan options",
  "Low calorie",
  "Best for gifting",
  "Something chocolatey",
];

// ─── System prompt builder ────────────────────────────────────────────────────

function buildSystemPrompt(): string {
  const profile = getTasteProfile();
  const catalog = JSON.stringify(
    ALL_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      calories: p.calories,
      category: p.category,
    }))
  );

  return (
    `You are a dessert recommendation assistant for Calora, a gourmet dessert platform. ` +
    `Here is the full product catalog: ${catalog}. ` +
    `The user's taste profile is: ${profile ? JSON.stringify(profile) : "not set"}. ` +
    `The user will give you a natural language search query. ` +
    `Return ONLY a JSON array of product IDs that match the query, ordered by relevance. ` +
    `If the query is ambiguous (e.g. "under 500" with no unit), assume Indian Rupees. ` +
    `Return at most 8 results. If nothing matches, return an empty array.`
  );
}

// ─── Fallback product picker ──────────────────────────────────────────────────

function getFallback(): (Product & { category: string })[] {
  const profile = getTasteProfile();
  // Shuffle the full catalog and return 4
  const shuffled = [...ALL_PRODUCTS].sort(() => Math.random() - 0.5);
  if (!profile || profile.flavors.length === 0) return shuffled.slice(0, 4);
  // Prefer products whose name/description loosely matches preferred flavors
  const preferred = shuffled.filter(p =>
    profile.flavors.some(f =>
      p.name.toLowerCase().includes(f.split(" ")[0].toLowerCase()) ||
      p.description.toLowerCase().includes(f.split(" ")[0].toLowerCase())
    )
  );
  return [...preferred, ...shuffled].slice(0, 4);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SmartSearch({ onChange }: Props) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultMeta, setResultMeta] = useState<{ count: number; isFallback: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) {
        onChange({ results: null, query: "", isFallback: false });
        setResultMeta(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setResultMeta(null);

      try {
        const raw = await callClaude(
          [{ role: "user", content: trimmed }],
          { system: buildSystemPrompt(), maxTokens: 256 }
        );

        // Extract JSON array from response (Claude sometimes adds prose)
        const match = raw.match(/\[[\s\S]*?\]/);
        if (!match) throw new Error("Unexpected response format");

        const ids: string[] = JSON.parse(match[0]);
        const productMap = new Map(ALL_PRODUCTS.map(p => [p.id, p]));

        // Silently filter out any IDs that don't exist in the catalog
        const matched = ids
          .filter(id => productMap.has(id))
          .map(id => productMap.get(id)!);

        if (matched.length === 0) {
          const fallback = getFallback();
          onChange({ results: fallback, query: trimmed, isFallback: true });
          setResultMeta({ count: 0, isFallback: true });
        } else {
          onChange({ results: matched, query: trimmed, isFallback: false });
          setResultMeta({ count: matched.length, isFallback: false });
        }
      } catch {
        setError("Something went wrong — try a different search.");
        onChange({ results: null, query: "", isFallback: false });
      } finally {
        setIsLoading(false);
      }
    },
    [onChange]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query);
  };

  const handleChip = (chip: string) => {
    setQuery(chip);
    doSearch(chip);
  };

  const handleClear = () => {
    setQuery("");
    setResultMeta(null);
    setError(null);
    onChange({ results: null, query: "", isFallback: false });
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Input */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
        <div
          className={`flex items-center rounded-full border bg-white transition-all duration-300 ${
            isLoading
              ? "border-primary/50 shadow-[0_0_0_3px_rgba(149,117,205,0.12)] animate-pulse"
              : "border-border hover:border-primary/40 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(149,117,205,0.12)]"
          }`}
        >
          <span className={`pl-4 text-primary shrink-0 ${isLoading ? "animate-spin" : ""}`}>
            <Sparkles size={17} />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Try 'chocolate under ₹400' or 'something vegan and fruity'…"
            className="flex-1 px-3 py-3 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="pr-4 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestion chips — only visible when input is empty */}
      {!query && (
        <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
          {CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className="px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-muted-foreground hover:border-primary/60 hover:text-foreground transition-all duration-150"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
          {error}{" "}
          <button
            onClick={() => doSearch(query)}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Retry
          </button>
        </p>
      )}

      {/* Results meta row */}
      {resultMeta && !error && (
        <div className="flex items-center justify-center gap-1.5 max-w-xl mx-auto">
          {resultMeta.isFallback ? (
            <p className="text-sm text-muted-foreground text-center">
              No exact matches — here are some you might like anyway
            </p>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">
                {resultMeta.count} result{resultMeta.count !== 1 ? "s" : ""} found
              </span>
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Why these results?"
                    >
                      <Info size={13} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="z-50 bg-foreground text-background text-xs px-3 py-2 rounded-lg max-w-[220px] leading-relaxed"
                      sideOffset={5}
                    >
                      Results are matched by our AI based on your query and taste profile.
                      <Tooltip.Arrow className="fill-foreground" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </>
          )}
        </div>
      )}
    </div>
  );
}
