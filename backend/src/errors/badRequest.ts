import { CustomError } from "./customError";

export class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
