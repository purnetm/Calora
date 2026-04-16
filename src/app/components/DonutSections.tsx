import React from "react";
import { Leaf, Award, Zap, Heart, Check, Star, ShoppingBag, Truck, Instagram, Twitter, Facebook } from "lucide-react";
import ProductCard from "./ProductCard";

// --- Reusable Components ---

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-4 text-center mb-16 max-w-2xl mx-auto">
      <h2 className="text-4xl font-semibold text-foreground tracking-tight">{title}</h2>
      {subtitle && <p className="text-xl text-muted-foreground font-light">{subtitle}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, image }: { icon: any; title: string; description: string; image: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-start gap-4 transition-transform hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="p-3 bg-secondary/30 rounded-full text-foreground backdrop-blur-sm">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StepCard({ icon: Icon, step, title, description }: { icon: any; step: number; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 relative group">
      <div className="relative">
        <div className="w-20 h-20 bg-card border border-border rounded-full flex items-center justify-center z-10 relative shadow-sm group-hover:shadow-md transition-shadow">
          <Icon size={32} strokeWidth={1.5} className="text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full border border-border flex items-center justify-center font-bold text-sm">
          {step}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({ title, price, features, recommended = false, onSelect }: { title: string; price: string; features: string[]; recommended?: boolean; onSelect: () => void }) {
  return (
    <div className={`rounded-lg border p-8 flex flex-col gap-6 relative transition-all duration-300 ${recommended ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-xl z-10' : 'bg-card border-border text-foreground hover:shadow-md'}`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold border border-border shadow-sm">
          Most Popular
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className={`text-xl font-medium ${recommended ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className={`text-sm ${recommended ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>/box</span>
        </div>
      </div>
      <div className={`h-px w-full ${recommended ? 'bg-primary-foreground/20' : 'bg-border'}`} />
      <ul className="flex flex-col gap-4 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={18} className={`mt-0.5 shrink-0 ${recommended ? 'text-accent' : 'text-primary'}`} />
            <span className="text-sm leading-tight">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={onSelect}
        className={`w-full py-4 rounded-full font-bold mt-4 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer ${recommended ? 'bg-white text-primary' : 'bg-primary text-primary-foreground'}`}
      >
        Choose {title}
      </button>
    </div>
  );
}

function TestimonialCard({ text, author, role }: { text: string; author: string; role: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-1 text-accent">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="text-lg leading-relaxed font-light">"{text}"</p>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-10 h-10 bg-muted rounded-full border border-border flex items-center justify-center font-bold text-muted-foreground">
          {author[0]}
        </div>
        <div>
          <h4 className="font-semibold text-sm">{author}</h4>
          <p className="text-muted-foreground text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

// --- Main Section Component ---

export default function DonutSections({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Why We’re Different */}
      <section className="py-24 px-4 w-full max-w-[1400px] mx-auto">
        <SectionHeading 
          title="Guilt-free goodness, redefined." 
          subtitle="We've reimagined dessert to be better for you, without sacrificing the joy." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Leaf} 
            title="100% Plant Based" 
            description="Made entirely from plants, so you can indulge while being kind to the planet and your body." 
            image="https://images.unsplash.com/photo-1620682768842-11b005a9c6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGJhc2VkJTIwZm9vZCUyMGluZ3JlZGllbnRzJTIwYmFraW5nfGVufDF8fHx8MTc3MDg5NTY1NXww&ixlib=rb-4.1.0&q=80&w=1080"
          />
          <FeatureCard 
            icon={Zap} 
            title="Low Calorie" 
            description="Under 150 calories per serving. Finally, a treat that fits your daily macros perfectly." 
            image="https://images.unsplash.com/photo-1585828950421-a40556a08c7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjB0YXBlJTIwaGVhbHRoeSUyMHdlaWdodCUyMGxvc3N8ZW58MXx8fHwxNzcwODk1NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          />
          <FeatureCard 
            icon={Award} 
            title="Premium Ingredients" 
            description="No artificial flavors, colors, or preservatives. Just real, high-quality ingredients you can pronounce." 
            image="https://images.unsplash.com/photo-1529687815525-d5711d9a42df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYmFraW5nJTIwaW5ncmVkaWVudHMlMjB2YW5pbGxhJTIwZmxvdXJ8ZW58MXx8fHwxNzcwODk1NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          />
          <FeatureCard 
            icon={Heart} 
            title="Baked, Not Fried" 
            description="We bake our treats to perfection for that amazing texture without the excess grease." 
            image="https://images.unsplash.com/photo-1760447528817-196389176e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBvdmVuJTIwbWl0dHMlMjB0cmF5fGVufDF8fHx8MTc3MDg5NTY1NXww&ixlib=rb-4.1.0&q=80&w=1080"
          />
        </div>
      </section>

      {/* 2. Featured Flavors */}
      <section className="py-24 px-4 w-full bg-white">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading 
            title="Flavor drops of the week" 
            subtitle="Limited edition batches baked fresh every Monday." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              id="red-velvet"
              image="https://images.unsplash.com/photo-1761746350777-b86ae72e8f41?auto=format&fit=crop&w=1080&q=80"
              name="Red Velvet Supreme"
              description="Classic red velvet cupcake with a keto-friendly cream cheese frosting."
              calories={130}
              price={360}
            />
            <ProductCard 
              id="pistachio-mac"
              image="https://images.unsplash.com/photo-1519734014-fec887b3d784?auto=format&fit=crop&w=1080&q=80"
              name="Pistachio Macaron"
              description="Real ground pistachio shell and ganache. Delicate and nutty."
              calories={70}
              price={240}
            />
            <ProductCard 
              id="blueberry-cheese"
              image="https://images.unsplash.com/photo-1720586407185-c7651d7d0397?auto=format&fit=crop&w=1080&q=80"
              name="Blueberry Cheesecake"
              description="Fresh blueberry compote swirled into vanilla bean cheesecake."
              calories={220}
              price={540}
            />
            <ProductCard 
              id="mango-sorbet"
              image="https://images.unsplash.com/photo-1561223463-8fd373e00087?auto=format&fit=crop&w=1080&q=80"
              name="Mango Sorbet"
              description="Pure mango puree frozen to refreshing perfection."
              calories={90}
              price={440}
            />
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24 px-4 w-full bg-muted/30">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading 
            title="Snacking made simple" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-border/20 -z-10" />
            
            <StepCard 
              icon={Check} 
              step={1} 
              title="Choose your goal" 
              description="Whether you're keto, vegan, or just watching calories, we have a box tailored for you." 
            />
            <StepCard 
              icon={ShoppingBag} 
              step={2} 
              title="Pick your flavors" 
              description="Mix and match from our rotating menu of 12+ chef-crafted flavors every week." 
            />
            <StepCard 
              icon={Truck} 
              step={3} 
              title="Weekly delivery" 
              description="Freshly baked and delivered right to your doorstep. Pause, skip, or cancel anytime." 
            />
          </div>
        </div>
      </section>

      {/* 4. Subscription Plans */}
      <section id="subscription" className="py-24 px-4 w-full max-w-[1400px] mx-auto">
        <SectionHeading 
          title="Join the club" 
          subtitle="Save up to 20% when you subscribe to weekly deliveries." 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          <PricingCard 
            title="Starter" 
            price="₹2299" 
            features={["6 items per box", "Standard shipping", "Mystery flavor sample"]} 
            onSelect={onOpenModal}
          />
          <PricingCard 
            title="Snack Pro" 
            price="₹3999" 
            features={["12 items per box", "Free express shipping", "First access to new drops", "Exclusive merch"]} 
            recommended={true} 
            onSelect={onOpenModal}
          />
          <PricingCard 
            title="Family" 
            price="₹6999" 
            features={["24 items per box", "Free express shipping", "Custom flavor requests", "Quarterly gift"]} 
            onSelect={onOpenModal}
          />
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 px-4 w-full bg-white">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading 
            title="Don't take our word for it" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              text="I can't believe these are healthy. They taste exactly like the desserts I grew up with, but without the sugar crash." 
              author="Sarah Jenkins" 
              role="Yoga Instructor" 
            />
            <TestimonialCard 
              text="Finally a snack I can keep in the office that doesn't derail my fitness goals. The Macarons are incredible." 
              author="David Chen" 
              role="Software Engineer" 
            />
            <TestimonialCard 
              text="My kids love them and have no idea they're eating plant-based. Total win for our household!" 
              author="Emily Ross" 
              role="Mother of 3" 
            />
          </div>
        </div>
      </section>

      {/* 6. Final CTA section */}
      <section className="py-32 px-4 w-full text-center bg-muted/50">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center">
          <h2 className="text-5xl font-semibold text-foreground tracking-tight">Ready to treat yourself?</h2>
          <p className="text-xl text-muted-foreground font-light max-w-xl">
            Join 10,000+ happy snackers enjoying guilt-free indulgence today.
          </p>
          <button 
            onClick={onOpenModal}
            className="bg-primary text-primary-foreground text-xl px-12 py-5 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium active:scale-95 duration-200 cursor-pointer"
          >
            Get Your First Box
          </button>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-foreground text-background py-16 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-bold">Calora.</div>
            <p className="text-muted-foreground max-w-xs">
              Redefining the way you snack, one plant-based treat at a time.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 cursor-pointer transition-colors">
                <Instagram size={20} className="text-background" />
              </div>
              <div className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 cursor-pointer transition-colors">
                <Twitter size={20} className="text-background" />
              </div>
              <div className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 cursor-pointer transition-colors">
                <Facebook size={20} className="text-background" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-lg">Shop</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li className="hover:text-background cursor-pointer">All Flavors</li>
              <li className="hover:text-background cursor-pointer">Variety Boxes</li>
              <li className="hover:text-background cursor-pointer">Subscriptions</li>
              <li className="hover:text-background cursor-pointer">Gift Cards</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li className="hover:text-background cursor-pointer">Our Story</li>
              <li className="hover:text-background cursor-pointer">Ingredients</li>
              <li className="hover:text-background cursor-pointer">Sustainability</li>
              <li className="hover:text-background cursor-pointer">Careers</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li className="hover:text-background cursor-pointer">FAQ</li>
              <li className="hover:text-background cursor-pointer">Shipping</li>
              <li className="hover:text-background cursor-pointer">Returns</li>
              <li className="hover:text-background cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Calora Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-background">Privacy Policy</span>
            <span className="cursor-pointer hover:text-background">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
