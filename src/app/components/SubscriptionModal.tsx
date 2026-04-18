import React, { useState } from "react";
import Slider from "react-slick";
import { X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECOMMENDED_ITEMS = [
  { id: 1, name: "Velvet Dream", image: "https://images.unsplash.com/photo-1761746350777-b86ae72e8f41?auto=format&fit=crop&w=400&q=80", price: "₹360" },
  { id: 2, name: "Pistachio Macaron", image: "https://images.unsplash.com/photo-1519734014-fec887b3d784?auto=format&fit=crop&w=400&q=80", price: "₹240" },
  { id: 3, name: "Blueberry Bliss", image: "https://images.unsplash.com/photo-1720586407185-c7651d7d0397?auto=format&fit=crop&w=400&q=80", price: "₹540" },
  { id: 4, name: "Mango Sorbet", image: "https://images.unsplash.com/photo-1561223463-8fd373e00087?auto=format&fit=crop&w=400&q=80", price: "₹440" },
];

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      toast.success("Subscription started! Your first box is on the way.");
      onClose();
      setFormData({ name: "", email: "", phone: "", address: "" });
    }, 1000);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{ breakpoint: 640, settings: { slidesToShow: 1 } }]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-[--color-ivory] border border-[--color-border] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-[--color-taupe] hover:text-[--color-ink] transition-colors duration-300"
            >
              <X size={18} />
            </button>

            {/* Left Side: Form */}
            <div className="flex-1 p-8 md:p-10 flex flex-col gap-6">
              <div>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-xs uppercase tracking-[0.18em] text-[--color-taupe] mb-1"
                >
                  Get started
                </p>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-3xl font-light text-[--color-ink]"
                >
                  Get Your First Box
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
                  { label: "Email", name: "email", type: "email", placeholder: "jane@example.com" },
                  { label: "Phone Number", name: "phone", type: "tel", placeholder: "(555) 123-4567" },
                ].map(field => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="w-full px-0 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label
                    style={{ fontFamily: "var(--font-sans)" }}
                    className="text-[11px] uppercase tracking-[0.1em] text-[--color-taupe]"
                  >
                    Residential Address
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="123 Sweet St, Apt 4B..."
                    style={{ fontFamily: "var(--font-sans)" }}
                    className="w-full px-0 py-2 border-b border-[--color-border] bg-transparent outline-none text-sm text-[--color-ink] placeholder:text-[--color-taupe] font-light focus:border-[--color-ink] transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="w-full bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.14em] font-medium py-3 mt-2 border border-[--color-ink] hover:bg-[--color-cream] hover:text-[--color-ink] transition-all duration-300 cursor-pointer"
                >
                  Confirm Subscription
                </button>
              </form>
            </div>

            {/* Right Side: Recommendations */}
            <div className="w-full md:w-[380px] bg-[--color-bone] p-8 flex flex-col justify-center border-l border-[--color-border]">
              <div className="mb-6">
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-[11px] uppercase tracking-[0.14em] text-[--color-taupe] mb-1"
                >
                  Curated for you
                </p>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl font-light text-[--color-ink]"
                >
                  Recommended
                </h3>
              </div>

              <div className="px-2 pb-8">
                <Slider {...settings}>
                  {RECOMMENDED_ITEMS.map((item) => (
                    <div key={item.id} className="px-2 outline-none">
                      <div className="bg-[--color-cream] border border-[--color-border] overflow-hidden group">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 text-center">
                          <h4
                            style={{ fontFamily: "var(--font-serif)" }}
                            className="font-normal text-sm text-[--color-ink] truncate"
                          >
                            {item.name}
                          </h4>
                          <p
                            style={{ fontFamily: "var(--font-serif)" }}
                            className="text-sm font-medium text-[--color-ink] mt-0.5"
                          >
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="mt-auto border border-[--color-border] bg-[--color-cream] p-4">
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-xs font-light text-[--color-taupe] leading-relaxed"
                >
                  — Add any of these to your first box after signup and get{" "}
                  <span className="text-[--color-ink] font-medium">10% off</span> your first add-on.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
