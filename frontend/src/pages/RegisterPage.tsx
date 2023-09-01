import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';

import { FacebookIcon } from '../components/icons/FacebookIcon';
import { GithubIcon } from '../components/icons/GithubIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { TwitterIcon } from '../components/icons/TwitterIcon';
import { AccountFormInput } from '../components/AccountFormInput';
import { UserDTO } from '../types';
import { AuthService } from '../services';
import { AxiosError } from 'axios';
import { useToken } from '../hooks/useToken';

export function RegisterPage() {
  const { setToken } = useToken();

  const [formData, setFormData] = useState<UserDTO>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { accessToken } = await AuthService.registerUser(formData);
      setToken(accessToken);
      navigate(`/user`);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && e.response.status === 409) {
          console.error('Email already registered');
        }
      }
    }
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
