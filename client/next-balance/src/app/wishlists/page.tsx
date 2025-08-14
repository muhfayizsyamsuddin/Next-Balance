"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  //   ShoppingCart,
  Trash2,
  ArrowLeft,
  Grid3X3,
  List,
} from "lucide-react";
import { WishlistType } from "@/Types";
import toast from "react-hot-toast";

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "name";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    // const fetchWishlist = async () => {
    //   setLoading(true);
    //   const res = await fetch("http://localhost:3000/api/wishlists");
    //   const data = await res.json();
    //   setWishlistItems(data);
    //   setLoading(false);
    // };
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const res = await fetch("http://localhost:3000/api/wishlists", {
        method: "GET",
        credentials: "include", // memastikan cookie dikirim
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      //   const data = await response.json();

      // Map the data to include product details
      // Assuming the API returns wishlist items with populated product data
      //   const mappedData: WishlistItem[] = data.map(
      //     (item: {
      //       _id: number;
      //       userId: number;
      //       productId: number;
      //       dateAdded?: string;
      //       product?: {
      //         name?: string;
      //         slug?: string;
      //         description?: string;
      //         excerpt?: string;
      //         price?: number;
      //         tags?: string[];
      //         thumbnail?: string;
      //         images?: string[];
      //         rating?: number;
      //         reviewCount?: number;
      //         discountPrice?: number;
      //         isNew?: boolean;
      //         isBestseller?: boolean;
      //         isAvailable?: boolean;
      //       };
      //       name?: string;
      //       slug?: string;
      //       description?: string;
      //       excerpt?: string;
      //       price?: number;
      //       tags?: string[];
      //       thumbnail?: string;
      //       images?: string[];
      //       rating?: number;
      //       reviewCount?: number;
      //       discountPrice?: number;
      //       isNew?: boolean;
      //       isBestseller?: boolean;
      //       isAvailable?: boolean;
      //     }) => ({
      //       _id: item._id,
      //       userId: item.userId,
      //       productId: item.productId,
      //       dateAdded: item.dateAdded || new Date().toISOString(),
      //       name: item.product?.name || item.name || "Unknown Product",
      //       slug: item.product?.slug || item.slug || "",
      //       description: item.product?.description || item.description || "",
      //       excerpt: item.product?.excerpt || item.excerpt || "",
      //       price: item.product?.price || item.price || 0,
      //       tags: item.product?.tags || item.tags || [],
      //       thumbnail:
      //         item.product?.thumbnail || item.thumbnail || "/placeholder.jpg",
      //       images: item.product?.images || item.images || [],
      //       rating: item.product?.rating || item.rating || 4.5,
      //       reviewCount: item.product?.reviewCount || item.reviewCount || 0,
      //       discountPrice: item.product?.discountPrice || item.discountPrice,
      //       isNew: item.product?.isNew || item.isNew || false,
      //       isBestseller:
      //         item.product?.isBestseller || item.isBestseller || false,
      //       isAvailable: item.product?.isAvailable ?? item.isAvailable ?? true,
      //     })
      //   );

      setWishlistItems(data);
      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const confirmed = confirm("Are you sure you want to remove this item?");
      if (!confirmed) return;

      const response = await fetch(`/api/wishlists`, {
        method: "DELETE",
        credentials: "include", // memastikan cookie dikirim
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }
      setWishlistItems((items) =>
        items.filter((item) => item.productId !== productId)
      );

      toast.success("Item removed from wishlist");
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((item) => item._id));
    }
  };

  const handleBulkRemove = async () => {
    try {
      const removePromises = selectedItems.map(async (itemId) => {
        const itemToRemove = wishlistItems.find((item) => item._id === itemId);
        if (!itemToRemove) return;

        return fetch(`/api/wishlists`, {
          method: "DELETE",
          credentials: "include", // <-- ini penting
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: itemToRemove.productId }),
        });
      });

      await Promise.all(removePromises);

      setWishlistItems((items) =>
        items.filter((item) => !selectedItems.includes(item._id))
      );
      setSelectedItems([]);
      setIsSelectMode(false);

      alert(`${selectedItems.length} item(s) removed from wishlist`);
    } catch (error) {
      console.error("Error removing items from wishlist:", error);
      alert("Failed to remove items. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          </div>

          {/* Error State */}
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="text-red-500 text-6xl mb-6">⚠️</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <button
                onClick={fetchWishlist}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Save items you love for later. Start exploring our collection
                and add your favorites here.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Explore Products
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            // href={`/products/${item.product.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your Wishlist
              </h1>
              <p className="text-gray-600 mt-1">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSelectMode(!isSelectMode)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isSelectMode ? "Cancel" : "Select"}
              </button>
              {/* <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {isSelectMode && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                >
                  {selectedItems.length === wishlistItems.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
                {selectedItems.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} selected
                  </span>
                )}
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkRemove}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Selected
                </button>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Sort */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="newest">Newest Added</option>
                <option value="oldest">Oldest Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items Rendering */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className={`relative bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm`}
              >
                {/* Select checkbox (jika select mode) */}
                {isSelectMode && (
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => {
                        if (selectedItems.includes(item._id)) {
                          setSelectedItems(
                            selectedItems.filter((id) => id !== item._id)
                          );
                        } else {
                          setSelectedItems([...selectedItems, item._id]);
                        }
                      }}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </div>
                )}

                {/* Remove button */}
                {!isSelectMode && (
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-red-100 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                )}

                {/* Gambar Produk */}
                <Link href={`/products/${item.product.slug}`}>
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      width={256}
                      height={256}
                      priority
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Info Produk */}
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {typeof item.product.price === "number"
                      ? item.product.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                      : "Harga tidak tersedia"}
                  </p>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="inline-block mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                  >
                    Lihat Produk
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Select checkbox (jika select mode) */}
                {isSelectMode && (
                  <div className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => {
                        if (selectedItems.includes(item._id)) {
                          setSelectedItems(
                            selectedItems.filter((id) => id !== item._id)
                          );
                        } else {
                          setSelectedItems([...selectedItems, item._id]);
                        }
                      }}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </div>
                )}

                {/* Gambar Produk */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-32 h-32 bg-gray-100 flex-shrink-0"
                >
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    width={128}
                    height={128}
                    priority
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Info Produk */}
                <div className="flex-1 p-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>

                <div className="p-4">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                  >
                    Lihat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
