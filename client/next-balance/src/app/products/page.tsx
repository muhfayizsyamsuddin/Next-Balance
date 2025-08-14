"use client";

import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { ProductType } from "@/Types";
import { productPageBanners } from "@/data/banners";
// import SearchProduct from "@/components/SearchProduct";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  // const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products?page=${page}`
      );
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
  useEffect(() => {
    fetchProducts();
  }, [page]);

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
    <div className="min-h-screen">
      {/* Product Page Banners */}
      <Banner
        banners={banners}
        dismissible={true}
        rotateInterval={6000}
        showIndicators={true}
      />
      {/* <SearchProduct onSearch={handleSearch} /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <h1 className="text-3xl font-bold text-shadow-amber-50-900 mb-8">
          All Products
        </h1>
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          loader={
            loading && (
              <div className="text-center mt-6 text-gray-400">
                Loading products...
              </div>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>

        {/* Load More Button */}
        {/* {!loading && hasMore && filteredProducts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            >
              Load More
            </button>
          </div>
        )} */}

        {/* Empty State */}
        {/* {!loading && filteredProducts.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            No products found.
          </div>
        )} */}
      </div>
    </div>
  );
}
