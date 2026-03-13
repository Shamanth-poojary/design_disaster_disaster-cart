"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, Suspense } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import { MenuItem } from "@/data/inventory"; // Used for types
import { Filter, Star, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Define the Restaurant type matching our Prisma schema structure
interface DbRestaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  imageURL: string;
  menuItems: MenuItem[];
}

function SearchContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const query = rawQuery.toLowerCase();
  
  const { addToCart } = useCart();

  const [restaurants, setRestaurants] = useState<DbRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all restaurants from the database API
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/restaurants');
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants for search:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRestaurants();
  }, []);

  // Extract all categories dynamically and sort them
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    restaurants.forEach(r => {
      r.menuItems.forEach(item => cats.add(item.category));
    });
    return Array.from(cats).sort();
  }, [restaurants]);

  const priceRanges = ["₹", "₹₹", "₹₹₹"];
  const ratings = [3.5, 4.0, 4.5];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const togglePriceRange = (price: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  // Perform search and filtering
  const { matchingRestaurants, matchingItems } = useMemo(() => {
    let rs = restaurants;

    // Apply Filters First
    if (selectedPriceRanges.length > 0) {
      rs = rs.filter(r => selectedPriceRanges.includes(r.priceRange));
    }
    
    if (minRating > 0) {
      rs = rs.filter(r => r.rating >= minRating);
    }

    // Prepare structure to hold search results
    let filteredRestaurants = rs.filter(r => 
      r.name.toLowerCase().includes(query) || 
      r.cuisine.toLowerCase().includes(query)
    );

    let filteredItems: { item: MenuItem, restaurantId: string, restaurantName: string }[] = [];

    rs.forEach(r => {
      let filteredMenu = r.menuItems;

      // Filter by category
      if (selectedCategories.length > 0) {
        filteredMenu = filteredMenu.filter(item => selectedCategories.includes(item.category));
      }

      // Filter by query
      if (query) {
        filteredMenu = filteredMenu.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }

      filteredMenu.forEach(item => {
        filteredItems.push({ item, restaurantId: r.id, restaurantName: r.name });
      });
    });

    return {
      matchingRestaurants: filteredRestaurants,
      matchingItems: filteredItems
    };
  }, [restaurants, query, selectedCategories, selectedPriceRanges, minRating]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl shadow-sm text-brand-dark font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 shrink-0 transition-opacity bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-2 mb-6 text-brand-dark pb-4 border-b border-gray-100">
              <Filter className="w-5 h-5" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Categories</h3>
              <div className="space-y-2">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="ml-3 text-gray-600 group-hover:text-brand-dark transition-colors">{cat}</span>
                  </label>
                ))}
                {allCategories.length === 0 && !isLoading && (
                  <p className="text-sm text-gray-400">No categories found</p>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map(price => (
                  <button
                    key={price}
                    onClick={() => togglePriceRange(price)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedPriceRanges.includes(price) 
                        ? "bg-brand-primary text-white border-brand-primary" 
                        : "bg-white text-gray-600 border-gray-200 hover:border-brand-primary hover:text-brand-primary"
                    }`}
                  >
                     {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Minimum Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating"
                      className="w-4 h-4 border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                    />
                    <span className="ml-3 text-gray-600 group-hover:text-brand-dark transition-colors">Any Rating</span>
                </label>
                {ratings.map(rating => (
                  <label key={rating} className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating"
                      className="w-4 h-4 border-gray-300 text-brand-primary focus:ring-brand-primary"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                    />
                    <span className="ml-3 text-gray-600 group-hover:text-brand-dark transition-colors flex items-center">
                      {rating} <Star className="w-3.5 h-3.5 fill-current text-brand-success ml-1" /> & Up
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCategories([]);
                setSelectedPriceRanges([]);
                setMinRating(0);
              }}
              className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Search Results */}
          <div className="lg:w-3/4 flex-1">
            <div className="mb-6 pb-4 border-b border-gray-200 pt-2 lg:pt-0">
              <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
                {query ? `Results for "${rawQuery}"` : "All Food & Restaurants"}
              </h1>
              <p className="text-gray-500 mt-2">
                Found {matchingRestaurants.length} restaurants and {matchingItems.length} dishes matching your criteria.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-xl text-brand-primary font-medium animate-pulse">Loading search results...</div>
              </div>
            ) : matchingRestaurants.length === 0 && matchingItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="text-gray-400 mb-4 flex justify-center">
                  <Search className="w-16 h-16 opacity-30" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">No results found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedPriceRanges([]);
                    setMinRating(0);
                  }}
                  className="mt-6 px-6 py-2 bg-brand-primary text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : null}

            {/* Dish Results */}
            {matchingItems.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-amber-600">🍕</span>
                  Dishes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {matchingItems.map((match, idx) => (
                    <div key={`${match.item.id}-${idx}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                      <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={match.item.imageURL} alt={match.item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-brand-dark leading-tight">{match.item.name}</h3>
                            {match.item.isVegetarian && (
                              <span className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-sm border border-green-600 ml-2" aria-label="Vegetarian">
                                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                              </span>
                            )}
                          </div>
                          <Link href={`/restaurant/${match.restaurantId}`} className="text-xs text-brand-primary hover:underline font-medium my-1 inline-block">
                            from {match.restaurantName}
                          </Link>
                          <p className="text-gray-500 text-xs line-clamp-2 mt-1">{match.item.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                          <span className="font-bold text-gray-800">₹{match.item.price.toFixed(2)}</span>
                          <button 
                            onClick={() => addToCart(match.item)}
                            className="bg-brand-primary text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-orange-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restaurant Results */}
            {matchingRestaurants.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-blue-600">🏪</span>
                  Restaurants
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchingRestaurants.map((restaurant) => (
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
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl text-brand-primary font-medium">Loading search results...</div>
        </main>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
