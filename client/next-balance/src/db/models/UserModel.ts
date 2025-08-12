import { NewUserType } from "@/Types";
import { database } from "../config/mongodb";
import * as z from "zod";
import { comparePassword, hashPassword } from "@/helpers/bcrypt";

const UserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  name: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

class UserModel {
  static collection() {
    return database.collection("users");
  }

  static async registerUser(newUser: NewUserType) {
    try {
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
    } catch (err) {
      console.error("Error registering user:", err);
      throw new Error("User registration failed");
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      const user = await this.collection().find({ email: email }).toArray();
      if (user.length === 0) {
        throw { message: "Invalid email or password", status: 401 };
      }
      const isPasswordValid = comparePassword(password, user[0].password);
      if (!isPasswordValid) {
        throw { message: "Invalid email or password", status: 401 };
      }
      return {
        _id: user[0]._id,
        username: user[0].username,
        name: user[0].name,
        email: user[0].email,
      };
    } catch (err) {
      console.error("Error logging in user:", err);
      throw new Error("User login failed");
    }
  }
}

export default UserModel;
