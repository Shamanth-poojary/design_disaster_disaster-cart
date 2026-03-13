import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all shadow-sm"
        placeholder="Search for restaurants, cuisines, or dishes..."
      />
      <button className="absolute inset-y-1 right-1 px-6 bg-brand-primary text-white font-medium rounded-full hover:bg-orange-600 transition-colors">
        Find Food
      </button>
    </div>
  );
}
