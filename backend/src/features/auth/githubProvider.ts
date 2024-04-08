import axios from "axios";
import { config } from "../../config";

export class GithubProvider {
  generateUrl() {
    return new URL(
      `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}`
    );
  }
  async getAccessToken(code: string) {
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.access_token as string;
  }
  async getUserInfo(accessToken: string) {
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return userResponse.data;
  }
}
