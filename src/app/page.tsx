import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Optional: Keep revalidation if data changes somewhat often
export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      rating: "desc"
    }
  });

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-brand-secondary">
        {/* Hero Section */}
        <section className="bg-brand-primary text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots"></div>
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Craving something <span className="text-yellow-300">delicious?</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-10 text-brand-secondary">
              Discover the best food and drinks in your city and have them delivered directly to your door.
            </p>
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">Popular Restaurants near you</h2>
              <p className="text-gray-600">Explore top-rated spots delivering right now.</p>
            </div>
            <div className="hidden sm:block text-brand-primary font-medium cursor-pointer hover:underline">
              See all
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                imageURL={restaurant.imageURL}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                priceRange={restaurant.priceRange}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 Crave Delivery. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
