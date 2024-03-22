import { hashPassword, verifyPassword, generateToken } from "../util";
import { User } from "../database/models/user";

export const COOKIE_NAME = "token";

export async function register(email: string, password: string) {
  if (await User.findOne({ email }).exec()) {
    return null;
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = await User.create({
    email,
    password: hashedPassword,
    provider: "local",
  });
  return generateToken(createdUser.id);
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email }).select("+password").exec();
  if (!user || !(await verifyPassword(password, user.password))) {
    return null;
  }
  return generateToken(user.id);
}
