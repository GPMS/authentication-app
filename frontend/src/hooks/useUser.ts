import { useEffect, useState } from 'react';
import { User } from '../types';
import { UserService } from '../services';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToken } from './useToken';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { removeToken } = useToken();

  useEffect(() => {
    async function getUser() {
      try {
        const userInfo = await UserService.getUserInfo(searchParams.get('token') ?? undefined);
        setUser(userInfo);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof AxiosError) {
          removeToken();
          if (e.response?.status === 403 || e.response?.status === 400) {
            toast.error('You must login first before accessing this page');
            navigate('/login', { replace: true });
          }
        }
      }
    }
    getUser();
  }, [navigate]);

  return { user, isLoading };
}
