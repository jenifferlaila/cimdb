import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../Database";
import {
  PublicUserDTO,
  UserLoginCredentialsDTO,
  UserLoginResponseDTO,
} from "../Dto";
import { BEARER, JWT_EXPIRATION, JWT_SECRET, R_CODES } from "../Contants";
import { NextFunction, Request, RequestHandler, Response } from "express";

export class AuthService {
  async login(
    { email, password }: UserLoginCredentialsDTO,
    bypassHash?: boolean
  ): Promise<UserLoginResponseDTO | number> {
    const user = await this.getUserByEmail(email);

    if (!user) return R_CODES.NOT_FOUND;
    const { dataValues } = user;

    let ok = bypassHash
      ? password === dataValues.password
      : await compare(password, dataValues.password);

    if (!ok) return R_CODES.UNAUTHORIZED;

    const { password: _, ...data } = dataValues;

    const token = jwt.sign({ user: data as PublicUserDTO }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return { ...dataValues, token };
  }

  async auth(payload: string) {
    const token = payload.replace(`${BEARER} `, "");
    if (!token || token.length === payload.length) return R_CODES.BAD_REQUEST;

    const contents = jwt.verify(token, JWT_SECRET);
    if (typeof contents === "string" || !contents.user)
      return R_CODES.BAD_REQUEST;

    const { id } = contents.user as PublicUserDTO;
    const candidate = await User.findOne({ where: { id } });
    if (!candidate) return R_CODES.NOT_FOUND;

    const { password: _, ...data } = candidate.dataValues;
    const user = data as PublicUserDTO;

    return user;
  }

  async getUser({ id }: PublicUserDTO) {
    const candidate = await User.findOne({ where: { id } });
    if (!candidate) return R_CODES.NOT_FOUND;

    return { ...candidate.dataValues, password: "" };
  }

  /**
   * Returns a middleware for routes that require auth
   */
  getTokenVerification() {
    return async (
      req: Request<unknown, unknown, Record<string, unknown>>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { authorization } = req.headers;
        if (!authorization) return res.sendStatus(400);

        const user = await this.auth(authorization);
        if (!user) return res.sendStatus(401);

        req.body.userData = user;
        return next();
      } catch (_) {
        res.sendStatus(400);
      }
    };
  }

  private async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
}
