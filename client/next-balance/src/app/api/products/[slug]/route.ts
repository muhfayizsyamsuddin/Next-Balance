import ProductModel from "@/db/models/ProductModel";
import errHandler from "@/helpers/errHandler";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await ProductModel.getProductBySlug(slug);
    if (!product) {
      throw { message: "Product not found", status: 404 };
    }
    return Response.json(product);
  } catch (err) {
    return errHandler(err);
  }
}
