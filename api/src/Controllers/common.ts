import { Router } from "express";

export class GenericController {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}
