import axios from 'axios';

import { AuthResponse, UserDTO, User } from '../types';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://authentication-app-backend-lovat.vercel.app/',
  timeout: 1000,
});

export const AuthService = {
  registerUser: async (user: UserDTO) => {
    const { data } = await api.post<AuthResponse>('auth/register', {
      email: user.email,
      password: user.password,
    });
    return data;
  },
  loginUser: async (user: UserDTO) => {
    const { data } = await api.post<AuthResponse>('auth/login', {
      email: user.email,
      password: user.password,
    });
    return data;
  },
};

export const UserService = {
  getUserInfo: async (token: string) => {
    const { data } = await api.get<User>('/user', {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  },
  updateUser: async (user: Partial<User>, accessToken: string) => {
    const { data } = await api.put<AuthResponse>(
      '/user',
      {
        ...user,
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
      },
    );
    return data;
  },
};
