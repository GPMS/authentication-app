import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "./config";

export function generateToken(payload: any) {
  return jwt.sign(payload, config.jwtAccessTokenSecret);
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
  }
}

export function verifyJwt(token: string): Promise<jwt.JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtAccessTokenSecret, (err, user) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user as JwtPayload);
    });
  });
}

export async function verifyPassword(password: string, actualPassword: string) {
  return await bcrypt.compare(password, actualPassword);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
