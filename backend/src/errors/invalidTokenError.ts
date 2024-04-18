import jwt from "jsonwebtoken";

import { CustomError } from "./customError";

export class InvalidTokenError extends CustomError {
  constructor(error: Error) {
    let errorMessage: string;
    super("Invalid token", 403, { error: error.message });
  }
}
