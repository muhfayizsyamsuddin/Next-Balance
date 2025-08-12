// Banner data configuration
export interface BannerData {
  id: number;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  priority?: number;
}

// Promotional banners
export const promotionalBanners: BannerData[] = [
  {
    id: 1,
    message: "Free shipping on orders over $75 + Free returns",
    ctaText: "Shop Now",
    ctaLink: "/products",
    bgColor: "bg-black",
    textColor: "text-white",
    isActive: true,
    priority: 1,
  },
  {
    id: 2,
    message: "New Collection Just Dropped - Athletic Performance Series",
    ctaText: "Explore Now",
    ctaLink: "/products?filter=new",
    bgColor: "bg-red-600",
    textColor: "text-white",
    isActive: true,
    priority: 2,
  },
  {
    id: 3,
    message: "Limited Time: Up to 50% OFF on selected items",
    ctaText: "Shop Sale",
    ctaLink: "/products?filter=sale",
    bgColor: "bg-green-600",
    textColor: "text-white",
    isActive: true,
    priority: 3,
  },
  {
    id: 4,
    message:
      "📞 24/7 Customer Support Available | Expert Help When You Need It",
    ctaText: "Contact Us",
    ctaLink: "/contact",
    bgColor: "bg-blue-600",
    textColor: "text-white",
    isActive: true,
    priority: 4,
  },
];

// Seasonal banners
export const seasonalBanners: BannerData[] = [
  {
    id: 101,
    message: "🏃‍♂️ Summer Running Collection - Beat the Heat in Style",
    ctaText: "Shop Summer",
    ctaLink: "/products?season=summer",
    bgColor: "bg-orange-500",
    textColor: "text-white",
    isActive: true,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
  },
  {
    id: 102,
    message: "❄️ Winter Gear Collection - Stay Warm, Stay Active",
    ctaText: "Shop Winter",
    ctaLink: "/products?season=winter",
    bgColor: "bg-blue-800",
    textColor: "text-white",
    isActive: false,
    startDate: "2025-12-01",
    endDate: "2026-02-28",
  },
];

// Announcement banners
export const announcementBanners: BannerData[] = [
  {
    id: 201,
    message:
      "We've expanded our delivery network - Now delivering to 50+ cities",
    ctaText: "Check Coverage",
    ctaLink: "/delivery-info",
    bgColor: "bg-purple-600",
    textColor: "text-white",
    isActive: true,
  },
  {
    id: 202,
    message: "Join our loyalty program and earn points on every purchase",
    ctaText: "Join Now",
    ctaLink: "/loyalty",
    bgColor: "bg-indigo-600",
    textColor: "text-white",
    isActive: true,
  },
];

// Utility functions
export const getActiveBanners = (banners: BannerData[]): BannerData[] => {
  const now = new Date();

  return banners
    .filter((banner) => {
      if (!banner.isActive) return false;

      if (banner.startDate && banner.endDate) {
        const start = new Date(banner.startDate);
        const end = new Date(banner.endDate);
        return now >= start && now <= end;
      }

      return true;
    })
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));
};

export const getAllActiveBanners = (): BannerData[] => {
  return [
    ...getActiveBanners(promotionalBanners),
    ...getActiveBanners(seasonalBanners),
    ...getActiveBanners(announcementBanners),
  ];
};

// Banner sets for different pages
export const homepageBanners = (): BannerData[] => {
  return getActiveBanners(promotionalBanners);
};

export const productPageBanners = (): BannerData[] => {
  return [
    ...getActiveBanners(
      promotionalBanners.filter((b) => b.id === 1 || b.id === 3)
    ),
    ...getActiveBanners(seasonalBanners),
  ];
};

export const checkoutBanners = (): BannerData[] => {
  return getActiveBanners(promotionalBanners.filter((b) => b.id === 1));
};
