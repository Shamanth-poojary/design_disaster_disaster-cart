import { inventory } from "@/data/inventory";
import Link from "next/link";
import WeaponizedSearch from "@/components/WeaponizedSearch";
import FakeCountdown from "@/components/FakeCountdown";
import CheckoutLabyrinth from "@/components/CheckoutLabyrinth";
import FugitiveMenu from "@/components/FugitiveMenu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <header className="w-full bg-hostile-lime p-2 border-4 border-hostile-pink flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <FugitiveMenu />
          <div className="font-extrabold text-4xl text-black">FLASHKART</div>
        </div>
        <div className="animate-ping font-bold text-red-600 bg-yellow-300 p-1">10 MIN DELIVERY!!</div>
        <button className="bg-hostile-cyan text-black p-2 rounded-full hover:-translate-y-[50px] transition-transform duration-75">Login maybe?</button>
      </header>
      
      <FakeCountdown />

      {/* Spacer for fixed header */}
      <div className="h-24 w-full bg-hostile-cream"></div>

      <section className="w-full bg-black text-white p-4">
        <marquee scrollamount="25" className="text-3xl text-hostile-yellow tracking-tighter">
          ⚠️ ONLY 2 MINUTES LEFT TO GUARANTEE 10-MINUTE DELIVERY! ⚠️ 
          ⚠️ HURRY UP OR YOU WILL STARVE! ⚠️ 
          ⚠️ PRICES DOUBLING IN 5 SECONDS! ⚠️
        </marquee>
        <div className="flex justify-center">
          <WeaponizedSearch />
        </div>
      </section>

      <section className="flex-grow w-full grid grid-cols-2 md:grid-cols-4 gap-1 p-2 bg-hostile-pink">
        {inventory.map((item, idx) => (
          <div key={item.id} className="p-4" style={{ backgroundColor: item.packagingHex, border: `8px solid ${idx % 2 === 0 ? '#000' : '#00ff00'}` }}>
             <p className="text-black font-thin text-xs mb-2">Category: {item.absurdistCategory}</p>
             <h3 className="text-black font-black text-4xl uppercase break-words leading-none mb-4">{item.name}</h3>
             {/* Hyperlink Camouflage - making the entire div look unclickable while actual link is hidden */}
             <Link 
               href={`/product/${item.id}`} 
               className="bg-black text-white w-full py-4 block text-center mt-auto font-bold relative group overflow-hidden"
             >
                <span className="relative z-10 group-hover:opacity-0 transition-opacity">ADD (₹{item.basePrice})</span>
                <span className="absolute inset-0 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] p-1 text-center leading-tight">
                  VIEW PRODUCT (iOS TAX MAY APPLY)
                </span>
             </Link>
          </div>
        ))}
      </section>

      <section className="w-full max-w-4xl mx-auto px-4 mt-20">
          <CheckoutLabyrinth />
      </section>
      
      {/* Unclosable Popup */}
      <div className="fixed bottom-10 right-10 bg-hostile-lime border-4 border-black p-4 max-w-sm animate-pulse z-[100]">
        <h3 className="text-3xl text-black font-black underline mb-2">LIMITED OFFER!!!</h3>
        <p className="text-black leading-tight">By reading this you agree to subscribe to FlashKart ONE for ₹9,999/month. Thanks.</p>
        <div className="mt-4 flex gap-2">
            <button className="bg-black text-white px-2 py-1">Okay</button>
            <span className="text-xs text-gray-500 cursor-pointer pointer-events-none self-end">No thanks I prefer starvation</span>
        </div>
      </div>
    </main>
  );
}
