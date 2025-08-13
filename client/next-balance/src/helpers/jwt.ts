import { sign, verify } from "jsonwebtoken";
import * as jose from "jose";

export const signToken = (payload: { id: string; email: string }) => {
  const token = sign(payload, process.env.JWT_SECRET as string);
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    throw { message: "Invalid token", status: 401 };
  }
};

export const verifyTokenWithJose = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    const { payload } = await jose.jwtVerify<{ id: string }>(token, secret);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    throw { message: "Invalid token", status: 401 };
  }
};
