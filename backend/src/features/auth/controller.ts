import { Request, Response } from "express";

import { BadRequest, Forbidden, Conflict } from "../../errors";
import { config } from "../../config";
import { authService } from "./service";
import { GithubService } from "./githubService";
import { validateAuthDTO } from "./validateAuthDTO";

export const COOKIE_NAME = "token";


const githubService = new GithubService();

export const authController = {
  register: async (req: Request, res: Response) => {
    console.info("Register");
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
    const redirectUrl = githubService.generateUrl();
    res.send({ url: redirectUrl });
  },
  githubCallback: async (req: Request, res: Response) => {
    const code = req.query.code as string | undefined;

    if (!code) {
      throw new BadRequest("Error during GitHub authentication");
    }
    const token = await authService.loginWithService(code, githubService);
    res.redirect(`${config.frontendUrl}/user?token=${token}`);
  },
};
