import { hashPassword } from "../../utils";
import { User, TUser } from "../models/user";

export const userService = {
  getUserInfo: async (userId: string) => {
    let user = await User.findById(userId).select({ _id: 0, __v: 0 }).exec();
    return user;
  },
  updateUserInfo: async (userId: string, newUserInfo: Partial<TUser>) => {
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
  },
};
