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
