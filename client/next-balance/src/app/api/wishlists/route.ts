import WishlistModel from "@/db/models/WishlistModel";
import errHandler from "@/helpers/errHandler";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    console.log("User ID from headers:", userId);
    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }
    const body = await request.json();
    const { productId }: { productId: string } = body;
    if (!productId) {
      throw { message: "Product ID is required", status: 400 };
    }
    const newWishlist = {
      userId,
      productId,
    };
    await WishlistModel.createWishlist(newWishlist);
    return Response.json(
      {
        message: "Wishlist created successfully",
        userId,
      },
      { status: 201 }
    );
  } catch (err) {
    return errHandler(err);
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }
    const wishlists = await WishlistModel.getAllWishlists(userId);
    return Response.json(wishlists, { status: 200 });
  } catch (err) {
    return errHandler(err);
  }
}
