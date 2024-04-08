import { User, UserWithoutPassword } from "../database/models/user";

export type UserRepository = {
  findByEmailWithPassword(email: string): Promise<User | null>;
  findByEmail(email: string): Promise<UserWithoutPassword | null>;
  findById(id: string): Promise<UserWithoutPassword | null>;
  create(newUser: Omit<User, "id">): Promise<UserWithoutPassword>;
  update(
    id: string,
    updatedFields: Partial<User>
  ): Promise<UserWithoutPassword | null>;
};
