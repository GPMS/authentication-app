import { CustomError } from "./customError";

export class Forbidden extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}
