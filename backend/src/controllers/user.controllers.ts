import { generateToken, hashPassword } from "../util";
import { User, TUser } from "../database/models/user";

export async function getUserInfo(userId: string) {
  let user = await User.findById(userId).select({ _id: 0, __v: 0 }).exec();
  return user;
}

export async function updateUserInfo(
  userId: string,
  newUserInfo: Partial<TUser>
) {
  if (newUserInfo.password) {
    newUserInfo.password = await hashPassword(newUserInfo.password);
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: newUserInfo,
    },
    { returnDocument: "after" }
  ).exec();
  return updatedUser != null;
}
