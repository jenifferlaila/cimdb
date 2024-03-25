import { Request, Response, Router } from "express";
import { GenericController } from "./common";
import { AuthService, UserService } from "../Services";
import { PublicUserDTO, UserCreateDTO, UserUpdateDTO } from "../Dto";
import { R_CODES } from "../Contants";

export class UserController extends GenericController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super();

    this.setup();
  }

  private setup() {
    this.router.post(
      "/signup",
      async (req: Request<unknown, string, UserCreateDTO>, res: Response) => {
        try {
          const result = await this.userService.create(req.body);
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
          UserUpdateDTO & { userData: PublicUserDTO }
        >,
        res: Response
      ) => {
        try {
          const { userData, ...update } = req.body;
          const data = update as UserUpdateDTO;

          const result = await this.userService.update(userData, data);
          if (typeof result === "number") return res.sendStatus(result);

          res.send(result);
        } catch (_) {
          res.sendStatus(401);
        }
      }
    );

    this.router.get("/:id/role", async (req, res) => {
      try {
        const { id } = req.params;
        const asNum = parseInt(id);

        if (isNaN(asNum)) throw new Error();

        const role = await this.userService.getRoleByUser(asNum);
        if (typeof role === "number") return res.sendStatus(role);

        res.send(role);
      } catch (_) {
        res.sendStatus(R_CODES.BAD_REQUEST);
      }
    });
  }
}
