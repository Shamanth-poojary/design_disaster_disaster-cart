"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Clock, Info, Heart, ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { restaurants, MenuItem } from "@/data/inventory";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find((r) => r.id === params.id);
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb & Navigation */}
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to all restaurants
          </Link>
        </div>

        {/* Restaurant Header */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8">
          <div className="relative h-64 md:h-80 w-full bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{restaurant.name}</h1>
                <p className="text-gray-100 text-lg">{restaurant.cuisine}</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md transition-colors text-white">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 flex flex-wrap gap-6 items-center text-sm">
            <div className="flex items-center text-brand-success font-bold text-lg bg-green-50 px-3 py-1 rounded-lg">
              <Star className="w-5 h-5 fill-current mr-1 text-brand-success" />
              {restaurant.rating}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-gray-400" />
              <span className="font-semibold text-gray-800">{restaurant.deliveryTime}</span>
              <span className="ml-1">delivery time</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Info className="w-5 h-5 mr-2 text-gray-400" />
              <span className="font-semibold text-gray-800">{restaurant.priceRange}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold bg-white text-brand-dark mb-6 sticky top-16 py-4 z-10">Menu</h2>
            <div className="space-y-6">
              {restaurant.menu.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {item.isVegetarian && (
                         <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm border border-green-600 mr-2" aria-label="Vegetarian">
                           <span className="w-2 h-2 rounded-full bg-green-600"></span>
                         </span>
                      )}
                      <h3 className="text-xl font-bold text-brand-dark">{item.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="text-lg font-bold text-brand-primary">₹{item.price.toFixed(2)}</div>
                  </div>
                  <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-end pb-2">
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-brand-primary text-white border border-brand-primary font-medium py-2 px-6 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xl font-bold text-brand-dark flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-brand-primary" /> 
                  Your Order
                </h2>
              </div>
              
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>Your cart is empty.</p>
                    <p className="text-sm mt-1">Add items from the menu to start your order.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                          <div className="text-brand-primary font-medium text-sm mt-1">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-full">
                          <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-600 hover:text-black">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="p-1.5 text-gray-600 hover:text-black">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-200 mt-6">
                      <div className="flex justify-between text-gray-500 text-sm mb-2">
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500 text-sm mb-2">
                        <span>Delivery Fee</span>
                        <span>₹49.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4 text-brand-dark">
                        <span>Total</span>
                        <span>₹{(cartTotal + 49).toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/checkout" className="w-full mt-6 bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex justify-between px-6 items-center">
                      <span>Checkout</span>
                      <span>₹{(cartTotal + 49).toFixed(2)}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
