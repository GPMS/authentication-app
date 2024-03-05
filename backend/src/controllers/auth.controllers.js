import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { User } from "../models/user.js";

export const COOKIE_NAME = "token";

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string | null>} token or null if user creation failed
 */
export async function register(email, password) {
  if (await User.findOne({ email }).exec()) {
    return null;
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = await User.create({
    email,
    password: hashedPassword,
  });
  return generateToken({ id: createdUser.id });
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string | null>} token or null if authentication failed
 */
export async function login(email, password) {
  const user = await User.findOne({ email }).select("+password").exec();
  if (!user || !(await verifyPassword(password, user.password))) {
    return null;
  }
  return generateToken({ id: user.id });
}
