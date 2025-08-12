"use client";

import Link from "next/link";
import { useState } from "react";
import { X, ChevronRight, Truck, Star, Gift } from "lucide-react";

interface BannerProps {
  type?: "promo" | "announcement" | "sale" | "info";
  message: string;
  linkText?: string;
  href?: string;
  dismissible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function Banner({
  type = "promo",
  message,
  linkText,
  href = "#",
  dismissible = true,
  autoHide = false,
  autoHideDelay = 5000,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto hide functionality
  if (autoHide && autoHideDelay) {
    setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);
  }

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Different styles based on banner type
  const bannerStyles = {
    promo: "bg-gradient-to-r from-red-600 to-red-700 text-white",
    announcement: "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
    sale: "bg-gradient-to-r from-green-600 to-green-700 text-white",
    info: "bg-gradient-to-r from-gray-800 to-gray-900 text-white",
  };

  // Icons based on banner type
  const getIcon = () => {
    switch (type) {
      case "promo":
        return <Gift className="h-4 w-4" />;
      case "announcement":
        return <Star className="h-4 w-4" />;
      case "sale":
        return <Truck className="h-4 w-4" />;
      case "info":
        return <Star className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Main Banner */}
      <div className={`relative w-full ${bannerStyles[type]} z-40`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3 text-sm font-medium">
            <div className="flex items-center space-x-2">
              {getIcon()}
              <span className="text-center">{message}</span>
              {linkText && href && (
                <Link
                  href={href}
                  className="group inline-flex items-center ml-2 underline underline-offset-2 hover:no-underline transition-all duration-200"
                >
                  {linkText}
                  <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute right-4 p-1 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors duration-200"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Optimized Banner */}
      <div className="block sm:hidden">
        <div className={`w-full ${bannerStyles[type]} text-xs`}>
          <div className="px-4 py-2 text-center">
            <div className="flex items-center justify-center space-x-1">
              {getIcon()}
              <span>{message}</span>
            </div>
            {linkText && href && (
              <Link
                href={href}
                className="block mt-1 underline underline-offset-2 hover:no-underline"
              >
                {linkText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Additional Banner Components for specific use cases

export function PromoBanner() {
  return (
    <Banner
      type="promo"
      message="🎉 Free shipping on orders over $75 + Free returns"
      linkText="Shop Now"
      href="/products"
      dismissible={true}
    />
  );
}

export function SaleBanner() {
  return (
    <Banner
      type="sale"
      message="⚡ Limited Time: Up to 50% OFF on selected items"
      linkText="Shop Sale"
      href="/products?filter=sale"
      dismissible={true}
    />
  );
}

export function AnnouncementBanner() {
  return (
    <Banner
      type="announcement"
      message="🚀 New Collection Just Dropped - Athletic Performance Series"
      linkText="Explore Now"
      href="/products?filter=new"
      dismissible={true}
    />
  );
}

export function InfoBanner() {
  return (
    <Banner
      type="info"
      message="📞 24/7 Customer Support Available | Expert Help When You Need It"
      linkText="Contact Us"
      href="/contact"
      dismissible={true}
    />
  );
}
