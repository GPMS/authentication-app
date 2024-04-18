import { CustomError } from "./customError";

export class Conflict extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}
