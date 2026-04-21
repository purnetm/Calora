# Calora

A premium gourmet dessert e-commerce platform built with React and Tailwind CSS.

## Features

- **Modern Landing Page**: High-quality photography showcasing gourmet desserts
- **Product Shop**: Browse and select from a curated collection of artisanal desserts
- **Subscription Service**: Monthly dessert box subscriptions
- **Shopping Cart**: Full cart functionality with checkout process
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Indian Rupee Support**: Complete currency integration with ₹ throughout

## Tech Stack

- **Framework**: React 18.3 with React Router for navigation
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Additional Libraries**: Material UI, React Hook Form, Recharts

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── DonutLanding.tsx
│   │   ├── DonutSections.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── SubscriptionModal.tsx
│   ├── context/       # React Context providers
│   ├── shop/          # Shop page
│   ├── checkout/      # Checkout flow
│   └── App.tsx        # Main application component
├── styles/            # CSS styles
└── imports/           # Figma-imported assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/purnetm/Calora.git
cd Calora
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Key Components

- **DonutLanding**: Hero section with featured desserts and call-to-action
- **DonutSections**: Feature highlights (plant-based, guilt-free, gourmet)
- **Navbar**: Navigation with cart integration
- **ProductCard**: Reusable product display component
- **SubscriptionModal**: Subscription plan selection
- **CartContext**: Global cart state management

## Design Philosophy

Calora emphasizes:
- Clean, minimal aesthetics
- High-quality product photography
- Intuitive user experience
- Mobile-first responsive design
- Accessibility compliance

## AI Features

Calora includes three AI-powered features built on the [Anthropic Claude API](https://www.anthropic.com/) (`claude-sonnet-4-20250514`). All calls run directly from the browser — no backend required.

### Environment Variable

Create a `.env.local` file at the project root:

```
VITE_ANTHROPIC_API_KEY=your_key_here
```

> ⚠️ The `VITE_` prefix exposes the key client-side. Fine for local dev; use a server-side proxy before deploying to production.

---

### 1. Taste Profile Onboarding

A 3-step modal that learns the user's flavor affinities, dietary preferences, and visit occasion. Auto-triggers on first visit to `/shop` (1.5 s delay). Profile is stored in `localStorage` under the key `calora_taste_profile` and used to personalise search results.

- **Files:** `src/app/components/TasteProfileModal.tsx`
- Accessible via the **Set Taste Preferences** / **Update Preferences** button in the shop header at any time.

### 2. Smart AI Search

A natural-language search bar that accepts queries like *"chocolate under ₹400"* or *"something vegan and fruity"*. Sends the full product catalog + the user's taste profile to Claude, which returns a ranked list of matching product IDs.

- **Files:** `src/app/components/SmartSearch.tsx`
- Integrated at the top of `/shop`. Includes suggestion chips, a "Why these results?" tooltip, and a graceful fallback when no exact matches exist.

### 3. AI-Generated Product Descriptions (Streaming)

Each product card has a **✦ Explore flavors** button that expands the card and streams a Claude-generated flavor profile — emoji flavor tags, a pairing suggestion, and a "best for" occasion note. Results are cached per card instance (in a React ref) so re-opening never re-calls the API.

- **Files:** `src/app/components/ProductCard.tsx`
- Stream errors show partial content + a "Try again?" link. All AI-generated content is labelled *AI-generated* in muted italic.

---

## License

This project uses components from shadcn/ui under MIT license.
Images from Unsplash used under Unsplash license.

---

Built with ❤️ using Figma Make and Claude Code