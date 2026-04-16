import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import DonutLanding from "./components/DonutLanding";
import DonutSections from "./components/DonutSections";
import CheckoutPage from "./checkout/page";
import ShopPage from "./shop/page";
import AboutPage from "./about/page";
import SubscriptionModal from "./components/SubscriptionModal"; // Import here
import { useEffect } from "react";

function Home({ onOpenModal }: { onOpenModal: () => void }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Use requestAnimationFrame for smoother and more reliable execution after render
      requestAnimationFrame(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
        window.scrollTo(0,0);
    }
  }, [location]);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[1440px] mx-auto p-4 lg:p-8">
        <DonutLanding onOpenModal={onOpenModal} />
      </div>
      <DonutSections onOpenModal={onOpenModal} />
    </div>
  );
}

function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);
    
    return null;
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen w-full bg-[#fafafa] flex flex-col font-sans text-[#212121]">
          <Navbar onOpenModal={() => setIsModalOpen(true)} />
          <Routes>
            <Route path="/" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Toaster position="bottom-right" theme="light" closeButton richColors />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
