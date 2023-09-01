import { findUserById, updateUser, users } from "../db.js";
import { generateToken } from "../util.js";

export function getUserInfo(req, res) {
  console.log("getUserInfo");
  let user = findUserById(req.userId);
  if (!user) {
    console.log("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({ ...user, password: undefined });
}
export async function updateUserInfo(req, res) {
  console.log("updateUserInfo");
  const { email, password } = req.body;
  const user = await updateUser(req.userId, req.body);
  if (!user) {
    console.log("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...user, password: undefined }),
  });
}
