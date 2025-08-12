"use client";

import { useState } from "react";

interface SearchProductProps {
  onSearch: (query: string) => void;
}

export default function SearchProduct({ onSearch }: SearchProductProps) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto my-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-l"
      />
    </form>
  );
}
