import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { UserDTO } from '../types';
import { AuthService } from '../services';
import { useToken } from '../hooks/useToken';
import { SocialLogin } from '../components/SocialLogin';
import { AccountForm } from '../components/AccountForm';
import { toast } from 'sonner';

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
    toast.promise(
      async () => {
        try {
          const { accessToken } = await AuthService.loginUser(formData);
          setToken(accessToken);
          navigate(`/user`);
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.response && e.response.status === 403) {
              toast.error('Invalid email/password!');
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
      <header>
        <h1 className="font-semibold tracking-tight text-lg mt-7">Login</h1>
      </header>
      <main>
        <AccountForm formData={formData} onChange={handleChange} onSubmit={handleSubmit}>
          <button className="bg-blue-600 mt-2 rounded-lg text-white">Login</button>
        </AccountForm>
        <div className="flex flex-col gap-5 mt-10 text-center text-[#828282] text-sm">
          <p>or continue with these social profile</p>
          <SocialLogin />
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
