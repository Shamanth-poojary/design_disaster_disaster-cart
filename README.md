# FlashKart: From Design Disaster to Delightful Experience

[**🔴 VIEW THE LIVE SITE HERE**](https://design-disaster-disaster-cart.vercel.app/)

Welcome to FlashKart! Originally built as a "Design Disaster" hackathon project intentionally violating UX and accessibility standards, this quick-commerce website has now been completely revamped to provide a seamless, user-friendly shopping experience.

## The Flaws in the Initial Web App

The initial application was intentionally engineered to be a chaotic and frustrating "roach motel" for users, featuring a variety of hostile UX patterns:

- **The Fugitive Menu**: Navigation menus that actively jumped away from the user's cursor, making it nearly impossible to select an option.
- **Weaponized Search & Invisible Text**: Strict case-sensitivity, keyboard focus traps, and form inputs (like the search bar) with mismatched text/background colors, rendering user input completely invisible.
- **Fake Urgency**: A ticking countdown timer that artificially induced panic but reset to 5 minutes on every page refresh.
- **Roach Motel Checkout**: An unmarked, 8-step checkout labyrinth packed with forced continuity and deliberately broken UI elements preventing progression.
- **Confirmshaming**: Massive, guilt-tripping modals attempting to prevent users from unchecking unwanted premium subscriptions.
- **Algorithmic Price Discrimination**: Fake "iOS Device" detection that imposed an arbitrary 150% markup on cart totals.
- **Hostile Aesthetics**: Clashing neon colors, brutalist typography, misaligned elements, and broken product images that disoriented the user.

## How We Overcame It

We systematically debugged and fixed the intentional UI/UX flaws to transform FlashKart into a pleasant application:

1. **Refined Search Bar & Input Fields**: Fixed the CSS configurations to ensure typed text is highly visible (e.g., black text on a white background) and improved overall search accessibility.
2. **Polished the Checkout Process**: Resolved the broken elements on the checkout page, removing the frustrating labyrinth and providing a streamlined, intuitive flow.
3. **Updated Product Media**: Updated image URLs for key items in our inventory (such as Margherita Pizza, Crispy Fries, Garlic Bread, Green Detox Smoothie, and Veggie Burrito) in the database seed scripts to ensure high-quality, appealing product visuals.
4. **General UI Polish & Alignment**: Eliminated hostile aesthetics by fixing element alignment, improving contrast ratios, and establishing a professional, consistent look and feel throughout the application.

## Tech Stack (UI Focus)

The application leverages a modern, responsive frontend stack to deliver an exceptional user experience:

- **Next.js (v14)**: The core React framework enabling fast, server-rendered UIs.
- **React (v18)**: Core library for building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **TypeScript**: Static typing for robust component development.
- **Lucide React**: Clean, lightweight, and modern iconography.

*(Note: Database and deployment infrastructure have been intentionally omitted from this summary.)*

## Advantages of the Current Web App

- **Intuitive User Experience**: Navigation and core actions behave predictably, completely removing the previous hostile constraints.
- **Enhanced Accessibility**: Improved focus states, clear text contrast, and readable input fields ensure that the application is usable by everyone.
- **Appealing Visual Design**: High-quality product images, a harmonious color palette, and professional typography replace the previously chaotic visuals.
- **Frictionless Checkout**: A straightforward, bug-free purchasing flow that respects the user's time and provides clear, honest pricing without deceptive dark patterns.

## Installation and Run Details

To run the application locally, follow these instructions:

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shamanth-poojary/design_disaster_disaster-cart.git
   cd design_disaster_disaster-cart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma Client:**
   *(Note: This typically runs automatically on postinstall, but you can run it manually if needed)*
   ```bash
   npx prisma generate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal if 3000 is in use).

### Seeding Data (Optional)
If you need to populate your environment with the updated food items and images, use the custom seed command configured in the project:
```bash
npx tsx prisma/seed.ts
```
