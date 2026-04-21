import React from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();

  const handleSubscriptionClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("subscription");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#subscription";
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[--color-cream] border-b border-[--color-border]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-light tracking-[0.04em] text-[--color-ink]"
        >
          Calora
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/shop"
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[11px] uppercase tracking-[0.16em] text-[--color-taupe] hover:text-[--color-ink] transition-colors duration-300"
          >
            Shop
          </Link>
          <a
            href="/#subscription"
            onClick={handleSubscriptionClick}
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[11px] uppercase tracking-[0.16em] text-[--color-taupe] hover:text-[--color-ink] transition-colors duration-300 cursor-pointer"
          >
            Subscription
          </a>
          <Link
            to="/about"
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[11px] uppercase tracking-[0.16em] text-[--color-taupe] hover:text-[--color-ink] transition-colors duration-300"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/checkout" className="relative p-2">
            <ShoppingBag size={20} className="text-[--color-ink]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[--color-gold] text-[--color-cream] text-[10px] font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2">
            <Menu size={20} className="text-[--color-ink]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
