import { CustomError } from "./customError";

export class NoTokenError extends CustomError {
  constructor() {
    super("No token provided", 403);
  }
}
