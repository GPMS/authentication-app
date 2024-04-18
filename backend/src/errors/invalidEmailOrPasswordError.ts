import { CustomError } from "./customError";

export class InvalidEmailOrPasswordError extends CustomError {
  constructor() {
    super("Invalid email or password", 403);
  }
}
