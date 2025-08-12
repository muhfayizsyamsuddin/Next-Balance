import UserModel from "@/db/models/UserModel";
import errHandler from "@/helpers/errHandler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await UserModel.registerUser(body);
    return Response.json(result);
  } catch (err) {
    return errHandler(err);
  }
}
