import { DataTypes } from "sequelize";
import { sequelize } from "./config";
import { User } from "./User.model";
import { Model } from "sequelize-typescript";
import {
  ActorDTO,
  MovieCreateDTO,
  MovieDTO,
  MovieUpdateDTO,
  RoleDTO,
  UserRatingCreateDTO,
  UserRatingDTO,
  UserRatingUpdateDTO,
} from "../Dto";

// Movie
export const Movie = sequelize.define<
  Model<MovieDTO, MovieUpdateDTO>,
  MovieDTO
>(
  "Movie",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    director: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    release_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rating_count: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

// Actor/actress
export const Actor = sequelize.define<Model<ActorDTO>>(
  "Actor",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    headshot: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true }
);

// Role -> Actor/actress in a movie
export const Role = sequelize.define<Model<RoleDTO>>("Role", {
  id: {
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  actor: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: "id",
      model: Actor,
    },
  },
  movie: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: "id",
      model: Movie,
    },
  },
});

// Rating
export const UserRating = sequelize.define<
  Model<UserRatingCreateDTO, UserRatingUpdateDTO>,
  UserRatingDTO
>("UserRating", {
  id: {
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  movie: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: "id",
      model: Movie,
    },
  },
  user: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: "id",
      model: User,
    },
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});
