import React from "react";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[--color-cream]">
      <div className="max-w-[1000px] mx-auto px-6 py-24 md:py-32 flex flex-col gap-24">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-xs uppercase tracking-[0.18em] text-[--color-taupe]"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            style={{ fontFamily: "var(--font-display)" }}
            className="text-5xl md:text-7xl font-light tracking-[-0.01em] leading-[1.1] text-[--color-ink]"
          >
            Designed for Delight.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.16 }}
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-sm font-light text-[--color-taupe] max-w-md leading-relaxed"
          >
            How a product designer turned a personal craving into a guilt-free revolution.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-light text-[--color-ink] tracking-[-0.01em]"
            >
              The Origin Story
            </h2>
            <div className="flex flex-col gap-4">
              <p style={{ fontFamily: "var(--font-sans)" }} className="text-sm font-light leading-relaxed text-[--color-taupe]">
                It started late one night in a design studio. Alex, a product designer obsessed with user experience, found himself facing a common friction point: the conflict between the desire for indulgence and the need for health.
              </p>
              <p style={{ fontFamily: "var(--font-serif)" }} className="text-base italic leading-relaxed text-[--color-ink]">
                &ldquo;Why,&rdquo; he wondered, &ldquo;does eating something delicious always have to come with a disclaimer?&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-sans)" }} className="text-sm font-light leading-relaxed text-[--color-taupe]">
                Approaching baking like a UX problem, Alex began iterating. He replaced refined sugars with monk fruit, swapped bleached flour for almond and coconut blends, and tested hundreds of prototypes. The goal wasn&rsquo;t just to make a &lsquo;healthy alternative&rsquo; &mdash; it was to create a product where the healthy choice was actually the more delicious one.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="overflow-hidden aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1770670644186-b3d930f75f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Baker working on dough"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Health Inclusive Section */}
        <div className="bg-[--color-ivory] border border-[--color-border] p-10 md:p-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="flex-1 flex flex-col gap-5">
              <p
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-[11px] uppercase tracking-[0.14em] text-[--color-taupe]"
              >
                Health Inclusive
              </p>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-3xl font-light text-[--color-ink] tracking-[-0.01em]"
              >
                Sweetness for Everyone
              </h2>
              <p
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-sm font-light text-[--color-taupe] leading-relaxed"
              >
                We believe that celebrating with dessert shouldn't be a privilege limited by dietary restrictions. That's why we dedicated an entire line of our bakery to be strictly diabetic-friendly.
              </p>
              <p
                style={{ fontFamily: "var(--font-sans)" }}
                className="text-sm font-light text-[--color-taupe] leading-relaxed"
              >
                Using advanced glycemic-index testing, we've crafted cookies, cakes, and pastries that have negligible impact on blood sugar levels, allowing everyone to join in without worry.
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1629673436642-dc5c5d8a3633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Healthy dessert"
                  className="object-cover h-48 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Healthy dessert"
                  className="object-cover h-48 w-full mt-8"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
