"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ProductType } from "@/Types";
import AddWishlist from "./AddWishlist";

interface ProductCardProps {
  product: ProductType;
  showQuickActions?: boolean;
  layout?: "grid" | "list";
  // onAddToCart?: (productId: number) => void;
  onQuickView?: (productId: number) => void;
}

export default function ProductCard({
  product,
  showQuickActions = true,
  layout = "grid",
}: // onAddToCart,
// onQuickView,
ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Fetch wishlist status for this product
  const fetchWishlistStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/wishlists", {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const wishlist = await res.json();
        const found = wishlist.some(
          (item: { productId: string }) =>
            item.productId.toString() === product._id.toString()
        );
        setIsInWishlist(found);
      }
    } catch (error) {
      console.error("Error fetching wishlist status:", error);
    }
  }, [product._id]);

  useEffect(() => {
    fetchWishlistStatus();
  }, [fetchWishlistStatus]);

  // Handle wishlist state change
  const handleWishlistChange = useCallback(
    async (newState: boolean) => {
      setIsInWishlist(newState);

      // Wait a bit for the database to update
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Re-fetch to confirm
      await fetchWishlistStatus();
    },
    [fetchWishlistStatus]
  );

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onAddToCart?.(product._id);
  // };

  // const handleQuickView = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onQuickView?.(product._id);
  // };

  if (layout === "list") {
    return (
      <Link href={`/products/${product.slug}`} className="group">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
          <div className="flex">
            {/* Image Section */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}

              {/* Wishlist Button */}
              {showQuickActions && (
                <div className="absolute top-3 right-3">
                  <AddWishlist
                    productId={product._id.toString()}
                    isInWishlist={isInWishlist}
                    onWishlistChange={handleWishlistChange}
                    variant="icon"
                    size="sm"
                    className="bg-white rounded-full shadow-md hover:bg-gray-50 p-2"
                  />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </div>

                  {showQuickActions && (
                    <div className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid Layout (Default)
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-gray-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[currentImageIndex] || product.thumbnail}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onLoad={() => setImageLoaded(true)}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  suppressHydrationWarning
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Quick Actions Overlay */}
          {showQuickActions && (
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AddWishlist
                productId={product._id.toString()}
                isInWishlist={isInWishlist}
                onWishlistChange={handleWishlistChange}
                variant="icon"
                size="sm"
                className="bg-white rounded-full shadow-md hover:bg-gray-50 p-2"
              />
              {/* <button
                onClick={handleQuickView}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                suppressHydrationWarning={true}
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </button> */}
            </div>
          )}

          {/* Quick Add to Cart - Appears on Hover */}
          {/* {showQuickActions && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                suppressHydrationWarning={true}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          )} */}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </div>

            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
}
