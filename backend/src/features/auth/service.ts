import { hashPassword, verifyPassword, generateToken } from "../../utils";
import { UserModel } from "../models/user";
import { GithubProvider } from "./githubProvider";

export class AuthService {
  constructor() {}

  async register(email: string, password: string) {
    if (await UserModel.findOne({ email }).exec()) {
      return null;
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await UserModel.create({
      email,
      password: hashedPassword,
      provider: "local",
    });
    return generateToken(createdUser.id);
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).select("+password").exec();
    if (!user || typeof user.password === "undefined") {
      return null;
    }
    if (!(await verifyPassword(password, user.password))) {
      return null;
    }
    return generateToken(user.id);
  }

  async loginWithService(code: string, oauthProvider: GithubProvider) {
    const accessToken = await oauthProvider.getAccessToken(code);
    const {
      name,
      email,
      avatar_url: photo,
      bio,
    } = await oauthProvider.getUserInfo(accessToken);

    // Create new user if it doesn't already exist
    let user = await UserModel.findOne({ email }).exec();
    if (!user) {
      user = await UserModel.create({
        email,
        provider: "github",
        name,
        photo,
        bio,
      });
      console.info(`GitHub Oauth: Created new user`);
    }

    return generateToken(user.id);
  }
}
