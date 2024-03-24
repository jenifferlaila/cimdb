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
