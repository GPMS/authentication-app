import { findUserById, updateUser } from "../db.js";
import { BadRequest } from "../errors.js";
import { generateToken, hashPassword } from "../util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getUserInfo(req, res) {
  let user = await findUserById(req.userId);
  if (!user) {
    throw new BadRequest(`no user with id ${req.userId}`);
  }
  res.send({ ...user, password: undefined });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateUserInfo(req, res) {
  console.log("Update");
  if (req.body?.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  const updatedUser = await updateUser(req.userId, req.body);
  if (!updatedUser) {
    throw new BadRequest(`no user with id ${req.userId}`);
  }
  res.send({
    accessToken: generateToken({ id: updateUser.id }),
  });
}
