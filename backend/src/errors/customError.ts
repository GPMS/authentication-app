export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Conflict extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class Forbidden extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}
