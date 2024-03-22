export interface OauthService {
  generateUrl: () => URL;
  getAccessToken: (code: string) => Promise<string>;
  getUserInfo: (accessToken: string) => Promise<any>;
}
