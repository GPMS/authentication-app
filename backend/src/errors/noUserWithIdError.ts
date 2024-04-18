import { CustomError } from "./customError";

export class NoUserWithIdError extends CustomError {
  constructor(id: string) {
    super(`no user with id ${id}`, 400);
  }
}
