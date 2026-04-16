import React, { useState } from "react";
import Slider from "react-slick";
import { X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

// Import slick carousel styles
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
    // Simulate API call
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
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Side: Form */}
            <div className="flex-1 p-8 md:p-10 flex flex-col gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your First Box</h2>
                <p className="text-gray-500">Join the club and start your guilt-free journey.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Residential Address</label>
                  <textarea 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="123 Sweet St, Apt 4B..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-full mt-4 hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-lg"
                >
                  Confirm Subscription
                </button>
              </form>
            </div>

            {/* Right Side: Recommendations */}
            <div className="w-full md:w-[400px] bg-gray-50 p-8 flex flex-col justify-center border-l border-gray-100">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900">Recommended for you</h3>
                <p className="text-sm text-gray-500">Based on popular choices</p>
              </div>

              <div className="px-4 pb-8">
                <Slider {...settings}>
                  {RECOMMENDED_ITEMS.map((item) => (
                    <div key={item.id} className="px-2 outline-none">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 text-center">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                          <p className="text-primary text-sm font-bold">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              
              <div className="mt-auto bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <ShoppingBag className="text-blue-600 shrink-0 mt-1" size={18} />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Add any of these to your first box after signup and get <strong>10% off</strong> your first add-on!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
