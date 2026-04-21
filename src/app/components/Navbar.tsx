import React, { useEffect, useState } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

type NavLink =
  | { label: string; to: string }
  | { label: string; href: string; isAnchor: true };

const navLinks: NavLink[] = [
  { label: "Shop", to: "/shop" },
  { label: "Subscription", href: "/#subscription", isAnchor: true },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    if (scrolled) setScrolled(false);
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isSolid = !isHome || scrolled;

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

  const navLinkClass = (path?: string) => {
    const isActive = path ? location.pathname === path : false;
    return isActive ? "nav-link nav-link-active" : "nav-link";
  };

  return (
    <>
      <style>{`
        .nav-link { color: var(--color-taupe); transition: color 200ms; text-decoration: none; font-family: var(--font-sans); font-size: 13px; }
        .nav-link:hover { color: var(--color-ink); }
        .nav-link-active { color: var(--color-ink); font-weight: 500; }
      `}</style>
      <nav
        className="sticky top-0 z-50 w-full h-16 transition-all duration-300"
        style={{
          backgroundColor: isSolid ? "rgba(251, 247, 240, 0.95)" : "transparent",
          backdropFilter: isSolid ? "blur(12px)" : undefined,
          boxShadow: isSolid ? "var(--shadow-sm)" : undefined,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-full grid grid-cols-3 items-center">
          {/* Logo — left column */}
          <Link
            to="/"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            className="text-2xl font-light tracking-[0.04em] justify-self-start"
          >
            Calora
          </Link>

          {/* Desktop Nav Links — center column */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) =>
              "isAnchor" in link ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleSubscriptionClick}
                  className={navLinkClass()}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={navLinkClass(link.to)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Actions — right column */}
          <div className="flex items-center gap-4 justify-self-end">
            <Link to="/checkout" className="relative p-2" aria-label="Shopping cart">
              <ShoppingBag size={20} style={{ color: "var(--color-ink)" }} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-medium"
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "var(--color-gold)",
                    color: "var(--color-cream)",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2" aria-label="Open menu">
              <Menu size={20} style={{ color: "var(--color-ink)" }} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
