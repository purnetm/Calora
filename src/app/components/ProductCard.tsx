import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  calories: number;
  price: number;
  compact?: boolean;
}

export default function ProductCard({ id, image, name, description, calories, price, compact = false }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      calories
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full group transition-all hover:shadow-lg ${compact ? 'text-sm' : ''}`}>
      <div className={`relative overflow-hidden border-b border-border ${compact ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <img src={image} alt={name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
        <div className={`absolute bg-white/90 backdrop-blur-sm rounded-full border border-border font-medium shadow-sm flex items-center justify-center ${compact ? 'top-2 right-2 px-2 py-0.5 text-xs' : 'top-4 right-4 px-3 py-1 text-sm'}`}>
          {calories} cal
        </div>
      </div>
      <div className={`flex flex-col flex-grow ${compact ? 'p-3 gap-2' : 'p-6 gap-3'}`}>
        <div className="flex justify-between items-start gap-2">
          <h3 className={`font-medium text-foreground ${compact ? 'text-base leading-tight' : 'text-xl'}`}>{name}</h3>
          <span className="font-semibold shrink-0">₹{price.toFixed(2)}</span>
        </div>
        <p className={`text-muted-foreground line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>{description}</p>
        <div className="mt-auto pt-2">
          <button 
            onClick={handleAddToCart}
            className={`w-full border border-border rounded-full hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2 font-medium active:scale-95 duration-200 cursor-pointer ${compact ? 'py-2 text-xs' : 'py-3'}`}
          >
            <ShoppingBag size={compact ? 14 : 18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
