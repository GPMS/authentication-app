import { CustomError } from "./customError";

export class EmailAlreadyRegisteredError extends CustomError {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 409);
  }
}
