"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowLeft,
  Grid3X3,
  List,
  Share2,
} from "lucide-react";

// Format date utility function
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface WishlistItem {
  _id: number;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  discountPrice?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  dateAdded: string;
  isAvailable: boolean;
}

// Mock wishlist data - replace with actual data fetching
const mockWishlistItems: WishlistItem[] = [
  {
    _id: 1,
    name: "NB Fresh Foam X 1080v12",
    slug: "nb-fresh-foam-x-1080v12",
    description:
      "Premium running shoe with Fresh Foam X midsole technology for superior comfort and performance.",
    excerpt: "Premium running comfort",
    price: 149.99,
    discountPrice: 119.99,
    tags: ["running", "men", "bestseller"],
    thumbnail:
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/8/0888-NEWMFCXLY50CM11H-1.jpg",
    images: [
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/8/0888-NEWMFCXLY50CM11H-1.jpg",
    ],
    rating: 4.8,
    reviewCount: 127,
    isNew: false,
    isBestseller: true,
    dateAdded: "2025-08-10",
    isAvailable: true,
  },
  {
    _id: 2,
    name: "NB FuelCell Rebel v3",
    slug: "nb-fuelcell-rebel-v3",
    description:
      "Lightweight racing shoe designed for speed with FuelCell midsole technology.",
    excerpt: "Built for speed",
    price: 129.99,
    tags: ["running", "racing", "lightweight"],
    thumbnail:
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/1/01-NEW-BALANCE-F34RUNEWA-NEWPZ530KA-Silver.jpg",
    images: [
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/1/01-NEW-BALANCE-F34RUNEWA-NEWPZ530KA-Silver.jpg",
    ],
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    isBestseller: false,
    dateAdded: "2025-08-08",
    isAvailable: true,
  },
  {
    _id: 3,
    name: "NB 990v5 Made in USA",
    slug: "nb-990v5-made-in-usa",
    description:
      "Classic lifestyle sneaker crafted in the USA with premium materials and timeless design.",
    excerpt: "American craftsmanship",
    price: 185.0,
    tags: ["lifestyle", "premium", "usa-made"],
    thumbnail:
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML574EVG-Grey.jpg",
    images: [
      "https://www.newbalance.co.id/media/catalog/product/cache/b444f50a64a092a2138a5e1cbd49879a/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML574EVG-Grey.jpg",
    ],
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isBestseller: true,
    dateAdded: "2025-08-05",
    isAvailable: false,
  },
];

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "name";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(mockWishlistItems);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case "oldest":
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      case "price-low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleRemoveItem = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item._id !== id));
    setSelectedItems((selected) => selected.filter((itemId) => itemId !== id));
  };

  const handleAddToCart = (id: number) => {
    // Implement add to cart logic
    console.log("Added to cart:", id);
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((item) => item._id));
    }
  };

  const handleBulkRemove = () => {
    setWishlistItems((items) =>
      items.filter((item) => !selectedItems.includes(item._id))
    );
    setSelectedItems([]);
    setIsSelectMode(false);
  };

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
              <button className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
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

        {/* Items Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <WishlistItemCard
                key={item._id}
                item={item}
                isSelectMode={isSelectMode}
                isSelected={selectedItems.includes(item._id)}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
                onSelect={handleSelectItem}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <WishlistItemRow
                key={item._id}
                item={item}
                isSelectMode={isSelectMode}
                isSelected={selectedItems.includes(item._id)}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
                onSelect={handleSelectItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Grid Item Component
interface WishlistItemProps {
  item: WishlistItem;
  isSelectMode: boolean;
  isSelected: boolean;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
  onSelect: (id: number) => void;
}

function WishlistItemCard({
  item,
  isSelectMode,
  isSelected,
  onRemove,
  onAddToCart,
  onSelect,
}: WishlistItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(item._id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(item._id);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(item._id);
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
        isSelectMode ? "ring-2 ring-gray-200" : ""
      } ${isSelected ? "ring-red-500" : ""}`}
    >
      {/* Select Checkbox */}
      {isSelectMode && (
        <div className="p-3 border-b border-gray-100">
          <button
            onClick={handleSelect}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              isSelected ? "bg-red-600 border-red-600" : "border-gray-300"
            }`}
          >
            {isSelected && <div className="w-2 h-2 bg-white rounded-sm"></div>}
          </button>
        </div>
      )}

      <Link href={`/products/${item.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square">
          <Image
            src={item.thumbnail}
            alt={item.name}
            fill
            className="object-cover"
          />
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          {item.isNew && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.excerpt}
          </p>

          {/* Rating */}
          {item.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(item.rating!)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({item.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            {item.discountPrice ? (
              <>
                <span className="font-bold text-lg text-red-600">
                  ${item.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${item.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-gray-900">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Date Added */}
          <p className="text-xs text-gray-500 mb-4">
            Added {formatDate(item.dateAdded)}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
              className={`flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.isAvailable
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {item.isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={handleRemove}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

// List Item Component
function WishlistItemRow({
  item,
  isSelectMode,
  isSelected,
  onRemove,
  onAddToCart,
  onSelect,
}: WishlistItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(item._id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(item._id);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(item._id);
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 ${
        isSelectMode ? "ring-2 ring-gray-200" : ""
      } ${isSelected ? "ring-red-500" : ""}`}
    >
      <div className="flex items-center gap-4">
        {/* Select Checkbox */}
        {isSelectMode && (
          <button
            onClick={handleSelect}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              isSelected ? "bg-red-600 border-red-600" : "border-gray-300"
            }`}
          >
            {isSelected && <div className="w-2 h-2 bg-white rounded-sm"></div>}
          </button>
        )}

        {/* Image */}
        <Link href={`/products/${item.slug}`} className="block flex-shrink-0">
          <div className="relative w-20 h-20">
            <Image
              src={item.thumbnail}
              alt={item.name}
              fill
              className="object-cover rounded-lg"
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.slug}`} className="block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 truncate">{item.excerpt}</p>

                {/* Rating & Date */}
                <div className="flex items-center gap-4 mt-1">
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(item.rating!)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({item.reviewCount})
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">
                    Added {formatDate(item.dateAdded)}
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-4">
                {/* Price */}
                <div className="text-right">
                  {item.discountPrice ? (
                    <>
                      <div className="font-bold text-lg text-red-600">
                        ${item.discountPrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ${item.price.toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <div className="font-bold text-lg text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!item.isAvailable}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.isAvailable
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.isAvailable ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    onClick={handleRemove}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
