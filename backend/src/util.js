import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 *
 * @param {any} payload public data to be included in the token
 * @returns {string}
 */
export function generateToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

/**
 *
 * @param {string} token
 * @param {jwt.Secret | jwt.GetPublicKeyOrSecret} secretOrPublicKey
 */
export function verifyJwt(token, secretOrPublicKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, user) => {
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
