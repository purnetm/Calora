You are doing a complete UI overhaul of Calora — a premium gourmet dessert e-commerce platform built with React 18, TypeScript, Tailwind CSS v4, Vite, shadcn/ui (Radix UI), and Framer Motion. Do NOT touch any AI feature logic, context files, or API call code. This is a pure visual/design system upgrade.

---

## STEP 1: TYPOGRAPHY SYSTEM

Install these Google Fonts in index.html (replace any existing font imports):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Italiana&family=Inter:wght@300;400;500;600&family=Pinyon+Script&display=swap" rel="stylesheet">
```

In your global CSS file (wherever Tailwind is configured), add inside @theme:

```css
@theme {
  --font-display: "Italiana", "Cormorant Garamond", serif;
  --font-serif:   "Cormorant Garamond", Georgia, serif;
  --font-sans:    "Inter", ui-sans-serif, system-ui;
  --font-script:  "Pinyon Script", cursive;
}
```

Set the default body font to Inter (--font-sans) and all h1/h2 headings to Italiana/Cormorant Garamond (--font-display).

---

## STEP 2: COLOUR PALETTE (Theme A — Patisserie)

Replace ALL existing color values in the global CSS @theme block with:

```css
@theme {
  --color-cream:            #FBF7F0;
  --color-ivory:            #F4ECE0;
  --color-bone:             #EDE4D3;
  --color-taupe:            #A89A86;
  --color-ink:              #2B2012;
  --color-espresso:         #1A1210;
  --color-pistachio:        #CFE6CE;
  --color-pistachio-deep:   #9FBF8E;
  --color-rose:             #F4D6D8;
  --color-gold:             #B89050;
  --color-burgundy:         #5B1A26;

  --color-background:       var(--color-cream);
  --color-foreground:       var(--color-ink);
  --color-muted:            var(--color-taupe);
  --color-border:           #E7DCC8;
  --color-accent:           var(--color-pistachio-deep);
  --color-ring:             var(--color-gold);

  /* shadcn/ui token aliases */
  --color-card:             var(--color-ivory);
  --color-card-foreground:  var(--color-ink);
  --color-popover:          var(--color-ivory);
  --color-popover-foreground: var(--color-ink);
  --color-primary:          var(--color-ink);
  --color-primary-foreground: var(--color-cream);
  --color-secondary:        var(--color-bone);
  --color-secondary-foreground: var(--color-ink);
  --color-muted-foreground: var(--color-taupe);
  --color-destructive:      var(--color-burgundy);
  --color-input:            var(--color-bone);
}
```

Set the global background to --color-cream and body text to --color-ink.

---

## STEP 3: COMPONENT STYLE RULES

Apply these rules globally — do this by updating Tailwind base/component layers and editing each component file:

**Borders & Radius:**
- Global border-radius: 2px maximum. Remove all rounded-lg, rounded-xl, rounded-2xl, rounded-full from non-pill elements. Buttons and tags that are currently rounded-full: keep as rounded-full ONLY for pill-shaped chips/badges.
- Replace all box shadows (shadow-md, shadow-lg, hover:shadow-lg) with a hairline border: `border border-[--color-border]`.

**Buttons:**
- Primary button: bg-ink text-cream, uppercase, font-sans, text-xs, tracking-[0.14em], font-medium, py-3 px-6, rounded-none, border border-ink, transition-all duration-300.
- On hover: bg-cream text-ink border-ink (inverted).
- Remove all rounded-full from buttons except chip/tag elements.
- Ghost/outline button: border border-ink bg-transparent text-ink uppercase text-xs tracking-[0.14em], hover: bg-ink text-cream.

**Typography scale:**
- h1: font-display, text-5xl lg:text-7xl, font-light, tracking-[-0.01em], leading-[1.1]
- h2: font-display, text-3xl lg:text-4xl, font-light, tracking-[-0.01em]
- h3: font-display, text-xl lg:text-2xl, font-light
- Section eyebrow labels (small caps above headings): font-sans, text-xs, uppercase, tracking-[0.18em], text-taupe
- Body: font-sans, font-light, text-sm, leading-relaxed, text-ink
- Price text: font-serif, text-base, font-medium
- All nav links: font-sans, uppercase, text-xs, tracking-[0.14em], font-medium

**Cards (ProductCard.tsx):**
- Remove rounded-lg. Add rounded-none.
- Remove hover:shadow-lg. Add hover:border-ink transition.
- Background: bg-card (maps to --color-ivory).
- Product name: font-serif, font-normal, text-base, tracking-[-0.01em]
- Price: font-serif, text-sm
- Calorie badge: bg-cream/80 backdrop-blur-sm, text-[10px], uppercase, tracking-[0.1em], rounded-none, border border-border, px-2 py-0.5

**Navbar:**
- Background: bg-cream border-b border-border
- Logo: font-display, text-2xl, font-light, tracking-[0.04em], text-ink
- Nav links: font-sans text-[11px] uppercase tracking-[0.16em] text-taupe hover:text-ink transition-colors
- Cart icon: no background, just the icon in text-ink, with a small count badge in bg-gold text-cream

---

## STEP 4: LANDING PAGE (DonutLanding.tsx)

Redesign the hero section with this structure and editorial tone:

```
[eyebrow]   ARTISAN · GOURMET · AI-CURATED          ← font-sans, xs, tracking-[0.18em], text-taupe
[h1]        Where every bite                          ← font-display, 6xl–8xl, font-light
            is a choice.                              ← same, with a Cormorant Garamond italic line underneath if possible

[sub]       Premium desserts, personalised for you by AI.  ← font-sans, font-light, sm, text-taupe, max-w-sm

