import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

/**
 *
 * @param {any} payload public data to be included in the token
 * @returns {string}
 */
export function generateToken(payload) {
  return jwt.sign(payload, config.jwtAccessTokenSecret);
}

/**
 * @param {string} token
 */
export function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtAccessTokenSecret, (err, user) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
}

/**
 *
 * @param {string} password
 * @param {string} actualPassword
 * @returns
 */
export async function verifyPassword(password, actualPassword) {
  return await bcrypt.compare(password, actualPassword);
}

/**
 *
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
