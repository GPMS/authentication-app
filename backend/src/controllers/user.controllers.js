import { generateToken, hashPassword } from "../util.js";
import { User } from "../models/user.js";

/**
 * @param {string} userId
 * @return User info or null if user doesn't exist
 */
export async function getUserInfo(userId) {
  let user = await User.findById(userId).exec();
  return user;
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
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: newUserInfo,
    },
    { returnDocument: "after" }
  ).exec();
  if (!updatedUser) {
    return null;
  }
  return generateToken({ id: updatedUser.id });
}