[CTA row]   [Explore the Menu]    [Set Your Taste Profile →]
             primary button         ghost/text link, font-sans xs uppercase tracking
```

Hero layout: full-width editorial split. Left 55%: text content with generous top padding (pt-24 lg:pt-40). Right 45%: a single large editorial product photograph, slightly cropped at edges (overflow-hidden), no border, no radius. No background gradients. Background: bg-cream.

Below the hero, add a thin marquee/ticker text strip (single scrolling line) in bg-espresso text-cream, font-sans text-[11px] uppercase tracking-[0.16em]:
Content: "HANDCRAFTED DAILY  ·  NO ARTIFICIAL PRESERVATIVES  ·  AI-PERSONALISED FOR YOU  ·  SAME-DAY DELIVERY  ·  GOURMET INGREDIENTS  ·  "
Animate it left-scrolling with CSS animation (keyframes: translateX(0) to translateX(-50%)), infinite, 30s linear. Duplicate the text to make it seamless.

---

## STEP 5: SECTIONS (DonutSections.tsx)

Replace the current feature highlights section with an editorial three-column layout:

Each column: no card background, no border, no radius. Just icon (thin stroke, 24px, text-taupe), a short editorial heading (font-display, text-xl, font-light), and 2-line body text (font-sans, font-light, text-sm, text-taupe). Column dividers: a 1px vertical line in border-border. Full section background: bg-ivory.

Add a section above the three columns that is an editorial stats strip — three centered stats in font-display, large numerals:

```
"2,400+"       "18"          "100%"
Desserts       Flavour       Plant-based
Personalised   Profiles      Ingredients
by AI          Available     Sourced
```
Numerals: font-display, text-5xl, font-light, text-ink
Labels: font-sans, text-xs, uppercase, tracking-[0.14em], text-taupe

---

## STEP 6: SHOP PAGE (shop/page.tsx)

- Page header: remove center-aligned. Left-align with editorial spacing.
  - Eyebrow: "OUR MENU" in font-sans, text-xs, tracking-[0.18em], text-taupe
  - Title: "The Collection" in font-display, text-5xl, font-light
  - No subtitle paragraph — remove it.

- Category section headers:
  - Category name: font-display, text-2xl, font-light, text-ink
  - Separator: 1px horizontal line in border-border (not bold, not colored)
  - Category description: font-sans, text-xs, uppercase, tracking-[0.1em], text-taupe

- Product grid: gap-3, no rounded corners on cards, cards flush edge-to-edge on mobile.

---

## STEP 7: ABOUT PAGE (about/page.tsx)

If it exists with placeholder content, apply the same typographic system. Section headings in font-display, body in font-sans font-light. Background alternating between bg-cream and bg-ivory.

---

## STEP 8: AI FEATURE COMPONENTS — VISUAL POLISH ONLY

Do NOT change any logic, API calls, prompt text, or state management. Only update the visual styling:

**TasteProfileModal (if it exists):**
- Dialog background: bg-ivory
- Step indicators: small circles, border border-border, active: bg-ink
- Chip/badge selected state: bg-ink text-cream border-ink
- Chip unselected: border border-border bg-transparent text-ink
- All text: font-sans, font-light
- Modal title: font-display, text-2xl, font-light

**SmartSearch (if it exists):**
- Input: border-b border-ink (bottom border only, no full border, no rounded), bg-transparent, font-sans, text-sm, tracking-[0.02em]
- Suggestion chips: rounded-full, border border-border, text-[11px], font-sans, uppercase, tracking-[0.1em], hover: border-ink
- Results count label: font-sans, text-xs, text-taupe, uppercase, tracking-[0.14em]
- "Why these results?" tooltip: font-sans, text-xs, text-taupe

**ProductCard AI expansion (if it exists):**
- Expanded panel: bg-bone border-t border-border, no radius, p-4
- Flavor tags: border border-border, text-[11px], font-sans, rounded-none, uppercase, tracking-[0.08em]
- "AI-generated" label: font-sans, text-[10px], italic, text-taupe
- "Pairs well with" text: font-serif, italic, text-sm, text-ink

---

## STEP 9: MOTION & TRANSITIONS

- All page transitions and hover states: duration-300 or duration-400, ease-out.
- No spring/bounce animations anywhere.
- Card hover: only a subtle translateY(-2px) and border-color change. No scale. No shadow pop.
- Modal entry: opacity 0 → 1 + translateY(8px) → 0, 400ms ease-out.
- Remove any existing animation that uses bounce, spring, scale > 1.02, or drop shadows appearing on hover.

---

## STEP 10: SUBSCRIPTION MODAL (SubscriptionModal.tsx)

- Background: bg-ivory
- Plan cards: border border-border, no radius, bg-cream, selected state: border-ink bg-ivory
- Plan name: font-display, text-xl, font-light
- Price: font-serif, font-medium
- Feature list bullets: replace with em-dash (—) in text-taupe
- CTA button: primary style (bg-ink text-cream uppercase tracking)

---

## STEP 11: FINAL CLEANUP

After completing all steps above, run a search across all .tsx files for any remaining instances of the following and fix each one:
- rounded-xl → rounded-none
- rounded-2xl → rounded-none
- shadow-lg → remove (replace with border border-border if needed)
- shadow-md → remove
- bg-white → bg-cream or bg-ivory (whichever fits the context)
- text-gray-* → text-taupe or text-ink depending on emphasis
- bg-gray-* → bg-bone or bg-ivory depending on context

---

## GENERAL RULES

- Do not change any routing, context, or API logic.
- Do not introduce any new npm packages.
- Do not add any gradients, glassmorphism, glows, or aurora effects anywhere.
- Do not use any colors outside the Theme A palette defined above.
- Every component must remain fully functional after restyling.
