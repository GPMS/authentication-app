import bcrypt from "bcrypt";

export async function verifyPassword(password: string, actualPassword: string) {
  return await bcrypt.compare(password, actualPassword);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
