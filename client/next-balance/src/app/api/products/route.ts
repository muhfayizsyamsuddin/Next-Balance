import ProductModel from "@/db/models/ProductModel";

export async function GET() {
  const products = await ProductModel.getAllProducts();
  return Response.json(products);
}
