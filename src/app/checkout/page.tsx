import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, CreditCard, Truck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, updateQuantity, removeFromCart, subtotal, cartCount, clearCart } = useCart();
  const deliveryFee = subtotal > 4000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success("Order placed successfully! Check your email for details.");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingBagIcon size={48} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Looks like you haven't added any delicious treats yet. 
          Head back to the shop to find your favorites.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          
          {/* Section 1 - Cart Summary (Visible on mobile/desktop details) */}
          <section className="flex flex-col gap-6">
             <div className="flex items-center gap-2 pb-4 border-b border-border">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
              <h2 className="text-2xl font-semibold">Your Items</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 sm:gap-6 p-4 border border-border rounded-xl bg-card">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1 px-2 py-0.5 bg-secondary/30 rounded-full inline-block">
                          {item.calories} cal
                        </div>
                      </div>
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                         <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white shadow-sm transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col gap-12">
            {/* Section 2 - Delivery Details */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                <h2 className="text-2xl font-semibold">Delivery Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-medium text-sm">First Name</label>
                  <input required id="firstName" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-medium text-sm">Last Name</label>
                  <input required id="lastName" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Doe" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="address" className="font-medium text-sm">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input required id="address" type="text" className="w-full pl-10 px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="123 Donut Lane" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="font-medium text-sm">City</label>
                  <input required id="city" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="New York" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="zip" className="font-medium text-sm">ZIP / Postal Code</label>
                  <input required id="zip" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="10001" />
                </div>
              </div>

               <div className="flex flex-col gap-4 mt-2">
                 <label className="font-medium text-sm">Delivery Frequency</label>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <label className="flex items-center gap-3 p-4 border border-primary bg-primary/5 rounded-lg cursor-pointer transition-all">
                     <input type="radio" name="frequency" className="accent-primary w-5 h-5" defaultChecked />
                     <div className="flex flex-col">
                       <span className="font-medium">One-time Order</span>
                       <span className="text-xs text-muted-foreground">Standard delivery</span>
                     </div>
                   </label>
                   <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-all">
                     <input type="radio" name="frequency" className="accent-primary w-5 h-5" />
                     <div className="flex flex-col">
                       <span className="font-medium">Weekly Subscription</span>
                       <span className="text-xs text-primary font-bold">Save 10%</span>
                     </div>
                   </label>
                 </div>
               </div>
            </section>

            {/* Section 3 - Payment */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</span>
                <h2 className="text-2xl font-semibold">Payment</h2>
              </div>
              
              <div className="p-6 border border-border rounded-xl bg-card">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cardNum" className="font-medium text-sm">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input required id="cardNum" type="text" className="w-full pl-10 px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="0000 0000 0000 0000" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="flex flex-col gap-2">
                      <label htmlFor="expiry" className="font-medium text-sm">Expiry Date</label>
                      <input required id="expiry" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="MM/YY" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="cvc" className="font-medium text-sm">CVC</label>
                      <input required id="cvc" type="text" className="px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:outline-none" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Right Column - Summary Sticky */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold text-primary">₹{total.toFixed(2)}</span>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Truck size={14} />
                <span>Free delivery on orders over ₹4000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon({ size, className }: { size?: number, className?: string }) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
