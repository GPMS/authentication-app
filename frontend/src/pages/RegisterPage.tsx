import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';

import { FacebookIcon } from '../components/icons/FacebookIcon';
import { GithubIcon } from '../components/icons/GithubIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { AccountFormInput } from '../components/AccountFormInput';

export function RegisterPage() {
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log('registered');
    e.preventDefault();
    navigate('/user/5');
  }
  return (
    <>
      <header>
        <h1 className="font-semibold text-lg mt-7">
          Join thousands of learners from
          <br /> around the world
        </h1>
      </header>
      <main>
        <p className="mt-3.5">
          Master web development by making real-life projects. There are multiple paths for you to
          choose
        </p>
        <form className="grid mt-8 gap-3.5 auto-rows-[3rem]" onSubmit={handleSubmit}>
          <AccountFormInput Icon={MdEmail} type="email" name="email" placeholder="Email" />
          <AccountFormInput Icon={MdLock} type="password" name="password" placeholder="Password" />
          <button className="bg-blue-600 mt-2 rounded-lg text-white">Start coding now</button>
        </form>
        <div className="flex flex-col gap-5 mt-10 text-center text-[#828282] text-sm">
          <p>or continue with these social profile</p>
          <div className="flex gap-5 justify-center">
            <FacebookIcon />
            <GithubIcon />
            <GoogleIcon />
            <TwitterIcon />
          </div>
          <p>
            Already a member?{' '}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
