import { inventory } from "@/data/inventory";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FugitiveMenu from "@/components/FugitiveMenu";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = inventory.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-hostile-cream font-mono">
      <header className="w-full bg-hostile-lime p-2 border-4 border-hostile-pink flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <FugitiveMenu />
          <Link href="/" className="font-extrabold text-4xl text-black hover:text-white">FLASHKART</Link>
        </div>
        <div className="animate-ping font-bold text-red-600 bg-yellow-300 p-1">10 MIN DELIVERY!!</div>
      </header>

      <div className="mt-32 w-full max-w-4xl p-8 border-8 border-black bg-white shadow-[20px_20px_0px_#ff00ff]">
        
        {/* Device-Based Price Discrimination (Simulated visually for demo) */}
        <div className="bg-red-600 text-white font-black p-2 text-center text-xs animate-pulse mb-8 border-4 border-black">
          WARNING: iOS DEVICE DETECTED. APPLYING 150% APPLE TAX.
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 border-8 border-hostile-cyan p-2 bg-gray-200">
               {/* Unnecessarily huge, potentially blurry image */}
               <div className="w-full aspect-square relative bg-gray-300 border-4 border-dashed border-gray-400">
                  <Image 
                    src={product.imageURL} 
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-150 transition-transform duration-1000"
                  />
               </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <p className="text-gray-500 text-sm uppercase tracking-widest">{product.absurdistCategory}</p>
                    <h1 className="text-6xl font-black text-black leading-none mb-4 uppercase break-all" style={{ textShadow: '2px 2px 0 #00ffff' }}>
                        {product.name}
                    </h1>
                    
                    {/* Confusing Price Display */}
                    <div className="bg-yellow-300 border-4 border-black p-4 mb-6 inline-block transform -rotate-2">
                        <p className="text-gray-600 line-through text-sm">Was: ₹{product.basePrice}</p>
                        <p className="text-4xl font-black text-red-600">Now: ₹{Math.floor(product.basePrice * 2.5)}</p>
                        <p className="text-[10px] font-bold">+ arbitrary handling fees at checkout</p>
                    </div>

                    <p className="text-xl text-black leading-relaxed font-serif italic border-l-4 border-hostile-pink pl-4">
                        {product.description}
                    </p>
                </div>

                {/* Manufactured Hygiene Panic */}
                <div className="mt-8 bg-black text-white p-4">
                    <h3 className="text-hostile-lime font-bold uppercase mb-2 border-b-2 border-hostile-lime pb-1">Top Review</h3>
                    <div className="flex text-yellow-500 mb-1">★☆☆☆☆</div>
                    <p className="text-sm">"{product.hygieneReview}" - AngryCustomer99</p>
                    <p className="text-[8px] text-gray-500 mt-2 text-right">Helpful (4,206)</p>
                </div>
            </div>
        </div>

        {/* Impossible to reach add to cart button */}
        <div className="mt-64 pt-64 flex justify-center pb-8 border-b-8 border-dotted border-gray-300">
            <Link href="/" className="bg-hostile-lime text-black font-black text-5xl p-8 border-8 border-black hover:bg-hostile-pink hover:text-white transition-colors uppercase">
                Add to Cart
            </Link>
        </div>
      </div>
    </main>
  );
}
