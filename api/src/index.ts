import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { AuthController, MovieController, UserController } from "./Controllers";
import { syncDatabase } from "./Database";
import { PORT } from "./Contants";
import { AuthService, MovieService, UserService } from "./Services";

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Services
  const authService = new AuthService();
  const movieService = new MovieService();
  const userService = new UserService(authService);

  // Controllers
  const authController = new AuthController(authService);
  const movieController = new MovieController(authService, movieService);
  const userController = new UserController(authService, userService);

  app.use("/auth", authController.getRouter());
  app.use("/user", userController.getRouter());
  app.use("/movie", movieController.getRouter());

  app.use(express.static("openapi"));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );

  await syncDatabase();
  app.listen(PORT, () => {
    console.log(`[server] Listening to port ${PORT}`);
  });
}

main();
