import jwt from "jsonwebtoken";
import { verifyJwt } from "../util.js";
import { COOKIE_NAME } from "../controllers/auth.controllers.js";
import { BadRequest, Forbidden } from "../errors.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function verifyToken(req, res, next) {
  // Get JWT access token from request
  const token = req.cookies[COOKIE_NAME];
  if (!token) throw BadRequest("No token provided");

  // Validate token
  try {
    const { id } = await verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = id;
    next();
  } catch (err) {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.warn("Token validation error: Token expired");
      } else {
        console.warn("Token validation error:", err);
      }
      throw Forbidden("Invalid token");
    }
  }
}
