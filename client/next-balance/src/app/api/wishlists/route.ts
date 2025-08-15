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
    console.log("Creating wishlist item:", newWishlist);
    const result = await WishlistModel.createWishlist(newWishlist);
    console.log("Wishlist created successfully:", result);
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
    console.log(
      "Fetched wishlists for user:",
      userId,
      "count:",
      wishlists?.length
    );
    if (!wishlists) {
      throw { message: "No wishlists found", status: 404 };
    }
    return Response.json(wishlists, { status: 200 });
  } catch (err) {
    return errHandler(err);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { productId }: { productId: string } = body;
    if (!productId) {
      throw { message: "Product ID is required", status: 400 };
    }
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }
    console.log("🗑️ Removing wishlist item:", { userId, productId });
    const result = await WishlistModel.removeWishlistItem(userId, productId);
    console.log("✅ Remove result:", result);
    if (result.deletedCount === 0) {
      throw { message: "Wishlist item not found", status: 404 };
    }
    return Response.json(
      { message: "Item removed from wishlist" },
      { status: 200 }
    );
  } catch (err) {
    return errHandler(err);
  }
}
