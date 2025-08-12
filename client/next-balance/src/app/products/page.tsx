import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/Types";

export default async function Products() {
  const data = await fetch("http://localhost:3001/products");
  const products: ProductType[] = await data.json();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Products Page</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className="text-lg">Explore our range of products.</p>
      <p className="text-sm text-gray-500">
        Browse through our collection to find the best deals and offers.
      </p>
      <div className="mt-8">
        <p className="text-md text-gray-700">
          Check back soon for new arrivals!
        </p>
        <p className="text-sm text-gray-500">
          Stay tuned for the latest updates and product launches.
        </p>
      </div>
    </div>
  );
}
