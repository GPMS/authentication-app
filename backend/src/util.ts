import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import { config } from "./config";

const jwtPayloadSchema = z.object({
  id: z.string(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export function generateToken(id: string) {
  if (!config?.jwtAccessTokenSecret) {
    throw Error("Set ACCESS TOKEN SECRET environmental variable");
  }
  return jwt.sign({ id }, config.jwtAccessTokenSecret);
}

export function verifyJwt(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!config?.jwtAccessTokenSecret) {
      throw Error("Set ACCESS TOKEN SECRET environmental variable");
    }
    jwt.verify(token, config.jwtAccessTokenSecret, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      const parsedPayload = jwtPayloadSchema.safeParse(payload);
      if (!parsedPayload.success) {
        const issues = parsedPayload.error.issues.join("; ");
        reject(new Error(`Token payload parse error: ${issues}`));
        return;
      }
      resolve(parsedPayload.data.id);
    });
  });
}

export async function verifyPassword(password: string, actualPassword: string) {
  return await bcrypt.compare(password, actualPassword);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
