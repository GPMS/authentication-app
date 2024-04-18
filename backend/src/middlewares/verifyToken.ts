import { verifyJwt } from "../utils";
import { COOKIE_NAME } from "../features/auth/controller";
import { NextFunction, Request, Response } from "express";
import { InvalidTokenError, NoTokenError } from "../errors";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Try to get token from header, if succeeded then set cookie
  let token;
  token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
  } else {
    // Failed so try to get token from cookie
    token = req.cookies[COOKIE_NAME];
    // If failed yet again throw error
    if (!token) throw new NoTokenError();
  }

  // Validate token
  try {
    const id = await verifyJwt(token);
    console.info(`verifyToken: Current user id is ${id}`);
    req.userId = id;
    next();
  } catch (err) {
    if (err) {
      throw new InvalidTokenError(err as Error);
    }
  }
}
