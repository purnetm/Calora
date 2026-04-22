import React from "react";
import { motion } from "motion/react";
import { SectionHeader, Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">

      {/* 1. Full-width Hero Image Block */}
      <section
        className="relative overflow-hidden pt-16 aspect-[4/3] md:aspect-video w-full"
      >
        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=80"
          alt="Artisanal desserts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(43, 32, 18, 0.45)" }}
        />
        {/* Centered headline */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--color-cream)",
              lineHeight: 1.1,
            }}
          >
            Where Every Bite Tells a Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              color: "var(--color-cream)",
              opacity: 0.80,
            }}
          >
            Premium handcrafted desserts, made with love
          </motion.p>
        </div>
      </section>

      {/* 2. Story Section (2-column) */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "var(--color-cream)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <SectionHeader
                eyebrow="OUR STORY"
                headline="We Believe Great Food Tells a Story"
              />
              <div className="flex flex-col gap-4">
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-sm font-light leading-relaxed text-[--color-taupe]"
                >
                  Founded in 2021, Calora began as a small home kitchen with a passion for artisanal desserts. What started as weekend experiments in flavour and texture quickly became something neighbours, friends, and strangers kept coming back for.
                </p>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-sm font-light leading-relaxed text-[--color-taupe]"
                >
                  We believe that great food carries memory — a slice of cake that brings back a birthday, a cookie that tastes like home. Every recipe we develop is guided by that belief: that the best dessert isn&rsquo;t just delicious, it&rsquo;s meaningful.
                </p>
                <p
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-sm font-light leading-relaxed text-[--color-taupe]"
                >
                  Today, Calora ships handcrafted desserts across the country, but the kitchen philosophy hasn&rsquo;t changed — small batches, quality ingredients, and an unwillingness to cut corners.
                </p>
              </div>
            </motion.div>

            {/* Right column — stacked image pair */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80"
                alt="Artisan dessert preparation"
                className="w-full object-cover aspect-[4/5]"
                style={{ borderRadius: "var(--radius-xl)" }}
              />
              {/* Floating smaller image offset bottom-right */}
              <div
                className="absolute -bottom-8 -right-4 w-2/5 aspect-square overflow-hidden"
                style={{
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80"
                  alt="Handcrafted dessert detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Health-Inclusive Callout Band */}
      <section
        className="py-16 w-full"
        style={{ background: "var(--color-pistachio)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 300,
              color: "var(--color-ink)",
              lineHeight: 1.2,
            }}
          >
            Desserts For Everyone
          </h2>
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="mt-4 text-sm font-light leading-relaxed text-[--color-ink] opacity-80"
          >
            We believe indulgence should be inclusive. Every flavour in our collection is thoughtfully crafted.
          </p>

          {/* Bullet grid */}
          <div className="max-w-3xl mx-auto mt-8">
            <ul className="grid grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-3 text-left list-disc list-inside">
              {[
                "Gluten-free options available",
                "Vegan-friendly flavours",
                "No artificial preservatives",
                "Nut-free variants on request",
              ].map((item) => (
                <li
                  key={item}
                  style={{ fontFamily: "var(--font-sans)" }}
                  className="text-sm font-light text-[--color-ink] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* 4. Values Section */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "var(--color-ivory)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                number: "01",
                title: "Quality First",
                description: "Crafted with intention, never cut corners.",
              },
              {
                number: "02",
                title: "Community",
                description: "Grown by word of mouth and love.",
              },
              {
                number: "03",
                title: "Creativity",
                description: "New flavours every season.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              >
                <Card variant="flat" className="p-8 h-full">
                  <div className="flex flex-col gap-3">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "3rem",
                        fontWeight: 300,
                        color: "var(--color-taupe)",
                        lineHeight: 1,
                      }}
                    >
                      {value.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "var(--color-ink)",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--color-taupe)",
                        lineHeight: 1.6,
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
