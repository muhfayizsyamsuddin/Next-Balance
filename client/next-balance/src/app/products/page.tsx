"use client";

import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { ProductType } from "@/Types";
import { productPageBanners } from "@/data/banners";
// import SearchProduct from "@/components/SearchProduct";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchProduct from "@/components/SearchProduct";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  // const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${page}&search=${search}`);
      const data: ProductType[] = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => {
          // Ambil semua ID yang sudah ada
          const existingIds = new Set(prevProducts.map((p) => p._id));
          // Filter produk baru yang belum ada ID-nya
          const uniqueNewProducts = data.filter((p) => !existingIds.has(p._id));
          return [...prevProducts, ...uniqueNewProducts];
        });
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    setProducts([]); // reset data sebelum fetch
    setPage(1); // reset ke halaman pertama
    setHasMore(true);
    setSearch(search);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]); // eslint-disable-line react-hooks/exhaustive-deps

  // const handleSearch = (q: string) => {
  //   setSearch(q.toLowerCase());
  // };

  // const handleSearch = (q: string) => {
  //   setQuery(q.toLowerCase());
  // };
  // Filter products berdasarkan query search
  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(query)
  // );
  // Get product page specific banners
  const banners = productPageBanners();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section dengan Search */}
      <div className="bg-white border-b border-gray-200">
        {/* Product Page Banners - Full Width */}
        <Banner
          banners={banners}
          dismissible={true}
          rotateInterval={6000}
          showIndicators={true}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our complete collection of premium athletic footwear
              designed for performance and style.
            </p>

            {/* Search Component */}
            <div className="max-w-md mx-auto">
              <SearchProduct onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        {search && (
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              {products.length > 0
                ? `Showing results for "${search}"`
                : `No results found for "${search}"`}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          loader={
            loading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <span className="text-gray-600 font-medium">
                    Loading more products...
                  </span>
                </div>
              </div>
            )
          }
          endMessage={
            !hasMore &&
            products.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  You&apos;ve seen all our amazing products!
                </p>
              </div>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>

        {/* Empty State */}
        {!loading && products.length === 0 && !search && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Available
              </h3>
              <p className="text-gray-600">
                We&apos;re working on adding new products. Check back soon!
              </p>
            </div>
          </div>
        )}

        {/* Search Empty State */}
        {!loading && products.length === 0 && search && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any products matching &quot;{search}
                &quot;. Try a different search term.
              </p>
              <button
                onClick={() => handleSearch("")}
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
