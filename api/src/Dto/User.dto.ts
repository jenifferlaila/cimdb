export type UserRoleDTO = {
  id: number;
  value: string;
};

export type UserLoginCredentialsDTO = {
  email: string;
  password: string;
};

export type UserDTO = UserLoginCredentialsDTO & {
  id: number;
  role: number;
  name: string;
  username: string;
  avatar?: string | null;
};

export type PublicUserDTO = Omit<UserDTO, "password">;

export type UserCreateDTO = Omit<UserDTO, "id">;

export type UserUpdateDTO = Partial<UserCreateDTO>;

export type UserLoginResponseDTO = PublicUserDTO & {
  token: string;
};
