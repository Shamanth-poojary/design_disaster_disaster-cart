"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function FugitiveMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // Evasive maneuver logic
  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isOpen) return; // Keep it still when open (if they ever manage it)

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    
    // Calculate distance from cursor to button center
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2));

    // If cursor gets too close (within 100px), jump away randomly
    if (dist < 100) {
      const randomX = (Math.random() - 0.5) * 300; // Jump up to 150px left/right
      const randomY = Math.random() * 200 + 50;  // Jump 50-250px down
      setPosition({ x: position.x + randomX, y: position.y + randomY });
    }
  };

  // Absurdist, randomly sorted categories
  const baseCategories = [
    { name: "Hardware and Pain", href: "/category/hardware-pain" },
    { name: "Unplanned Wishes", href: "/category/unplanned-wishes" },
    { name: "Regret Meals", href: "/category/regret-meals" },
    { name: "Mystery Liquids", href: "/category/mystery-liquids" },
    { name: "Mexican Blockheads", href: "/category/mexican-blockheads" },
    { name: "Squirrel Fund", href: "/category/squirrel-fund" },
  ];

  const [categories, setCategories] = useState(baseCategories);

  // Shuffle categories randomly on mount AND whenever menu opens
  const shuffleCategories = () => {
    setCategories([...baseCategories].sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    shuffleCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className="relative z-[9999]" ref={menuRef}>
      <button
        onPointerMove={handlePointerMove}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-hostile-pink text-black p-3 hover:bg-black hover:text-white transition-colors duration-75 flex items-center justify-center border-4 border-black font-black"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Menu size={32} />
        <span className="sr-only">Open Category Menu</span>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 bg-hostile-cream border-8 border-hostile-lime p-4 w-64 shadow-[10px_10px_0px_#000]">
          <h2 className="text-xl font-black text-black mb-4 uppercase tracking-widest border-b-4 border-black pb-2">Buy Things</h2>
          <ul className="space-y-4">
            {categories.map((cat, idx) => (
              <li key={idx}>
                {/* Hyperlink camouflage: no underline, same text color */}
                <Link 
                  href={cat.href}
                  className="block text-black text-sm font-thin lowercase hover:bg-hostile-yellow"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
