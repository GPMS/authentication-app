import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { AxiosError } from 'axios';

import { FacebookIcon } from '../components/icons/FacebookIcon';
import { GithubIcon } from '../components/icons/GithubIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { AccountFormInput } from '../components/AccountFormInput';
import { UserDTO } from '../types';
import { AuthService } from '../services';
import { useToken } from '../hooks/useToken';

export function LogInPage() {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserDTO>({
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { accessToken } = await AuthService.loginUser(formData);
      setToken(accessToken);
      navigate(`/user`);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && e.response.status === 403) {
          console.error('Invalid email/password!');
        }
      }
    }
  }

  return (
    <>
      <header>
        <h1 className="font-semibold tracking-tight text-lg mt-7">Login</h1>
      </header>
      <main>
        <form className="grid mt-8 gap-3.5 auto-rows-[3rem]" onSubmit={handleSubmit}>
          <AccountFormInput
            Icon={MdEmail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <AccountFormInput
            Icon={MdLock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <button className="bg-blue-600 mt-2 rounded-lg text-white">Login</button>
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
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
