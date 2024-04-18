export class CustomError extends Error {
  statusCode: number;
  body: { message: string; [k: string]: any };

  constructor(
    message: string,
    statusCode: number,
    desc: { [k: string]: any } = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.body = {
      message,
      ...desc,
    };
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
