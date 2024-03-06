import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";

export function handleErrors(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).send("Something went wrong try again later");
}
