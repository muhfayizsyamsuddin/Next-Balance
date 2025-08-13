"use client";

import { ProductType, WishlistType } from "@/Types";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [slug, setSlug] = useState<string>("");

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

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/products/${slug}`
      );
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data: ProductType = await response.json();
      setProduct(data);

      // Check if product is already in wishlist
      checkWishlistStatus(data._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async (productId: number) => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await fetch("/api/wishlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const wishlists: WishlistType[] = await response.json();
        const isInWishlist = wishlists.some(
          (item: WishlistType) => item.productId === productId
        );
        setIsWishlisted(isInWishlist);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to add items to wishlist");
      return;
    }

    setIsAddingToWishlist(true);

    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (response.ok) {
        setIsWishlisted(true);
        alert("Added to wishlist!");
      } else {
        throw new Error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!product) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    setIsAddingToWishlist(true);

    try {
      const response = await fetch(`/api/wishlists?productId=${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsWishlisted(false);
        alert("Removed from wishlist!");
      } else {
        throw new Error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist. Please try again.");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !selectedSize) {
      alert("Please select a size");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Simulate adding to cart
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

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
                <Image
                  src={product.images[selectedImageIndex] || product.thumbnail}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
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
                      <Image
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
                  <button
                    onClick={
                      isWishlisted
                        ? handleRemoveFromWishlist
                        : handleAddToWishlist
                    }
                    disabled={isAddingToWishlist}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } disabled:opacity-50 ml-auto`}
                    style={{ marginLeft: "auto" }}
                  >
                    <Heart
                      size={24}
                      className={isWishlisted ? "fill-current" : ""}
                    />
                  </button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4"></div>
                <div className="text-2xl font-bold text-black">
                  ${product.price.toFixed(2)}
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
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedSize}
                className="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>
                  {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
                </span>
              </button>

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
