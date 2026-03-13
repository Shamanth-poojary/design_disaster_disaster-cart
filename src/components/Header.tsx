"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, isMounted } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-brand-primary tracking-tight shrink-0">
              Crave<span className="text-brand-dark"> Delivery</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-brand-dark hover:text-brand-primary font-medium transition-colors">Home</Link>
            <Link href="/search" className="text-brand-dark hover:text-brand-primary font-medium transition-colors">Restaurants</Link>
          </nav>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/checkout" aria-label="Cart" className="relative p-2 text-brand-dark hover:text-brand-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {isMounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-primary rounded-full min-w-[20px]">
                  {totalItems}
                </span>
              )}
            </Link>
            <button aria-label="Profile" className="hidden sm:flex items-center gap-2 text-brand-dark hover:text-brand-primary transition-colors font-medium">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
            <button 
              className="md:hidden p-2 text-brand-dark" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 shadow-lg absolute w-full left-0">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-brand-dark hover:text-brand-primary font-medium text-lg px-2 py-1" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/search" className="text-brand-dark hover:text-brand-primary font-medium text-lg px-2 py-1" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <button className="flex items-center gap-2 text-brand-dark hover:text-brand-primary font-medium w-full px-2 py-1 text-lg">
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
