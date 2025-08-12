import { ProductType } from "@/Types";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetch(`http://localhost:3000/api/products/${slug}`);
  const result: ProductType = await data.json();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={result.images[0] || result.thumbnail}
            alt={result.name}
            className="rounded-lg object-cover border border-gray-200"
            width={320}
            height={320}
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {result.name}
            </h1>
            <p className="text-gray-600 mb-4">{result.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold text-red-600 mr-2">
                ${result.price}
              </span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                New Balance
              </span>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
