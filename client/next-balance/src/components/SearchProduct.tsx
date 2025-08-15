"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchProductProps {
  onSearch: (query: string) => void;
}

export default function SearchProduct({ onSearch }: SearchProductProps) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 z-10">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          />

          {/* Clear Button */}
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Button - Hidden but functional for Enter key */}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {/* Search Suggestions/Tips */}
      {!search && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            Try searching for &quot;running&quot;, &quot;lifestyle&quot;, or
            &quot;training&quot;
          </p>
        </div>
      )}
    </div>
  );
}
