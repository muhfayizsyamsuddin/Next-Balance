import { NewUserType } from "@/Types";
import { database } from "../config/mongodb";
import * as z from "zod";
import { hashPassword } from "@/helpers/bcrypt";
import { ObjectId } from "mongodb";
// import errHandler from "@/helpers/errHandler";

const UserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  name: z.string(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

class UserModel {
  static collection() {
    return database.collection<NewUserType>("users");
  }

  static async registerUser(newUser: NewUserType) {
    UserSchema.parse(newUser);
    const existingUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });
    if (existingUser) {
      throw { message: "Email or Username already exists", status: 400 };
    }
    const user = await this.collection().insertOne({
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      password: hashPassword(newUser.password),
    });
    if (!user.acknowledged) {
      throw new Error("User registration failed");
    }
    return {
      _id: user.insertedId,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
    };
  }

  static async loginUser(email: string) {
    const user = await this.collection().findOne({ email });
    return user;
  }

  static async findById(id: string) {
  return this.collection().findOne({
    _id: new ObjectId(id),
  });
}
}

export default UserModel;
