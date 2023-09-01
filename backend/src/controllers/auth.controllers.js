import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { createUser, findUserByEmail, users } from "../db.js";

export async function register(req, res) {
  console.log("Register");
  const { email, password } = req.body;
  if (!password || !email) {
    res.sendStatus(400);
    return;
  }
  if (findUserByEmail(email)) {
    console.log(`User with email ${email} already exists`);
    res.sendStatus(409);
    return;
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = createUser({
    email,
    password: hashedPassword,
  });
  res.status(201).send({
    accessToken: generateToken({ ...createdUser, password: undefined }),
  });
}

export async function login(req, res) {
  console.log("Login");
  const { email, password } = req.body;
  if (!password || !email) {
    res.sendStatus(400);
    return;
  }
  const user = findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    console.log("Invalid email or password");
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...user, password: undefined }),
  });
}
