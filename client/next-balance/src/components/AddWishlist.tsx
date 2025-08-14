"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface AddWishlistProps {
  productId: string;
  isInWishlist?: boolean;
  onWishlistChange?: (inWishlist: boolean) => void;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "card";
  className?: string;
  onRemoved?: () => void;
}

export default function AddWishlist({
  productId,
  isInWishlist = false,
  onWishlistChange,
  size = "md",
  variant = "icon",
  className = "",
  onRemoved,
}: AddWishlistProps) {
  const [inWishlist, setInWishlist] = useState(isInWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);

      const method = inWishlist ? "DELETE" : "POST";
      const endpoint = "/api/wishlists";

      const response = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.status === 401) {
        toast.error("You must be logged in to use wishlist.");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to ${inWishlist ? "remove from" : "add to"} wishlist`
        );
      }

      const newWishlistState = !inWishlist;
      setInWishlist(newWishlistState);
      onWishlistChange?.(newWishlistState);

      if (!newWishlistState) {
        onRemoved?.();
      }

      toast.success(
        newWishlistState ? "Added to wishlist!" : "Removed from wishlist"
      );
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: {
      icon: "h-4 w-4",
      button: "px-2 py-1 text-xs",
      card: "p-2",
    },
    md: {
      icon: "h-5 w-5",
      button: "px-3 py-2 text-sm",
      card: "p-3",
    },
    lg: {
      icon: "h-6 w-6",
      button: "px-4 py-3 text-base",
      card: "p-4",
    },
  };

  // Base button classes
  const baseClasses =
    "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant-specific rendering
  if (variant === "icon") {
    return (
      <button
        onClick={(e) => handleToggleWishlist(e)}
        disabled={isLoading}
        className={`${baseClasses} rounded-full hover:scale-110 ${className}`}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isLoading ? (
          <Loader2
            className={`${sizeClasses[size].icon} animate-spin text-gray-400`}
          />
        ) : (
          <Heart
            className={`${sizeClasses[size].icon} ${
              inWishlist
                ? "text-red-500 fill-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        )}
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={(e) => handleToggleWishlist(e)}
        disabled={isLoading}
        className={`${baseClasses} ${
          sizeClasses[size].button
        } rounded-lg font-medium ${
          inWishlist
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
        } ${className}`}
      >
        {isLoading ? (
          <Loader2 className={`${sizeClasses[size].icon} animate-spin mr-2`} />
        ) : (
          <Heart
            className={`${sizeClasses[size].icon} mr-2 ${
              inWishlist ? "fill-white" : ""
            }`}
          />
        )}
        {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`${sizeClasses[size].card} bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
      >
        <button
          onClick={(e) => handleToggleWishlist(e)}
          disabled={isLoading}
          className={`${baseClasses} w-full rounded-lg ${
            inWishlist
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <div className="text-center">
            {isLoading ? (
              <Loader2
                className={`${sizeClasses[size].icon} animate-spin mx-auto mb-2`}
              />
            ) : (
              <Heart
                className={`${sizeClasses[size].icon} mx-auto mb-2 ${
                  inWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
            )}
            <p className="font-medium">
              {isLoading
                ? "Loading..."
                : inWishlist
                ? "In Wishlist"
                : "Add to Wishlist"}
            </p>
            {inWishlist && (
              <p className="text-xs text-gray-500 mt-1">Click to remove</p>
            )}
          </div>
        </button>
      </div>
    );
  }

  return null;
}
