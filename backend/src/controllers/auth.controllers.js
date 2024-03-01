import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { createUser, findUserByEmail } from "../db.js";
import { BadRequest, Conflict, Forbidden } from "../errors.js";

export const COOKIE_NAME = "token";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function register(req, res) {
  console.info("Register");
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequest("No email or password provided");
  }
  if (await findUserByEmail(email)) {
    throw new Conflict(`User with email ${email} already exists`);
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = await createUser({
    email,
    password: hashedPassword,
  });
  const token = generateToken({ id: createdUser.id });
  res.cookie(COOKIE_NAME, token, { httpOnly: true });
  res.status(201).send({
    accessToken: token,
  });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function login(req, res) {
  console.info("Login");
  const { email, password } = req.body;
  if (!password || !email) {
    throw new BadRequest("No email or password provided");
  }
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    throw new Forbidden("Invalid email or password");
  }
  const token = generateToken({ id: user.id });
  res.cookie(COOKIE_NAME, token, { httpOnly: true });
  res.send({
    accessToken: token,
  });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  res.send();
}
