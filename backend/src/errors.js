export class CustomError extends Error {
  /**
   *
   * @param {string} message
   * @param {integer} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

export class Conflict extends CustomError {
  constructor(message) {
    super(message, 409);
  }
}

export class Forbidden extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}
