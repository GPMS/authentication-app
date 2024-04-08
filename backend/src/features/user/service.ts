import { hashPassword } from "../../utils";
import { UserModel, User } from "../models/user";

export class UserService {
  constructor() {}

  async getUserInfo(userId: string) {
    let user = await UserModel.findById(userId)
      .select({ _id: 0, __v: 0 })
      .exec();
    return user;
  }

  async updateUserInfo(userId: string, newUserInfo: Partial<User>) {
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
  }
}
