export type User = {
  id: string;
  email: string;
  photo: string;
  name: string;
  bio: string;
  phone: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type UserDTO = {
  email: string;
  password: string;
};
