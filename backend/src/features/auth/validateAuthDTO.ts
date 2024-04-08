import { NextFunction, Request, Response } from "express";
import z from "zod";

import { BadRequest } from "../../errors";

export const authDTO = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

export function validateAuthDTO(body: object) {
  const authBody = authDTO.safeParse(body);
  if (!authBody.success) {
    const issues = authBody.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    throw new BadRequest("bad request");
  }
  return authBody.data;
}
