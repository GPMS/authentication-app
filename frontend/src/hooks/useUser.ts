import { useEffect, useState } from 'react';
import { User } from '../types';
import { UserService } from '../services';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const userInfo = await UserService.getUserInfo();
        setUser(userInfo);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            toast.error('You must login first before accessing this page');
            navigate('/login');
          }
        }
      }
    }
    getUser();
  }, [navigate]);

  return { user, isLoading };
}
