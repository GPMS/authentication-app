import { AuthService } from '../services';
import { Socials } from '../types';
import { FacebookIcon } from './icons/FacebookIcon';
import { GithubIcon } from './icons/GithubIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { TwitterIcon } from './icons/TwitterIcon';

export function SocialLogin() {
  async function signinTo(social: Socials) {
    try {
      const url = await AuthService.oauth(social);
      window.location.href = url;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex gap-5 justify-center">
      <FacebookIcon />
      <button onClick={() => signinTo('github')}>
        <GithubIcon />
      </button>
      <GoogleIcon />
      <TwitterIcon />
    </div>
  );
}
