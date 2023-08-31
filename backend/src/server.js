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

let users = [
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

function findUserById(id) {
  const user = users.find((u) => u.id === id);
  return user;
}

function findUserByEmail(email) {
  const user = users.find((u) => u.email === email);
  return user;
}

function removeUserById(id) {
  users = users.filter((u) => u.id !== id);
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
  console.log(req.body, user);
  if (!(await verifyPassword(password, user.password))) {
    res.sendStatus(403);
    return;
  }
  res.send({
    accessToken: generateToken({ ...user, password: undefined }),
  });
});

export function checkTokenMiddleware(req, res, next) {
  // Get JWT access token from request
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  // Validate token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.log("Token validation error: Token expired");
      } else {
        console.log("Token validation error:", err);
      }
      console.log("invalid token");
      return res.sendStatus(403);
    }
    req.userID = user.id;
    next();
  });
}

app.get("/user", checkTokenMiddleware, async (req, res) => {
  let user = findUserById(req.userID);
  if (!user) {
    console.log("no user");
    res.sendStatus(403);
    return;
  }
  res.send({ ...user, password: undefined });
});

app.put("/user", checkTokenMiddleware, async (req, res) => {
  const { email, password } = req.body;
  let user = findUserById(req.userID);
  if (!user) {
    console.log("no user");
    res.sendStatus(403);
    return;
  }
  removeUserById(req.userId);
  for (const key in user) {
    if (req.body[key]) {
      if (key === "password") {
        user[key] = await hashPassword(req.body[key]);
      } else {
        user[key] = req.body[key];
      }
    }
  }
  createUser(user);
  res.send({
    accessToken: generateToken({ ...user, password: undefined }),
  });
});

const server = app.listen(PORT, () => {
  console.log(`INFO: Listening to port ${PORT}...`);
});
