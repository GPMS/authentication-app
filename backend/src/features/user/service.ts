import { hashPassword } from "../../utils";
import { User } from "../../database/models/user";
import { UserRepository } from "../../repositories/userRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserInfo(userId: string) {
    let user = await this.userRepository.findById(userId);
    return user;
  }

  async updateUserInfo(userId: string, newUserInfo: Partial<User>) {
    if (newUserInfo.password) {
      newUserInfo.password = await hashPassword(newUserInfo.password);
    }
    const updatedUser = await this.userRepository.update(userId, newUserInfo);
    return updatedUser != null;
  }
}
