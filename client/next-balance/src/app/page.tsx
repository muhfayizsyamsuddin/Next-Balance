import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import { ProductType } from "@/Types";
import Footer from "@/components/Footer";
import { homepageBanners } from "@/data/banners";
import InfoNextBalance from "@/components/InfoNextBalance";
import Image from "next/image";
export const dynamic = "force-dynamic";
export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=5`
  );
  const products: ProductType[] = await data.json();
  // console.log(products);

  // Get homepage banners
  const banners = homepageBanners();

  return (
    <div className="min-h-screen">
      {/* Multiple Rotating Banners */}
      <Banner
        banners={banners}
        dismissible={true}
        rotateInterval={5000}
        showIndicators={true}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Step Into
                <span className="block text-red-500">Performance</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Discover premium athletic footwear engineered for champions.
                Every step forward is a step toward greatness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={`/products/${products[0]?.slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  View Collection
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-xl p-6 transform -rotate-3">
                  <div className="flex flex-col items-center justify-between min-h-[260px]">
                    {/* Bagian Teks */}
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        New Collection
                      </h3>
                      <p className="text-gray-600 text-sm">Athletic Performance</p>
                    </div>

                    <div className="relative flex items-center justify-center h-72">
                      {/* Glow merah */}
                      <div className="absolute w-64 h-64 rounded-full bg-red-100 opacity-70 blur-3xl"></div>

                      {/* Card kecil untuk gambar */}
                      <div
                        className="
                          relative
                          bg-white
                          rounded-2xl
                          p-6
                          shadow-2xl
                          border border-gray-100
                          transition-all
                          duration-500
                          hover:-translate-y-2
                          hover:rotate-[-3deg]
                        "
                      >
                        <img
                          src={products[0]?.thumbnail}
                          alt={products[0]?.name}
                          className="
                            h-52
                            w-auto
                            object-contain
                            transition-transform
                            duration-500
                            hover:scale-110
                          "
                        />
                      </div>

                      {/* Shadow bawah */}
                      <div className="absolute bottom-6 w-52 h-5 bg-black/20 blur-xl rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <InfoNextBalance />

      {/* Featured Products Section */}

      <FeaturedProducts products={products} />

      {/* </section> */}

      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead of the Game
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            collections, exclusive offers, and athletic insights.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600">Product Variants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
