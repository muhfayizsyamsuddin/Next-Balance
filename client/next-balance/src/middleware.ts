import { NextResponse, type NextRequest } from "next/server";
import errHandler from "./helpers/errHandler";
import { cookies } from "next/headers";
// import { verify } from "crypto";
import { verifyTokenWithJose } from "./helpers/jwt";

export async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authorization = cookieStore.get("Authorization");
    console.log("Authorization cookie:", authorization);
    if (!authorization) {
      return new Response("Unauthorized", { status: 401 });
    }
    const [type, token] = authorization.value.split(" ");
    if (type !== "Bearer") {
      throw { message: "Invalid token type", status: 401 };
    }
    if (!token) {
      throw { message: "Token not provided", status: 401 };
    }
    const decoded = await verifyTokenWithJose(token);
    console.log("Decoded token:", decoded);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  } catch (err) {
    return errHandler(err);
  }
}

export const config = {
  matcher: ["/api/wishlists"],
};
