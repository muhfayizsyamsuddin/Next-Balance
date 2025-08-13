import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class WishlistModel {
  static collection() {
    return database.collection("wishlists");
  }
  static async createWishlist(newWishlist: {
    userId: string;
    productId: string;
  }) {
    const result = await this.collection().insertOne({
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
    });
    return result;
  }

  static async getAllWishlists(userId: string) {
    const wishlists = await this.collection()
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return wishlists;
  }
}

export default WishlistModel;
