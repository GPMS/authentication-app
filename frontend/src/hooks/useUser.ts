import { useEffect, useState } from 'react';
import { User } from '../types';
import { useLocalStorage } from 'usehooks-ts';
import { AuthService } from '../services';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken] = useLocalStorage('auth-token', '');

  useEffect(() => {
    async function getUser() {
      if (!accessToken) return;
      const userInfo = await AuthService.getUserInfo(accessToken);
      setUser(userInfo);
      setIsLoading(false);
    }
    getUser();
  }, [accessToken]);

  return { user, isLoading };
}
