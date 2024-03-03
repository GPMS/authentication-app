import { findUserById, updateUser } from "../db.js";
import { generateToken, hashPassword } from "../util.js";

/**
 * @param {string} userId
 * @return User info or null if user doesn't exist
 */
export async function getUserInfo(userId) {
  let user = await findUserById(userId);
  if (!user) {
    return null;
  }
  return { ...user, password: undefined };
}

/**
 * @param {string} userId
 * @param newUserInfo
 * @return token or null if user doesn't exist
 */
export async function updateUserInfo(userId, newUserInfo) {
  if (newUserInfo?.password) {
    newUserInfo.password = await hashPassword(newUserInfo.password);
  }
  const updatedUser = await updateUser(userId, newUserInfo);
  if (!updatedUser) {
    return null;
  }
  return generateToken({ id: updateUser.id });
}
