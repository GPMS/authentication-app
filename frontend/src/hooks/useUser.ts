import jwtDecode from 'jwt-decode';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types';

export function useUser(): User | null {
  const { value: accessToken } = useLocalStorage<string>('auth-token');
  if (!accessToken) {
    return null;
  }
  const user = jwtDecode<User>(accessToken);
  return user;
}
