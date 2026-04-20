/* server/routes/categories.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import type { Config } from "../../config/iconfig.js";

import { Router } from "express";
import { validateId } from "../middleware/validateId.js";

import { CategoryController } from "../controllers/categoriesctrl.js";
import type { Categories } from "../../lr/categories.js";
import type { Items } from "../../lr/items.js";

export class CategoryRoutes {
  private readonly config: Config;

  private readonly router: Router;

  private readonly repo: Categories;
  private readonly irepo: Items;
  private readonly ctrl: CategoryController;

  constructor(config: Config, repo: Categories, irepo: Items) {
    this.config = config;

    this.repo = repo;
    this.irepo = irepo;

    this.router = Router();
    this.ctrl = new CategoryController(this.config, this.repo, this.irepo);

    this.router.get("/", this.ctrl.getAllCategories);
    this.router.get("/:id", validateId("id"), this.ctrl.getCategoryById);
    this.router.get(
      "/:id/items",
      validateId("id"),
      this.ctrl.getItemsByCategory,
    );
  }

  public get Router() {
    return this.router;
  }
}
