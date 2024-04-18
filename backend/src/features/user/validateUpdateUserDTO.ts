import z from "zod";
import { ValidationError } from "../../errors";

const updateUserDTO = z.object({
  email: z.string().email().optional(),
  photo: z.string().url().or(z.literal("")).optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  provider: z.union([z.literal("local"), z.literal("github")]).optional(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .optional(),
});

export function validateUpdateUserDTO(body: object) {
  const updateBody = updateUserDTO.safeParse(body);
  if (!updateBody.success) {
    throw new ValidationError(updateBody.error.errors);
  }
  return updateBody.data;
}
