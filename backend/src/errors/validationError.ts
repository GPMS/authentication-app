import { CustomError } from "./customError";
import z from "zod";

type FormattedError = {
  field: string;
  message: string;
};

export class ValidationError extends CustomError {
  constructor(errors: z.ZodIssue[]) {
    const formattedErrors: FormattedError[] = [];
    for (const error of errors) {
      const field = error.path.join(".");
      formattedErrors.push({
        field,
        message: error.message,
      });
    }
    super("Validation Error", 400, { errors: formattedErrors });
  }
}
