import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { ProductType } from "@/Types";
import { productPageBanners } from "@/data/banners";

export default async function Products() {
  const data = await fetch("http://localhost:3000/api/products");
  const products: ProductType[] = await data.json();
  console.log(products);

  // Get product page specific banners
  const banners = productPageBanners();

  return (
    <div className="min-h-screen">
      {/* Product Page Banners */}
      <Banner
        banners={banners}
        dismissible={true}
        rotateInterval={6000}
        showIndicators={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
