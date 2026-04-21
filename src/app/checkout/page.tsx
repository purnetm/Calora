import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, CreditCard, Truck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const deliveryFee = subtotal > 4000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success("Order placed successfully! Check your email for details.");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 bg-[--color-cream]">
        <div className="w-20 h-20 border border-[--color-border] flex items-center justify-center">
          <ShoppingBagIcon size={36} className="text-[--color-taupe]" />
        </div>
        <div className="text-center flex flex-col gap-2">
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-light text-[--color-ink]"
          >
            Your cart is empty
          </h1>
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-sm font-light text-[--color-taupe] max-w-md"
          >
            Looks like you haven't added any treats yet. Head back to the shop to find your favourites.
          </p>
        </div>
        <Link
          to="/"
          style={{ fontFamily: "var(--font-sans)" }}
          className="px-6 py-3 bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.14em] font-medium border border-[--color-ink] hover:bg-[--color-cream] hover:text-[--color-ink] transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 bg-[--color-cream]">
      <div className="flex flex-col gap-1 mb-10 pb-6 border-b border-[--color-border]">
        <p
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
        >
          Review
        </p>
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-4xl font-light text-[--color-ink]"
        >
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-12">

          {/* Items */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[--color-border]">
              <span
                style={{ fontFamily: "var(--font-sans)" }}
                className="w-6 h-6 border border-[--color-ink] flex items-center justify-center text-[11px] text-[--color-ink]"
              >
                1
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl font-light text-[--color-ink]"
              >
                Your Items
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 sm:gap-6 p-4 border border-[--color-border] bg-[--color-ivory]"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-[--color-bone] shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <h3
                          style={{ fontFamily: "var(--font-serif)" }}
                          className="font-normal text-base text-[--color-ink]"
                        >
                          {item.name}
                        </h3>
                        <span
                          style={{ fontFamily: "var(--font-sans)" }}
                          className="text-[10px] uppercase tracking-[0.1em] text-[--color-taupe]"
                        >
                          {item.calories} cal
                        </span>
                      </div>
                      <p
                        style={{ fontFamily: "var(--font-serif)" }}
                        className="font-medium text-[--color-ink]"
                      >
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-3 border border-[--color-border]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[--color-taupe] hover:text-[--color-ink] hover:bg-[--color-bone] transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          style={{ fontFamily: "var(--font-sans)" }}
                          className="text-xs w-4 text-center text-[--color-ink]"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[--color-taupe] hover:text-[--color-ink] hover:bg-[--color-bone] transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[--color-taupe] hover:text-[--color-burgundy] transition-colors duration-300 p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col gap-12">
            {/* Delivery Details */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[--color-border]">
                <span
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="w-6 h-6 border border-[--color-ink] flex items-center justify-center text-[11px] text-[--color-ink]"
                >
                  2
                </span>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-light text-[--color-ink]"
                >
                  Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: "firstName", label: "First Name", placeholder: "Jane", col: 1 },
                  { id: "lastName", label: "Last Name", placeholder: "Doe", col: 1 },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={f.id}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                    >
                      {f.label}
                    </label>
                    <input
                      required
                      id={f.id}
                      type="text"
                      placeholder={f.placeholder}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="px-0 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                    />
                  </div>
                ))}

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="address"
                    style={{ fontFamily: "var(--font-sans)" }}
                    className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-[--color-taupe]" size={15} />
                    <input
                      required
                      id="address"
                      type="text"
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="w-full pl-6 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                      placeholder="123 Donut Lane"
                    />
                  </div>
                </div>

                {[
                  { id: "city", label: "City", placeholder: "Mumbai" },
                  { id: "zip", label: "ZIP / Postal Code", placeholder: "400001" },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={f.id}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                    >
                      {f.label}
                    </label>
                    <input
                      required
                      id={f.id}
                      type="text"
                      placeholder={f.placeholder}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="px-0 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <label
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                >
                  Delivery Frequency
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-4 border border-[--color-ink] bg-[--color-bone] cursor-pointer">
                    <input type="radio" name="frequency" className="accent-[--color-ink] w-4 h-4" defaultChecked />
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontFamily: "var(--font-sans)" }} className="text-xs font-medium text-[--color-ink] uppercase tracking-[0.08em]">One-time Order</span>
                      <span style={{ fontFamily: "var(--font-sans)" }} className="text-[11px] text-[--color-taupe]">Standard delivery</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-[--color-border] cursor-pointer hover:border-[--color-ink] transition-colors duration-300">
                    <input type="radio" name="frequency" className="accent-[--color-ink] w-4 h-4" />
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontFamily: "var(--font-sans)" }} className="text-xs font-medium text-[--color-ink] uppercase tracking-[0.08em]">Weekly Subscription</span>
                      <span style={{ fontFamily: "var(--font-sans)" }} className="text-[11px] text-[--color-pistachio-deep]">Save 10%</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[--color-border]">
                <span
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="w-6 h-6 border border-[--color-ink] flex items-center justify-center text-[11px] text-[--color-ink]"
                >
                  3
                </span>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl font-light text-[--color-ink]"
                >
                  Payment
                </h2>
              </div>

              <div className="p-6 border border-[--color-border] bg-[--color-ivory] flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cardNum"
                    style={{ fontFamily: "var(--font-sans)" }}
                    className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-0 top-1/2 -translate-y-1/2 text-[--color-taupe]" size={15} />
                    <input
                      required
                      id="cardNum"
                      type="text"
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="w-full pl-6 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {[
                    { id: "expiry", label: "Expiry Date", placeholder: "MM/YY" },
                    { id: "cvc", label: "CVC", placeholder: "123" },
                  ].map(f => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={f.id}
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                      >
                        {f.label}
                      </label>
                      <input
                        required
                        id={f.id}
                        type="text"
                        placeholder={f.placeholder}
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="px-0 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="bg-[--color-ivory] border border-[--color-border] p-6 sm:p-8 flex flex-col gap-6">
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl font-light text-[--color-ink]"
              >
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 pb-5 border-b border-[--color-border]">
                {[
                  { label: "Subtotal", value: `₹${subtotal.toFixed(2)}` },
                  { label: "Delivery", value: deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span style={{ fontFamily: "var(--font-sans)" }} className="text-xs text-[--color-taupe] uppercase tracking-[0.1em]">{row.label}</span>
                    <span style={{ fontFamily: "var(--font-serif)" }} className="text-sm text-[--color-ink]">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "var(--font-sans)" }} className="text-xs text-[--color-ink] uppercase tracking-[0.14em] font-medium">Total</span>
                <span style={{ fontFamily: "var(--font-serif)" }} className="text-2xl font-medium text-[--color-ink]">₹{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                style={{ fontFamily: "var(--font-sans)" }}
                className="w-full py-3 bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.14em] font-medium border border-[--color-ink] hover:bg-[--color-cream] hover:text-[--color-ink] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>

              <div className="flex items-center justify-center gap-2">
                <Truck size={13} className="text-[--color-taupe]" />
                <span style={{ fontFamily: "var(--font-sans)" }} className="text-[11px] text-[--color-taupe]">
                  Free delivery on orders over ₹4000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
