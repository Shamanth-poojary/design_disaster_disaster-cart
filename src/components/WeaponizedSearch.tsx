"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function WeaponizedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isTrapped, setIsTrapped] = useState(false);

  // Mock "Inventory"
  const inventory = [
    { name: "Milk", category: "Hardware and Pain" },
    { name: "Bread", category: "Mystery Liquids" },
    { name: "Tomato", category: "Regret Meals" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict case sensitivity logic. We do not lowercase the query or the inventory item!
    // If they search "milk" instead of "Milk", they get nothing.
    const strictMatches = inventory.filter(item => item.name === query);
    
    if (strictMatches.length > 0) {
        setResults(strictMatches.map(m => m.name));
    } else {
        setResults(["No results found. Next time, type properly."]);
    }
  };

  // The actual keyboard trap
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Trap the focus!
      setIsTrapped(true);
    }
  };

  return (
    <div className="w-full max-w-sm mt-8 border-4 border-hostile-lime p-2 relative">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <label htmlFor="search" className="text-xs uppercase text-white font-black">Search (Case Sensitive):</label>
        <div className="flex">
            <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTrapped && Math.random() > 0.8} // Randomly disable sometimes if they are trapped
            className={`flex-grow p-2 text-black border-2 border-black focus:outline-none focus:ring-4 focus:ring-hostile-pink ${isTrapped ? 'bg-red-200' : 'bg-white'}`}
            placeholder="Search here..."
            />
            <button type="submit" className="bg-black text-white p-2 border-2 border-black hover:bg-hostile-pink transition-colors">
                <Search size={24} />
            </button>
        </div>
      </form>
      
      {isTrapped && (
        <p className="text-[10px] text-red-500 mt-1 uppercase font-black">
          Keyboard navigation is for the weak. Use a mouse.
        </p>
      )}

      {/* Results Display */}
      {query && (
          <div className="mt-4 bg-white p-2 min-h-20 text-black border-2 border-black overflow-y-auto max-h-40">
              <h4 className="font-bold underline text-sm">Results:</h4>
              <ul className="text-xs mt-2 list-disc pl-4 space-y-1">
                  {results.map((r, i) => (
                      <li key={i}>{r}</li>
                  ))}
                  {results.length === 0 && (
                      <li className="italic text-gray-400">Loading...</li>
                  )}
              </ul>
              
              {/* Irrelevant Filters */}
              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-400">
                  <span className="text-xs font-bold block mb-1">Filter by:</span>
                  <select className="text-xs bg-gray-200 p-1 w-full" onChange={() => setResults([...results].sort(() => Math.random() - 0.5))}>
                      <option>Hexadecimal Color</option>
                      <option>Syllable Count</option>
                      <option>Vibe</option>
                      <option>Moon Phase</option>
                  </select>
              </div>
          </div>
      )}
    </div>
  );
}
