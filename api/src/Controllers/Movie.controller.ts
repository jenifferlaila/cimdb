import { Request, Response } from "express";

import {
  MovieCreateDTO,
  MovieUpdateDTO,
  PublicUserDTO,
  UserRatingCreateDTO,
} from "../Dto";
import { AuthService, MovieService } from "../Services";
import { GenericController } from "./common";
import { R_CODES } from "../Contants";

export class MovieController extends GenericController {
  constructor(
    private readonly authService: AuthService,
    private readonly movieService: MovieService
  ) {
    super();
    this.setup();
  }

  private setup() {
    this.router.post(
      "/create",
      this.authService.getTokenVerification(),
      async (
        req: Request<
          unknown,
          string,
          MovieCreateDTO & { userData: PublicUserDTO }
        >,
        res: Response
      ) => {
        try {
          const { userData, ...data } = req.body;
          const movie = data as MovieCreateDTO;

          const result = await this.movieService.create(userData, movie);

          if (typeof result === "number") return res.sendStatus(result);

          res.send(result);
        } catch (_) {
          res.sendStatus(400);
        }
      }
    );

    this.router.post(
      "/update",
      this.authService.getTokenVerification(),
      async (
        req: Request<
          unknown,
          string,
          MovieUpdateDTO & { userData: PublicUserDTO }
        >,
        res: Response
      ) => {
        try {
          const { userData, ...update } = req.body;
          const data = update as MovieUpdateDTO;

          const result = await this.movieService.update(userData, data);
          if (typeof result === "number") return res.sendStatus(result);

          res.send(result);
        } catch (_) {
          res.sendStatus(401);
        }
      }
    );

    this.router.patch(
      "/rate",
      this.authService.getTokenVerification(),
      async (
        req: Request<
          unknown,
          string,
          UserRatingCreateDTO & { userData: PublicUserDTO }
        >,
        res: Response
      ) => {
        try {
          const { userData, ...rating } = req.body;

          const result = await this.movieService.rate(userData, rating);
          if (typeof result === "number") return res.sendStatus(result);

          res.sendStatus(200);
        } catch (_) {
          res.sendStatus(R_CODES.BAD_REQUEST);
        }
      }
    );

    this.router.get("/", async (_, res) => {
      const movies = await this.movieService.getAll();

      res.send(movies.map(({ dataValues }) => dataValues));
    });
  }
}
