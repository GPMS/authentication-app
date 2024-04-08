import { hashPassword, verifyPassword, generateToken } from "../../utils";
import { User } from "../models/user";
import { GithubProvider } from "./githubProvider";

export const authService = {
  register: async (email: string, password: string) => {
    if (await User.findOne({ email }).exec()) {
      return null;
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      provider: "local",
    });
    return generateToken(createdUser.id);
  },
  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).select("+password").exec();
    if (!user || !(await verifyPassword(password, user.password))) {
      return null;
    }
    return generateToken(user.id);
  },
  loginWithService: async (code: string, oauthProvider: GithubProvider) => {
    const accessToken = await oauthProvider.getAccessToken(code);
    const {
      name,
      email,
      avatar_url: photo,
      bio,
    } = await oauthProvider.getUserInfo(accessToken);

    // Create new user if it doesn't already exist
    let user = await User.findOne({ email }).exec();
    if (!user) {
      user = await User.create({ email, provider: "github", name, photo, bio });
      console.info(`GitHub Oauth: Created new user`);
    }

    return generateToken(user.id);
  },
};
