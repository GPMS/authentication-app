import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { AuthService } from '../services';
import { SocialLogin } from './SocialLogin';
import { UserDTO } from '../types';
import { useToken } from '../hooks/useToken';

function AuthForm({ isRegister }: { isRegister: boolean }) {
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
    toast.promise(
      async () => {
        try {
          const { accessToken } = isRegister
            ? await AuthService.registerUser(formData)
            : await AuthService.loginUser(formData);
          setToken(accessToken);
          navigate(`/user`);
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.response && e.response.data.message) {
              toast.error(e.response.data.message);
              throw e;
            }
          }
        }
      },
      {
        loading: 'Loading...',
        success: 'Redirecting...',
      },
    );
  }
  return (
    <>
      <form className="grid mt-8 gap-3.5 auto-rows-[3rem]" onSubmit={handleSubmit}>
        <div className="relative text-[#828282]">
          <MdEmail
            className="text-inherit absolute w-[24px] h-[24px] left-[12px] -translate-y-1/2 top-1/2"
            name={'email-icon'}
          />
          <input
            className="placeholder:text-inherit border border-[#BDBDBD] rounded-lg w-full h-full pl-12 bg-transparent"
            type="email"
            name="email"
            placeholder="Email"
            id=""
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative text-[#828282]">
          <MdLock
            className="text-inherit absolute w-[24px] h-[24px] left-[12px] -translate-y-1/2 top-1/2"
            name={'password-icon'}
          />
          <input
            className="placeholder:text-inherit border border-[#BDBDBD] rounded-lg w-full h-full pl-12 bg-transparent"
            type="password"
            name="password"
            placeholder="Password"
            id=""
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="bg-blue-600 mt-2 rounded-lg text-white">
          {isRegister ? 'Start coding now' : 'Login'}
        </button>
      </form>
      <div className="flex flex-col gap-5 mt-10 text-center text-[#828282] text-sm">
        <p>or continue with these social profile</p>
        <SocialLogin />
        <p>
          {isRegister ? (
            <>
              Already a member?{' '}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account yet?{' '}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export function LoginForm() {
  return <AuthForm isRegister={false} />;
}

export function RegisterForm() {
  return <AuthForm isRegister={true} />;
}
