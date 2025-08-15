"use server";

import { ProductType } from "@/Types";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const post: ProductType = await fetch(
    `http://localhost:3000/api/products/${slug}`
  ).then((res) => res.json());
  return {
    title: post.name,
    description: post.excerpt,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await fetch(`http://localhost:3000/api/products/${slug}`);
  const product: ProductType = await data.json();
  console.log(product);
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
      <ProductDetailClient product={product} />
    </div>
  );
}
