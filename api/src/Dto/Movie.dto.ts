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
