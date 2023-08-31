import { useEffect, useState } from 'react';
import { User } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { AuthService } from '../services';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { value: accessToken } = useLocalStorage<string>('auth-token');
  useEffect(() => {
    if (!accessToken) return;
    async function getUser() {
      const userInfo = await AuthService.getUserInfo(accessToken);
      setUser(userInfo);
      setIsLoading(false);
    }
    getUser();
  }, [accessToken]);
  return { user, isLoading };
}
