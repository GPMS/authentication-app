import jwt from "jsonwebtoken";
import { verifyJwt } from "../utils";
import { COOKIE_NAME } from "../features/auth/controller";
import { BadRequest, Forbidden } from "../errors";
import { NextFunction, Request, Response } from "express";

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
    if (!token) throw new Forbidden("No token provided");
  }

  // Validate token
  try {
    const id = await verifyJwt(token);
    console.info(`verifyToken: Current user id is ${id}`);
    req.userId = id;
    next();
  } catch (err) {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.warn("Token validation error: Token expired");
      } else {
        console.warn("Token validation error:", err);
      }
      throw new Forbidden("Invalid token");
    }
  }
}
