import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { AccountForm } from './AccountForm';
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
      <AccountForm formData={formData} onChange={handleChange} onSubmit={handleSubmit}>
        <button className="bg-blue-600 mt-2 rounded-lg text-white">
          {isRegister ? 'Start coding now' : 'Login'}
        </button>
      </AccountForm>
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
