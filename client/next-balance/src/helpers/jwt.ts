import { sign } from "jsonwebtoken";

export const signToken = (payload: { id: string; email: string }) => {
  const token = sign(payload, process.env.JWT_SECRET as string);
  return token;
};
