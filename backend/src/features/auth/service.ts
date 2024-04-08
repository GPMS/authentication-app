import { hashPassword, verifyPassword, generateToken } from "../../utils";
import { UserRepository } from "../../repositories/userRepository";
import { GithubProvider } from "./githubProvider";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(email: string, password: string) {
    if (await this.userRepository.findByEmail(email)) {
      return null;
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      provider: "local",
    });
    return generateToken(createdUser.id);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmailWithPassword(email);
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
    let user = await this.userRepository.findByEmail(email);
    if (!user) {
      user = await this.userRepository.create({
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
