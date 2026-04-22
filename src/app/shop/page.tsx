import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import TasteProfileModal, { getTasteProfile } from "../components/TasteProfileModal";
import SmartSearch, { SearchState } from "../components/SmartSearch";
import { CATEGORIES, Product } from "../data/products";
import Button from "@/components/ui/Button";

export default function ShopPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [search, setSearch] = useState<SearchState>({
    results: null,
    query: "",
    isFallback: false,
  });
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (!getTasteProfile()) {
      const t = setTimeout(() => setIsProfileModalOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSearchChange = useCallback((state: SearchState) => {
    setSearch(state);
  }, []);

  const isSearchActive = search.results !== null || search.query !== "";

  // Build category names list
  const categoryNames = CATEGORIES.map((cat) => cat.title);

  // Determine which categories/products to render
  const visibleCategories =
    activeCategory === "All"
      ? CATEGORIES
      : CATEGORIES.filter((cat) => cat.title === activeCategory);

  return (
    <div className="w-full" style={{ background: "var(--color-cream)" }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--color-cream)",
          borderBottom: "1px solid var(--color-border)",
        }}
        className="py-12 lg:py-16"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Left: eyebrow + headline */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                color: "var(--color-gold)",
                letterSpacing: "0.15em",
              }}
              className="uppercase font-medium"
            >
              [Our Collection]
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                color: "var(--color-ink)",
                lineHeight: 1.15,
              }}
            >
              Handcrafted Flavours
            </h1>
          </div>

          {/* Right: Preferences button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsProfileModalOpen(true)}
          >
            Preferences
          </Button>
        </div>
      </div>

      {/* ── SmartSearch ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mt-8 mb-8">
        <div
          style={{
            background: "var(--color-bone)",
            borderRadius: "var(--radius-base)",
            padding: "12px 16px",
          }}
        >
          <SmartSearch onChange={handleSearchChange} />
        </div>
      </div>

      {/* ── Category filter pills (hidden when search is active) ─────── */}
      {!isSearchActive && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex gap-2 flex-wrap">
            {["All", ...categoryNames].map((name) => {
              const isActive = activeCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveCategory(name)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    background: isActive ? "var(--color-ink)" : "var(--color-bone)",
                    color: isActive ? "var(--color-cream)" : "var(--color-ink)",
                    border: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  className="rounded-full px-4 py-1.5 cursor-pointer font-medium hover:opacity-80"
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Search results ───────────────────────────────────────────── */}
      {isSearchActive && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-taupe)",
              }}
            >
              {search.isFallback
                ? "You might also like"
                : `Results for "${search.query}"`}
            </p>
            <button
              onClick={() => setSearch({ results: null, query: "", isFallback: false })}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "var(--color-taupe)",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
              className="uppercase hover:text-[--color-ink] transition-colors"
            >
              Clear search
            </button>
          </div>

          {search.results && search.results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {search.results.map((product: Product & { category?: string }) => (
                <ProductCard key={product.id} {...product} compact={true} />
              ))}
            </div>
          ) : (
            <div className="h-32" />
          )}
        </div>
      )}

      {/* ── Category view ────────────────────────────────────────────── */}
      {!isSearchActive && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {activeCategory === "All" ? (
            // All categories: render each as a section with heading
            visibleCategories.map((category) => (
              <section key={category.id} className="mb-16">
                {/* Category heading */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        color: "var(--color-ink)",
                        letterSpacing: "0.1em",
                      }}
                      className="uppercase font-semibold"
                    >
                      {category.title}
                    </h2>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        color: "var(--color-taupe)",
                      }}
                    >
                      {category.products.length} item{category.products.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div style={{ borderBottom: "1px solid var(--color-border)" }} />
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} {...product} compact={true} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            // Single category: just the grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleCategories.flatMap((cat) => cat.products).map((product) => (
                <ProductCard key={product.id} {...product} compact={true} />
              ))}
            </div>
          )}
        </div>
      )}

      <TasteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
