import { DataTypes } from "sequelize";
import { sequelize } from "./config";
import { Model } from "sequelize-typescript";
import { UserDTO, UserRoleDTO } from "../Dto";

export const UserRole = sequelize.define<Model<UserRoleDTO>>(
  "UserRole",
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    value: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true }
);

// User
export const User = sequelize.define<Model<UserDTO>>(
  "User",
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
    username: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    avatar: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    role: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: UserRole,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// todo: Movie art and screenshots
