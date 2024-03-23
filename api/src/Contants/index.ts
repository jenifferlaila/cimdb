import { config } from "dotenv";

config();

export const HASH_SALT = process.env.SALT ? parseInt(process.env.SALT) : 10;
export const DB_NAME = process.env.DB_NAME || "database.sqlite";
export const ENV = process.env.ENV || "DEV";
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "24h";
export const BEARER = "Bearer";
export const ADMIN = "ADMIN";
export const USER = "USER";

export const R_CODES = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
};
