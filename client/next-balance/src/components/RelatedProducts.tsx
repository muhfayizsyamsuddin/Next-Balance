"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@/Types";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: number;
  tags: string[];
}

export default function RelatedProducts({
  currentProductId,
  tags,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductId]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (response.ok) {
        const products: ProductType[] = await response.json();

        // Filter out current product and get related products based on tags
        const filtered = products
          .filter((product) => product._id !== currentProductId)
          .filter((product) => product.tags.some((tag) => tags.includes(tag)))
          .slice(0, 4); // Limit to 4 products

        setRelatedProducts(filtered);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          You might also like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product._id} className="group">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <Heart
                    size={16}
                    className="text-gray-600 hover:text-red-500"
                  />
                </button>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Link
                    href={`/products/${product.slug}`}
                    className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-gray-600"
                  >
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>

                  {/* Color variants indicator */}
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
