"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BannerData {
  id: number;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
}

interface BannerProps {
  banners?: BannerData[];
  message?: string;
  ctaText?: string;
  ctaLink?: string;
  dismissible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
  rotateInterval?: number;
  showIndicators?: boolean;
}

// Default banner data
const defaultBanners: BannerData[] = [
  {
    id: 1,
    message: "🎉 Free shipping on orders over $75 + Free returns",
    ctaText: "Shop Now",
    ctaLink: "/products",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    message: "⚡ New Collection Just Dropped - Athletic Performance Series",
    ctaText: "Explore Now",
    ctaLink: "/products?filter=new",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
  {
    id: 3,
    message: "🔥 Limited Time: Up to 50% OFF on selected items",
    ctaText: "Shop Sale",
    ctaLink: "/products?filter=sale",
    bgColor: "bg-green-600",
    textColor: "text-white",
  },
  {
    id: 4,
    message:
      "📞 24/7 Customer Support Available | Expert Help When You Need It",
    ctaText: "Contact Us",
    ctaLink: "/contact",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
];

export default function Banner({
  banners = defaultBanners,
  message,
  ctaText,
  ctaLink = "#",
  dismissible = true,
  autoHide = false,
  autoHideDelay = 7000,
  rotateInterval = 4000,
  showIndicators = true,
}: BannerProps) {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Use single banner mode if message is provided
  const singleBannerMode = Boolean(message);
  const bannersToShow = singleBannerMode
    ? [
        {
          id: 1,
          message: message!,
          ctaText,
          ctaLink,
          bgColor: "bg-black",
          textColor: "text-white",
        },
      ]
    : banners;

  const currentBanner = bannersToShow[currentIndex];

  // Auto rotation for multiple banners
  useEffect(() => {
    if (!singleBannerMode && bannersToShow.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannersToShow.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [singleBannerMode, bannersToShow.length, rotateInterval, isPaused]);

  // Auto hide functionality
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => setVisible(false), autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`w-full ${currentBanner.bgColor} ${currentBanner.textColor} flex items-center justify-center py-3 px-6 relative font-sans transition-all duration-500 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center justify-center max-w-7xl w-full">
        <p className="text-center text-sm sm:text-base">
          {currentBanner.message}{" "}
          {currentBanner.ctaText && currentBanner.ctaLink && (
            <Link
              href={currentBanner.ctaLink}
              className="underline font-semibold hover:no-underline ml-2 transition-all duration-200"
            >
              {currentBanner.ctaText}
            </Link>
          )}
        </p>

        {/* Indicators for multiple banners */}
        {!singleBannerMode && bannersToShow.length > 1 && showIndicators && (
          <div className="flex space-x-2 mt-2">
            {bannersToShow.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          aria-label="Close banner"
          onClick={() => setVisible(false)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${currentBanner.textColor} hover:opacity-70 transition-opacity duration-200 text-lg font-bold`}
        >
          &#x2715;
        </button>
      )}
    </div>
  );
}
