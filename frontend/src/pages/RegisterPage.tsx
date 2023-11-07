import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserDTO } from '../types';
import { AuthService } from '../services';
import { AxiosError } from 'axios';
import { useToken } from '../hooks/useToken';
import { SocialLogin } from '../components/SocialLogin';
import { AccountForm } from '../components/AccountForm';
import { toast } from 'sonner';

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
    toast.promise(
      async () => {
        try {
          const { accessToken } = await AuthService.registerUser(formData);
          setToken(accessToken);
          navigate(`/user`);
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.response && e.response.status === 409) {
              toast.error('Email already registered');
              throw e;
            }
          }
        }
      },
      {
        loading: 'Loading...',
      },
    );
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
        <AccountForm formData={formData} onChange={handleChange} onSubmit={handleSubmit}>
          <button className="bg-blue-600 mt-2 rounded-lg text-white">Start coding now</button>
        </AccountForm>
        <div className="flex flex-col gap-5 mt-10 text-center text-[#828282] text-sm">
          <p>or continue with these social profile</p>
          <SocialLogin />
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
