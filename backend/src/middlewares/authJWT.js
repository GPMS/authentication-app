import jwt from "jsonwebtoken";
import { verifyJwt } from "../util.js";

export async function verifyToken(req, res, next) {
  // Get JWT access token from request
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  // Validate token
  try {
    const user = await verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = user.id;
    next();
  } catch (err) {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.warn("Token validation error: Token expired");
      } else {
        console.warn("Token validation error:", err);
      }
      console.warn("invalid token");
      return res.sendStatus(403);
    }
  }
}
