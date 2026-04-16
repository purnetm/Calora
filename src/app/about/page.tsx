import React from "react";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#fafafa]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#C8E6C9]/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#FFCC80]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-[#FFCDD2]/20 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-24 md:py-32 flex flex-col gap-24">
        {/* Header Section */}
        <div className="text-center flex flex-col gap-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[#212121]"
          >
            Designed for Delight.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#757575] font-light max-w-2xl mx-auto"
          >
            How a product designer turned a personal craving into a guilt-free revolution.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-semibold text-[#212121]">The Origin Story</h2>
            <div className="space-y-4 text-lg text-[#757575] leading-relaxed">
              <p>
                It started late one night in a design studio. Alex, a product designer obsessed with user experience, found himself facing a common friction point: the conflict between the desire for indulgence and the need for health.
              </p>
              <p>
                "Why," he wondered, "does eating something delicious always have to come with a disclaimer?"
              </p>
              <p>
                Approaching baking like a UX problem, Alex began iterating. He replaced refined sugars with monk fruit, swapped bleached flour for almond and coconut blends, and tested hundreds of prototypes. The goal wasn't just to make a "healthy alternative"—it was to create a product where the healthy choice was actually the more delicious one.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2"
          >
             <img 
               src="https://images.unsplash.com/photo-1770670644186-b3d930f75f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
               alt="Baker working on dough" 
               className="object-cover w-full h-full"
             />
          </motion.div>
        </div>

        {/* Diabetic Friendly Section */}
        <div className="bg-white/60 backdrop-blur-md border border-[#212121]/10 rounded-3xl p-12 md:p-16">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8E6C9] text-[#212121] rounded-full w-fit font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
                Health Inclusive
              </div>
              <h2 className="text-3xl font-semibold text-[#212121]">Sweetness for Everyone</h2>
              <p className="text-lg text-[#757575] leading-relaxed">
                We believe that celebrating with dessert shouldn't be a privilege limited by dietary restrictions. That's why we dedicated an entire line of our bakery to be strictly diabetic-friendly.
              </p>
              <p className="text-lg text-[#757575] leading-relaxed">
                Using advanced glycemic-index testing, we've crafted cookies, cakes, and pastries that have negligible impact on blood sugar levels, allowing everyone to join in on the "Snack Time" moment without worry.
              </p>
            </div>
             <div className="flex-1 w-full">
               <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1629673436642-dc5c5d8a3633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy dessert 1" className="rounded-2xl object-cover h-48 w-full shadow-md" />
                 <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy dessert 2" className="rounded-2xl object-cover h-48 w-full shadow-md translate-y-8" />
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
