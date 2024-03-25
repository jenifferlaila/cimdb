import { Route } from "tsoa";

import {
  PublicUserDTO,
  UserDTO,
  UserLoginCredentialsDTO,
  UserLoginResponseDTO,
} from "../Dto";
import { AuthService } from "../Services";
import { GenericController } from "./common";

@Route("auth")
export class AuthController extends GenericController {
  constructor(private readonly authService: AuthService) {
    super();

    this.authService = authService;
    this.setup();
  }

  private setup() {
    this.router.post<null, UserLoginResponseDTO, UserLoginCredentialsDTO>(
      "/login",
      async (req, res) => {
        try {
          const user = req.body;
          const data = await this.authService.login(user);

          if (typeof data === "number") return res.sendStatus(data);

          res.send(data);
        } catch (_) {
          res.sendStatus(400);
        }
      }
    );

    this.router.post<null, PublicUserDTO, UserLoginCredentialsDTO>(
      "/auth",
      async (req, res) => {
        try {
          const { authorization } = req.headers;

          if (!authorization) return res.sendStatus(400);

          const user = await this.authService.auth(authorization);
          if (typeof user === "number") return res.sendStatus(user);

          res.send(user);
        } catch (_) {
          res.sendStatus(400);
        }
      }
    );

    this.router.post<unknown, unknown, { userData: PublicUserDTO }>(
      "/",
      this.authService.getTokenVerification(),
      async (req, res) => {
        try {
          const { userData } = req.body;

          const user = await this.authService.getUser(userData);
          if (typeof user === "number") return res.sendStatus(user);

          res.send(user);
        } catch (_) {
          res.sendStatus(400);
        }
      }
    );
  }
}
