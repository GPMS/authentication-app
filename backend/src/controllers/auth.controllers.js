import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { createUser, findUserByEmail } from "../db.js";

export const COOKIE_NAME = "token";

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string | null>} token or null if user creation failed
 */
export async function register(email, password) {
  if (await findUserByEmail(email)) {
    return null;
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = await createUser({
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
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    return null;
  }
  return generateToken({ id: user.id });
}
