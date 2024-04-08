import { hashPassword } from "../../utils";
import { UserModel, User } from "../models/user";

export const userService = {
  getUserInfo: async (userId: string) => {
    let user = await UserModel.findById(userId)
      .select({ _id: 0, __v: 0 })
      .exec();
    return user;
  },
  updateUserInfo: async (userId: string, newUserInfo: Partial<User>) => {
    if (newUserInfo.password) {
      newUserInfo.password = await hashPassword(newUserInfo.password);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: newUserInfo,
      },
      { returnDocument: "after" }
    ).exec();
    return updatedUser != null;
  },
};
