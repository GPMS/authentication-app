import { Express } from "express";
import z from "zod";
import { login, register, COOKIE_NAME } from "../controllers/auth.controllers";
import { verifyToken } from "../middlewares/authJWT";
import { BadRequest, Forbidden, Conflict } from "../errors";
import { config } from "../config";
import { githubOauth } from "../controllers/github.controllers";

const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

function parseAuthBody(body: unknown) {
  const authBody = authSchema.safeParse(body);
  if (!authBody.success) {
    const issues = authBody.error.issues.map((issue) => issue.message);
    throw new BadRequest(issues.join("; "));
  }
  return authBody.data;
}

export function authRoutes(app: Express) {
  app.post("/auth/register", async (req, res) => {
    console.info("Register");
    const { email, password } = parseAuthBody(req.body);
    const token = await register(email, password);
    if (!token) {
      throw new Conflict(`User with email ${email} already exists`);
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(201).send({
      accessToken: token,
    });
  });
  app.post("/auth/login", async (req, res) => {
    console.info("Login");
    const { email, password } = parseAuthBody(req.body);
    const token = await login(email, password);
    if (!token) {
      throw new Forbidden("Invalid email or password");
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.send({
      accessToken: token,
    });
  });
  app.post("/auth/logout", verifyToken, (_, res) => {
    res.clearCookie(COOKIE_NAME);
    res.send();
  });

  app.get("/auth/github", (_, res) => {
    const redirectUrl = new URL(
      `https://github.com/login/oauth/authorize?client_id=${config?.github.clientId}`
    );
    res.send({ url: redirectUrl });
  });

  app.get("/auth/github/callback", async (req, res) => {
    const code = req.query.code as string | undefined;

    if (!code) {
      throw new BadRequest("Error during GitHub authentication");
    }

    const token = await githubOauth(code);
    res.redirect(`${config?.frontendUrl}/user?token=${token}`);
  });
}
