"use client";

import { useEffect, useState, useCallback } from "react";
import { Truck, RotateCcw, Shield, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RelatedProducts from "@/components/RelatedProducts";
import AddWishlist from "@/components/AddWishlist";
import { ProductType } from "@/Types";

export default function ProductDetailClient({
  product,
}: {
  product: ProductType;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      // console.log("Fetching wishlist from server...");
      const res = await fetch("/api/wishlists", {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const wishlist = await res.json();
        // console.log("Wishlist response:", wishlist);
        // console.log("Current product ID:", product._id.toString());

        const found = wishlist.some((item: { productId: string }) => {
          // console.log(
          //   "Comparing:",
          //   item.productId,
          //   "with",
          //   product._id.toString()
          // );
          return item.productId.toString() === product._id.toString();
        });
        // console.log(" Found in wishlist:", found);
        setIsInWishlist(found);
      } else {
        console.log("Failed to fetch wishlist:", res.status);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [product._id]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const sizes = [
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
  ];
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link href="/products" className="text-black hover:underline">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  // const [product, setProduct] = useState<ProductType | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const [selectedSize, setSelectedSize] = useState<string>("");
  // const [isWishlisted, setIsWishlisted] = useState(false);
  // const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  // const [isAddingToCart, setIsAddingToCart] = useState(false);
  // const [slug, setSlug] = useState<string>("");

  // const handleAddToCart = async () => {
  //   if (!product || !selectedSize) {
  //     alert("Please select a size");
  //     return;
  //   }

  //   setIsAddingToCart(true);

  //   try {
  //     // Simulate adding to cart
  //     setTimeout(() => {
  //       setIsAddingToCart(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     alert("Failed to add to cart. Please try again.");
  //     setIsAddingToCart(false);
  //   }
  // };

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
  //           <p className="text-gray-600">Loading product...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-black transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImageIndex] || product.thumbnail}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  // priority
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-black"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex-1"></div>
                  <AddWishlist
                    productId={product._id.toString()}
                    isInWishlist={isInWishlist}
                    onWishlistChange={async (newState) => {
                      console.log(
                        "🔄 Received wishlist state change:",
                        newState
                      );

                      // Update state immediately for responsive UI
                      setIsInWishlist(newState);

                      // Wait a bit for the database to update
                      await new Promise((resolve) => setTimeout(resolve, 1000));

                      // Re-fetch from server to confirm
                      console.log("🔍 Re-fetching wishlist from server...");
                      await fetchWishlist();
                    }}
                    variant="icon"
                    size="md"
                    className="bg-white rounded-full shadow-md hover:bg-gray-50 p-2"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4"></div>
                <div className="text-2xl font-bold text-black">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Size (US)
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              {/* <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedSize}
                className="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>
                  {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
                </span>
              </button> */}

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck size={20} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-600">
                        On orders over $75
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw size={20} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Free Returns</p>
                      <p className="text-sm text-gray-600">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield size={20} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Warranty</p>
                      <p className="text-sm text-gray-600">
                        1-year manufacturer warranty
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product && (
        <RelatedProducts currentProductId={product._id} tags={product.tags} />
      )}
    </div>
  );
}
