import { NextFunction, Request, Response } from "express";

import { BadRequest, Forbidden, Conflict } from "../../errors";
import { config } from "../../config";
import { AuthService } from "./service";
import { GithubProvider } from "./githubProvider";
import { validateAuthDTO } from "./validateAuthDTO";

export const COOKIE_NAME = "token";

export class AuthController {
  constructor(
    private authService: AuthService,
    private githubProvider: GithubProvider
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = validateAuthDTO(req.body);
      const token = await this.authService.register(email, password);
      if (!token) {
        throw new Conflict(`User with email ${email} already exists`);
      }
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.status(201).send({
        accessToken: token,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = validateAuthDTO(req.body);
      const token = await this.authService.login(email, password);
      if (!token) {
        throw new Forbidden("Invalid email or password");
      }
      res.cookie(COOKIE_NAME, token, { httpOnly: true });
      res.send({
        accessToken: token,
      });
    } catch (e) {
      next(e);
    }
  }

  logout(_: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(COOKIE_NAME);
      res.send();
    } catch (e) {
      next(e);
    }
  }

  getGithubUrl(_: Request, res: Response, next: NextFunction) {
    try {
      const redirectUrl = this.githubProvider.generateUrl();
      res.send({ url: redirectUrl });
    } catch (e) {
      next(e);
    }
  }

  async githubCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const code = req.query.code as string | undefined;
      if (!code) {
        throw new BadRequest("Error during GitHub authentication");
      }
      const token = await this.authService.loginWithService(
        code,
        this.githubProvider
      );
      res.redirect(`${config.frontendUrl}/user?token=${token}`);
    } catch (e) {
      next(e);
    }
  }
}
