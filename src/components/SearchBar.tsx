"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-[120px] py-4 border border-gray-200 rounded-full leading-5 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all shadow-sm"
        placeholder="Search restaurants, or dishes..."
      />
      <button 
        type="submit"
        className="absolute inset-y-1 right-1 px-6 bg-brand-primary text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
      >
        Find Food
      </button>
    </form>
  );
}
