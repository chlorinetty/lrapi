/* server/routes/items.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import type { Config } from "../../config/iconfig.js";

import { Router } from "express";
import { validateId } from "../middleware/validateId.js";

import { ItemsController } from "../controllers/itemsctrl.js";
import type { Items } from "../../lr/items.js";

export class ItemsRoutes {
  private readonly config: Config;

  private readonly router: Router;

  private readonly repo: Items;
  private readonly ctrl: ItemsController;

  constructor(config: Config, repo: Items) {
    this.config = config;

    this.repo = repo;
    this.router = Router();
    this.ctrl = new ItemsController(this.config, this.repo);

    this.router.get("/", this.ctrl.getAllItems);
    this.router.get("/:id", validateId("id"), this.ctrl.getItemById);
  }

  public get Router() {
    return this.router;
  }
}
