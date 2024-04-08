import { UserRepository } from "./userRepository";
import { User, userModel } from "../database/models/user";

export class UserRepositoryMongoose implements UserRepository {
  constructor() {}

  findByEmailWithPassword(email: string) {
    return userModel.findOne({ email }).select("+password").exec();
  }

  findByEmail(email: string) {
    return userModel.findOne({ email }).exec();
  }

  findById(id: string) {
    return userModel.findById(id).select({ _id: 0, __v: 0 }).exec();
  }

  create(newUser: User) {
    return userModel.create(newUser);
  }

  update(id: string, updatedFields: Partial<User>) {
    return userModel
      .findByIdAndUpdate(
        id,
        {
          $set: updatedFields,
        },
        { returnDocument: "after" }
      )
      .exec();
  }
}
