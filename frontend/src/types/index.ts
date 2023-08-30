export type User = {
  id: string;
  email: string;
  password: string;
};

export type UserDTO = Pick<User, 'email' | 'password'>;
