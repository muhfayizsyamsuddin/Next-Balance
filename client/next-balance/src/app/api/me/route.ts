import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/UserModel";
import { verifyTokenWithJose } from "@/helpers/jwt";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("Authorization");

    if (!cookie) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = cookie.value.startsWith("Bearer ")
      ? cookie.value.slice(7)
      : cookie.value;

    const payload = await verifyTokenWithJose(token);

    const user = await UserModel.findById(payload.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      username: user.username,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}