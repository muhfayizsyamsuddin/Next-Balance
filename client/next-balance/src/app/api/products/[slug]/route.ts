import ProductModel from "@/db/models/ProductModel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await ProductModel.getProductBySlug(slug);
    return Response.json(product);
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
}
