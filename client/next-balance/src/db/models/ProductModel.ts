import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }

  static async getAllProducts() {
    return await this.collection().find().toArray();
  }

  static async getProductBySlug(slug: string) {
    const product = await this.collection().findOne({ slug });
    return product;
  }
}

export default ProductModel;
