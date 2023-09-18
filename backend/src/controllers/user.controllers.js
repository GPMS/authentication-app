import { findUserById, updateUser } from "../db.js";
import { generateToken, hashPassword } from "../util.js";

export async function getUserInfo(req, res) {
  console.log("getUserInfo");
  let user = await findUserById(req.userId);
  if (!user) {
    console.log("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({ ...user, password: undefined });
}
export async function updateUserInfo(req, res) {
  console.log("updateUserInfo");
  for (const key in req.body) {
    if (key === "password") {
      req.body.password = hashPassword(req.body.password);
    }
  }
  const updatedUser = await updateUser(req.userId, req.body);
  if (!updatedUser) {
    console.log("no user with id", req.userId);
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...updatedUser, password: undefined }),
  });
}
