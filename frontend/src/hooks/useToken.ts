import { useLocalStorage } from 'usehooks-ts';

export function useToken() {
  const [token, setToken] = useLocalStorage('auth-token', '');

  function removeToken() {
    localStorage.removeItem('auth-token');
  }

  return { token, setToken, removeToken };
}
