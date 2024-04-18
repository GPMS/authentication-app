import { CustomError } from "./customError";

export class OauthError extends CustomError {
  constructor(service: "Github") {
    super(`Error during ${service} authentication`, 500);
  }
}
