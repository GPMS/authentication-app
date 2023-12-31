import { hashPassword, verifyPassword, generateToken } from "../util.js";
import { createUser, findUserByEmail } from "../db.js";

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
  res.status(201).send({
    accessToken: generateToken({ ...createdUser, password: undefined }),
  });
}

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
    res.send({
      accessToken: generateToken({ ...user, password: undefined }),
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
