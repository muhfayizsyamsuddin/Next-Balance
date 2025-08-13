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
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }

  static async getAllWishlists(userId: string) {
    const agg = [
      {
        $match: { userId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const wishlists = await this.collection().aggregate(agg).toArray();

    return wishlists;
  }

  static async removeWishlistItem(userId: string, productId: string) {
    if (!userId || !productId) {
      throw { message: "User ID and Product ID are required", status: 400 };
    }
    const result = await this.collection().deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
    return result;
  }
}

export default WishlistModel;
