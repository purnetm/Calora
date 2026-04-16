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

## License

This project uses components from shadcn/ui under MIT license.
Images from Unsplash used under Unsplash license.

---

Built with ❤️ using Figma Make and Claude Code