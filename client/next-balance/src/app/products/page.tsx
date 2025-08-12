"use client";

import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { ProductType } from "@/Types";
import { productPageBanners } from "@/data/banners";
import SearchProduct from "@/components/SearchProduct";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const handleSearch = (q: string) => {
    setQuery(q.toLowerCase());
  };
  // Filter products berdasarkan query search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  // Get product page specific banners
  const banners = productPageBanners();

  return (
    <div className="min-h-screen">
      {/* Product Page Banners */}
      <Banner
        banners={banners}
        dismissible={true}
        rotateInterval={6000}
        showIndicators={true}
      />
      <SearchProduct onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <h1 className="text-3xl font-bold text-white-900 mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
