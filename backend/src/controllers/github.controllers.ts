import axios from "axios";
import { config } from "../config";
import { User } from "../models/user";
import { generateToken } from "../util";

export async function githubOauth(code: string) {
  // Exchange the code for an access token
  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: config?.github.clientId,
      client_secret: config?.github.clientSecret,
      code: code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const accessToken = data.access_token as string;

  // Get user email using the access token
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const githubEmail = userResponse.data.email as string;

  // Create new user if it doesn't already exist
  let user = await User.findOne({ email: githubEmail }).exec();
  if (!user) {
    user = await User.create({ email: githubEmail, provider: "github" });
  }

  return generateToken(user.id);
}
