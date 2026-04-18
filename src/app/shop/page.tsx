import React, { useState, useEffect, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import TasteProfileModal, { getTasteProfile } from "../components/TasteProfileModal";
import SmartSearch, { SearchState } from "../components/SmartSearch";
import { CATEGORIES, Product } from "../data/products";

export default function ShopPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [search, setSearch] = useState<SearchState>({
    results: null,
    query: "",
    isFallback: false,
  });

  useEffect(() => {
    if (!getTasteProfile()) {
      const t = setTimeout(() => setIsProfileModalOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSearchChange = useCallback((state: SearchState) => {
    setSearch(state);
  }, []);

  const clearSearch = () =>
    setSearch({ results: null, query: "", isFallback: false });

  const hasProfile = !!getTasteProfile();
  const isSearchActive = search.results !== null || search.query !== "";

  return (
    <div className="w-full bg-[--color-cream]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 flex flex-col gap-10">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-[--color-border]">
          <div className="flex flex-col gap-1">
            <p
              style={{ fontFamily: "var(--font-sans)" }}
              className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
            >
              Our Menu
            </p>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-5xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              The Collection
            </h1>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(true)}
            style={{ fontFamily: "var(--font-sans)" }}
            className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 border border-[--color-border] text-xs text-[--color-taupe] uppercase tracking-[0.1em] hover:text-[--color-ink] hover:border-[--color-ink] transition-all duration-300 cursor-pointer"
          >
            <SlidersHorizontal size={13} />
            {hasProfile ? "Update Preferences" : "Set Taste Preferences"}
          </button>
        </div>

        {/* ── Smart search ──────────────────────────────────────────── */}
        <SmartSearch onChange={handleSearchChange} />

        {/* ── Active search: flat result list ───────────────────────── */}
        {isSearchActive && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[--color-border]">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl font-light text-[--color-ink]"
              >
                {search.isFallback ? "You might also like" : `Results for "${search.query}"`}
              </h2>
              <button
                onClick={clearSearch}
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-xs text-[--color-taupe] uppercase tracking-[0.1em] hover:text-[--color-ink] transition-colors duration-300"
              >
                Clear search
              </button>
            </div>

            {search.results && search.results.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {search.results.map((product: Product & { category?: string }) => (
                  <ProductCard key={product.id} {...product} compact={true} />
                ))}
              </div>
            ) : (
              <div className="h-32" />
            )}
          </section>
        )}

        {/* ── Default: categorised view ────────────────────────────── */}
        {!isSearchActive &&
          CATEGORIES.map(category => (
            <section key={category.id} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 pb-3 border-b border-[--color-border]">
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-light text-[--color-ink]"
                >
                  {category.title}
                </h2>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-xs uppercase tracking-[0.1em] text-[--color-taupe]"
                >
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {category.products.map(product => (
                  <ProductCard key={product.id} {...product} compact={true} />
                ))}
              </div>
            </section>
          ))}
      </div>

      <TasteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
