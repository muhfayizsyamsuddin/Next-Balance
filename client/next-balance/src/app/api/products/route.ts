import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const products = await ProductModel.getAllProducts(page);
  return Response.json(products);
}
