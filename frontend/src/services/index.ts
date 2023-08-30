import axios from 'axios';
import { User, UserDTO } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

export const AuthService = {
  registerUser: async (user: UserDTO) => {
    const { data } = await api.post<User>('auth/register', {
      email: user.email,
      password: user.password,
    });
    return data;
  },
  loginUser: async (user: UserDTO) => {
    const { data } = await api.post<User>('auth/login', {
      email: user.email,
      password: user.password,
    });
    return data;
  },
};
