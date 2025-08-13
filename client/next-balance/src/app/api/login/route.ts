import UserModel from "@/db/models/UserModel";
import { comparePassword } from "@/helpers/bcrypt";
import errHandler from "@/helpers/errHandler";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const user = await UserModel.loginUser(body.email);
    if (!user) throw { message: "Invalid email or password", status: 401 };
    const isPasswordValid = comparePassword(body.password, user.password);
    if (!isPasswordValid)
      throw { message: "Invalid email or password", status: 401 };
    const token = signToken({ id: user._id.toString(), email: user.email });

    const cookieStore = await cookies();
    cookieStore.set("Authorization", `Bearer ${token}`);

    return Response.json({
      access_token: token,
      message: "Login successful",
    });
  } catch (err) {
    return errHandler(err);
  }
}
