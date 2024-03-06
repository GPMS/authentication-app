import { generateToken, hashPassword } from "../util";
import { User, TUser } from "../models/user";

export async function getUserInfo(userId: string) {
  return user;
}

export async function updateUserInfo(
  userId: string,
  newUserInfo: Partial<TUser>
) {
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
