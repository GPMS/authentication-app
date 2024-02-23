import axios from 'axios';

import { AuthResponse, UserDTO, User } from '../types';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://authentication-app-backend-lovat.vercel.app/',
  timeout: 1000,
  withCredentials: true,
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
  logoutUser: () => {
    return api.post('auth/logout');
  },
};

export const UserService = {
  getUserInfo: async () => {
    const { data } = await api.get<User>('/user');
    return data;
  },
  updateUser: async (updatedUser: Partial<User>) => {
    const { data } = await api.put<AuthResponse>('/user', {
      ...updatedUser,
    });
    return data;
  },
};
