import { randomUUID } from "crypto";
import { User } from "../database/models/user";
import { UserRepository } from "./userRepository";

export class UserRepositoryInMemory implements UserRepository {
  #users: User[] = [];

  constructor() {}

  getAllUsers() {
    return this.#users;
  }

  async findByEmailWithPassword(email: string) {
    return this.#users.filter((u) => u.email === email)[0];
  }

  async findByEmail(email: string) {
    let user = await this.findByEmailWithPassword(email);
    user.password = undefined;
    delete user.password;
    return user;
  }

  async findById(id: string) {
    return this.#users.filter((u) => u.id === id)[0];
  }

  async create(newUserInfo: Omit<User, "id">) {
    const newUser = {
      id: randomUUID(),
      ...newUserInfo,
    };
    this.#users.push(newUser);
    return newUser;
  }

  async update(id: string, updatedFields: Partial<User>) {
    let user = this.findById(id);
    user = {
      ...user,
      ...updatedFields,
    };
    return user;
  }
}
