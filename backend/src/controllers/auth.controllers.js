import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { createUser, findUserByEmail } from "../db.js";

export const COOKIE_NAME = "token";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function register(req, res) {
  console.info("Register");
  const { email, password } = req.body;
  if (!password || !email) {
    res.sendStatus(400);
    return;
  }
  if (await findUserByEmail(email)) {
    console.warn(`User with email ${email} already exists`);
    res.sendStatus(409);
    return;
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
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      res.sendStatus(400);
      return;
    }
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password))) {
      console.warn("Invalid email or password");
      res.sendStatus(403);
      return;
    }
    const token = generateToken({ id: user.id });
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.send({
      accessToken: token,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).send({
        message: e.message,
      });
    } else {
      res.status(403);
    }
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  res.send();
}
