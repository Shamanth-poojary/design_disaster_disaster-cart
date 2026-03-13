import Link from "next/link";
import { Star, Clock } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  imageURL: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
}

export default function RestaurantCard({
  id,
  name,
  imageURL,
  cuisine,
  rating,
  deliveryTime,
  priceRange,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageURL}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-brand-dark shadow-sm">
          {priceRange}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-brand-dark truncate pr-2">{name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-brand-success font-semibold text-sm shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-4 truncate">{cuisine}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{deliveryTime}</span>
          </div>
          <span className="text-brand-primary font-medium group-hover:underline">View Menu</span>
        </div>
      </div>
    </Link>
  );
}
