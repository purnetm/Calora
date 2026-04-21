import React, { useEffect, useState } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

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
    setScrolled(false);
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

  const navLinks = [
    { label: "Shop", to: "/shop", isLink: true },
    { label: "Subscription", href: "/#subscription", isLink: false },
    { label: "About", to: "/about", isLink: true },
  ];

  const linkClass = (path?: string) => {
    const isActive = path ? location.pathname === path : false;
    return [
      "no-underline transition-colors duration-200",
      "text-[13px]",
      isActive
        ? "font-medium"
        : "font-normal",
    ].join(" ");
  };

  const linkStyle = (path?: string): React.CSSProperties => {
    const isActive = path ? location.pathname === path : false;
    return {
      fontFamily: "var(--font-sans)",
      color: isActive ? "var(--color-ink)" : "var(--color-taupe)",
      textDecoration: "none",
    };
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full h-16 transition-all duration-300"
      style={{
        backgroundColor: isSolid ? "var(--color-cream)" : "transparent",
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
            link.isLink ? (
              <Link
                key={link.label}
                to={link.to!}
                className={linkClass(link.to)}
                style={linkStyle(link.to)}
                onMouseEnter={(e) => {
                  if (location.pathname !== link.to) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-ink)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.to) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-taupe)";
                  }
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={handleSubscriptionClick}
                className={linkClass()}
                style={linkStyle()}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-ink)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-taupe)";
                }}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Actions — right column */}
        <div className="flex items-center gap-4 justify-self-end">
          <Link to="/checkout" className="relative p-2">
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
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2">
            <Menu size={20} style={{ color: "var(--color-ink)" }} />
          </button>
        </div>
      </div>
    </nav>
  );
}
