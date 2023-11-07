import { FacebookIcon } from './icons/FacebookIcon';
import { GithubIcon } from './icons/GithubIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { TwitterIcon } from './icons/TwitterIcon';

export function SocialLogin() {
  return (
    <div className="flex gap-5 justify-center">
      <FacebookIcon />
      <GithubIcon />
      <GoogleIcon />
      <TwitterIcon />
    </div>
  );
}
