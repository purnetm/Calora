import React from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();

  const handleSubscriptionClick = (e: React.MouseEvent) => {
    // If not on home page, we need to let the link navigate first, but hash links usually handle this.
    // However, if we are on home page, smooth scroll is nice.
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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-tighter text-foreground">
          Calora.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-muted-foreground">
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <a 
            href="/#subscription" 
            onClick={handleSubscriptionClick}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Subscription
          </a>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/checkout" className="relative p-2 rounded-full hover:bg-secondary/20 transition-colors">
            <ShoppingBag size={24} className="text-foreground" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2">
            <Menu size={24} className="text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
}
