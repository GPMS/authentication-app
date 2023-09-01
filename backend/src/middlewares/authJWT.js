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
        console.log("Token validation error: Token expired");
      } else {
        console.log("Token validation error:", err);
      }
      console.log("invalid token");
      return res.sendStatus(403);
    }
  }
}
