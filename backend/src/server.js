import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: "1",
    email: "a@a",
    password: "$2b$10$mxZbU8EKCmVslSN08BPg0.wsG1RV/1Dga8dAjGJzF4i/fMSKMw/VO", // aaa
    photo: "https://source.unsplash.com/random/72x72?sig=1",
    name: "Xanthe Neal",
    bio: "I am a software developer and a big fan of devchallenges...",
    phone: "908249274292",
  },
];

/**
 *
 * @param {any} payload public data to be included in the token
 * @returns {string}
 */
function generateToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}

/**
 *
 * @param {string} password
 * @param {string} actualPassword
 * @returns
 */
async function verifyPassword(password, actualPassword) {
  return await bcrypt.compare(password, actualPassword);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

function createUser(user) {
  users.push({
    ...user,
    id: (users.length + 1).toString(),
  });
  return users.at(-1);
}

function findUserByEmail(email) {
  const user = users.find((u) => u.email === email);
  return user;
}

app.post("/auth/register", async (req, res) => {
  console.log("register");
  const { email, password } = req.body;
  if (!password || !email) {
    res.sendStatus(400);
    return;
  }
  if (findUserByEmail(email)) {
    res.sendStatus(409);
    return;
  }
  const hashedPassword = await hashPassword(password);
  const createdUser = createUser({
    email,
    password: hashPassword,
  });
  res.status(201).send({
    accessToken: generateToken({ ...createdUser, password: undefined }),
  });
});

app.post("/auth/login", async (req, res) => {
  console.log("login");
  const { email, password } = req.body;
  if (!password || !email) {
    res.sendStatus(400);
    return;
  }
  const user = findUserByEmail(email);
  if (!user) {
    console.log("no user");
    res.sendStatus(403);
    return;
  }
  if (!(await verifyPassword(password, user.password))) {
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...user, password: undefined }),
  });
});

const server = app.listen(PORT, () => {
  console.log(`INFO: Listening to port ${PORT}...`);
});
