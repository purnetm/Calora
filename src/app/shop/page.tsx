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

  // Auto-trigger taste profile onboarding on first visit
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
    <div className="w-full bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 flex flex-col gap-10">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold text-[#212121]">Our Menu</h1>
            <p className="text-lg text-[#757575] font-light">
              Explore our full range of guilt-free treats.
            </p>
          </div>

          {/* Taste preferences button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 self-start px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/60 transition-all duration-150 bg-white shrink-0"
          >
            <SlidersHorizontal size={14} />
            {hasProfile ? "Update Preferences" : "Set Taste Preferences"}
          </button>
        </div>

        {/* ── Smart search ─────────────────────────────────────────────── */}
        <SmartSearch onChange={handleSearchChange} />

        {/* ── Active search: flat result list ──────────────────────────── */}
        {isSearchActive && (
          <section className="flex flex-col gap-6">
            {/* Clear search */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#212121]">
                {search.isFallback ? "You might also like" : `Results for "${search.query}"`}
              </h2>
              <button
                onClick={clearSearch}
                className="text-sm text-primary hover:underline underline-offset-2"
              >
                Clear search
              </button>
            </div>

            {search.results && search.results.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {search.results.map((product: Product & { category?: string }) => (
                  <ProductCard key={product.id} {...product} compact={true} />
                ))}
              </div>
            ) : (
              /* results is null while still loading / error — SmartSearch handles its own error UI */
              <div className="h-32" />
            )}
          </section>
        )}

        {/* ── Default: categorised view ────────────────────────────────── */}
        {!isSearchActive &&
          CATEGORIES.map(category => (
            <section key={category.id} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 pb-3 border-b border-[#212121]/10">
                <h2 className="text-2xl font-semibold text-[#212121]">{category.title}</h2>
                <p className="text-[#757575] text-sm">{category.description}</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.products.map(product => (
                  <ProductCard key={product.id} {...product} compact={true} />
                ))}
              </div>
            </section>
          ))}
      </div>

      {/* ── Taste Profile Modal ───────────────────────────────────────── */}
      <TasteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
