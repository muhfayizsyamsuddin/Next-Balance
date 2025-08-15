"use server";
// import { Shield, Stars, Truck, Users } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductType } from "@/Types";
import { ArrowRight } from "lucide-react";

// interface ProductProps {
//   products: ProductType[];
// }

export default async function FeaturedProducts({
  products,
}: {
  products: ProductType[];
}) {
  // const data = await fetch("http://localhost:3000/api/products");
  // const productsFeatured: ProductType[] = await data.json();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular athletic footwear, loved by athletes and
              fitness enthusiasts worldwide.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {/* {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square">
                <Image
                  src={product.images[0] || product.thumbnail}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.excerpt}</p>
                <span className="text-red-600 font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))} */}
          {/* )} */}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
