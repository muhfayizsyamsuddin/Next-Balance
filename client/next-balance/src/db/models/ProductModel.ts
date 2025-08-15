import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }

  static async getAllProducts(
    page: string,
    limit: number = 4,
    search: string = ""
  ) {
    // const limit = 4;
    const skip = (Number(page) - 1) * limit;
    const query = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};
    return await this.collection()
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  static async getProductBySlug(slug: string) {
    const product = await this.collection().findOne({ slug });
    return product;
  }
}

export default ProductModel;
