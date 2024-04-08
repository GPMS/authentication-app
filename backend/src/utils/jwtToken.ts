import jwt from "jsonwebtoken";
import z from "zod";
import { config } from "../config";

const jwtPayloadSchema = z.object({
  id: z.string(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export function generateToken(id: string) {
  return jwt.sign({ id }, config.jwtAccessTokenSecret);
}

export function verifyJwt(token: string): Promise<string> {
  return new Promise((resolve, reject) => {
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
