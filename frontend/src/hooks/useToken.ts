import { useLocalStorage } from './useLocalStorage';

export function useToken() {
  const {
    value: token,
    setLocalStorage: setToken,
    removeLocalStorage: removeToken,
  } = useLocalStorage<string>('auth-token');

  return { token, setToken, removeToken };
}
