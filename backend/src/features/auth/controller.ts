import { Request, Response } from "express";

import { BadRequest, Forbidden, Conflict } from "../../errors";
import { config } from "../../config";
import { authService } from "./service";
import { GithubProvider } from "./githubProvider";
import { validateAuthDTO } from "./validateAuthDTO";

export const COOKIE_NAME = "token";

const githubProvider = new GithubProvider();

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = validateAuthDTO(req.body);
    const token = await authService.register(email, password);
    if (!token) {
      throw new Conflict(`User with email ${email} already exists`);
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(201).send({
      accessToken: token,
    });
  },
  login: async (req: Request, res: Response) => {
    console.info("Login");
    const { email, password } = validateAuthDTO(req.body);
    const token = await authService.login(email, password);
    if (!token) {
      throw new Forbidden("Invalid email or password");
    }
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.send({
      accessToken: token,
    });
  },
  logout: (_: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    res.send();
  },
  getGithubUrl: (_: Request, res: Response) => {
    const redirectUrl = githubProvider.generateUrl();
    res.send({ url: redirectUrl });
  },
  githubCallback: async (req: Request, res: Response) => {
    const code = req.query.code as string | undefined;

    if (!code) {
      throw new BadRequest("Error during GitHub authentication");
    }
    const token = await authService.loginWithService(code, githubProvider);
    res.redirect(`${config.frontendUrl}/user?token=${token}`);
  },
};
