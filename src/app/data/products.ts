// Central product catalog — imported by ShopPage, SmartSearch, and AI features.

export interface Product {
  id: string;
  name: string;
  price: number;
  calories: number;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

export const CATEGORIES: Category[] = [
  {
    id: "cupcakes",
    title: "Cupcakes",
    description: "Miniature cakes with maximum flavor.",
    products: [
      { id: "cc-1", name: "Velvet Dream", price: 360, calories: 130, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80", description: "Classic red velvet with a keto-friendly cream cheese frosting." },
      { id: "cc-2", name: "Lemon Zest", price: 360, calories: 115, image: "https://images.unsplash.com/photo-1599785209796-786432b228bc?auto=format&fit=crop&w=800&q=80", description: "Bright citrus sponge with a poppyseed crumble." },
      { id: "cc-3", name: "Double Choc", price: 380, calories: 140, image: "https://images.unsplash.com/photo-1612849599497-cfd1062eb65c?auto=format&fit=crop&w=800&q=80", description: "Double chocolate fudge cupcake, zero sugar added." },
      { id: "cc-4", name: "Vanilla Bean", price: 360, calories: 120, image: "https://images.unsplash.com/photo-1628586334354-f13b1e82adb7?auto=format&fit=crop&w=800&q=80", description: "Simple, elegant, and packed with real vanilla bean specks." },
    ]
  },
  {
    id: "macarons",
    title: "Macarons",
    description: "Delicate French almond cookies.",
    products: [
      { id: "mc-1", name: "Pistachio", price: 240, calories: 70, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80", description: "Real ground pistachio shell and ganache." },
      { id: "mc-2", name: "Raspberry Rose", price: 240, calories: 65, image: "https://images.unsplash.com/photo-1606419128082-ea3bc7a628e4?auto=format&fit=crop&w=800&q=80", description: "Floral rose water infused with tart raspberry jam." },
      { id: "mc-3", name: "Salted Caramel", price: 240, calories: 75, image: "https://images.unsplash.com/photo-1675229502792-1011e47b427f?auto=format&fit=crop&w=800&q=80", description: "Sugar-free caramel with a hint of sea salt." },
      { id: "mc-4", name: "French Vanilla", price: 240, calories: 70, image: "https://images.unsplash.com/photo-1650419741906-1cdead9c9b4f?auto=format&fit=crop&w=800&q=80", description: "Classic vanilla with a white chocolate ganache." },
    ]
  },
  {
    id: "cheesecakes",
    title: "Cheesecakes",
    description: "Rich, creamy, and totally guilt-free.",
    products: [
      { id: "ch-1", name: "NY Classic", price: 520, calories: 210, image: "https://images.unsplash.com/photo-1595677825885-3744fec631cf?auto=format&fit=crop&w=800&q=80", description: "The classic dense cheesecake on an almond crust." },
      { id: "ch-2", name: "Blueberry Swirl", price: 540, calories: 220, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80", description: "Fresh blueberry compote swirled into vanilla bean cheesecake." },
      { id: "ch-3", name: "Berry Medley", price: 540, calories: 215, image: "https://images.unsplash.com/photo-1603959160031-5aff42c6ff5b?auto=format&fit=crop&w=800&q=80", description: "Topped with fresh raspberries and blackberries." },
    ]
  },
  {
    id: "cookies",
    title: "Cookies",
    description: "Chewy, gooey, and fresh from the oven.",
    products: [
      { id: "co-1", name: "Choco Chunk", price: 280, calories: 150, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80", description: "Large chunks of 85% dark chocolate in a chewy dough." },
      { id: "co-2", name: "Oatmeal Raisin", price: 280, calories: 140, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80", description: "Spiced rolled oats with plump organic raisins." },
    ]
  },
  {
    id: "frozen",
    title: "Frozen Desserts",
    description: "Cool down with our sorbets and yogurts.",
    products: [
      { id: "fr-1", name: "Mango Sorbet", price: 440, calories: 90, image: "https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?auto=format&fit=crop&w=800&q=80", description: "Pure mango puree frozen to refreshing perfection." },
      { id: "fr-2", name: "Berry FroYo", price: 480, calories: 110, image: "https://images.unsplash.com/photo-1747292718367-099a45c56eac?auto=format&fit=crop&w=800&q=80", description: "Probiotic-rich frozen yogurt with mixed berries." },
      { id: "fr-3", name: "Citrus Scoops", price: 440, calories: 85, image: "https://images.unsplash.com/photo-1741154854670-5ba2b8696b48?auto=format&fit=crop&w=800&q=80", description: "A refreshing blend of lemon, lime, and orange." },
    ]
  }
];

/** Flat list of every product, with category title attached. */
export const ALL_PRODUCTS: (Product & { category: string })[] = CATEGORIES.flatMap(cat =>
  cat.products.map(p => ({ ...p, category: cat.title }))
);
