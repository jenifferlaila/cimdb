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

export type MovieDTO = {
  id: number;
  title: string;
  rating: number;
  director: string;
  release_date: Date;
  rating_count: number;
  description?: string | null;
};

export type MovieCreateDTO = Omit<MovieDTO, "id">;

export type MovieUpdateDTO = Partial<MovieDTO>;

export type UserRatingDTO = {
  id: number;
  user: number;
  movie: number;
  rating: number;
};

export type UserRatingCreateDTO = Omit<UserRatingDTO, "id">;

export type UserRatingUpdateDTO = Partial<UserRatingDTO>;

export type ActorDTO = {
  id: number;
  name: string;
  birthday: Date;
  headshot?: string | null;
};

export type ActorCreateDTO = Omit<ActorDTO, "id">;

export type ActorUpdateDTO = Partial<ActorDTO>;

export type RoleDTO = {
  id: number;
  actor: number;
  movie: number;
};

export type RoleCreateDTO = Omit<RoleDTO, "id">;

export type RoleUpdateDTO = Partial<RoleDTO>;
