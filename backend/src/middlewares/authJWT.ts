import jwt from "jsonwebtoken";
import { verifyJwt } from "../util";
import { COOKIE_NAME } from "../controllers/auth.controllers";
import { BadRequest, Forbidden } from "../errors";
import { NextFunction, Request, Response } from "express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get JWT access token from request
  const token = req.cookies[COOKIE_NAME];
  if (!token) throw new BadRequest("No token provided");

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
