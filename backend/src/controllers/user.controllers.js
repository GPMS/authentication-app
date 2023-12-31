import { findUserById, updateUser } from "../db.js";
import { generateToken, hashPassword } from "../util.js";

export async function getUserInfo(req, res) {
  let user = await findUserById(req.userId);
  if (!user) {
    console.warn("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({ ...user, password: undefined });
}
export async function updateUserInfo(req, res) {
  console.log("Update");
  if (req.body?.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  const updatedUser = await updateUser(req.userId, req.body);
  if (!updatedUser) {
    console.warn("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...updatedUser, password: undefined }),
  });
}
