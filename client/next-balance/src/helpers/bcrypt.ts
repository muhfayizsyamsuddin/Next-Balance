import { hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = 10;
  return hashSync(password, salt);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};
