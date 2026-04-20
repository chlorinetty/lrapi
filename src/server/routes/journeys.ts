/* server/routes/journeys.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import type { Config } from "../../config/iconfig.js";

import { Router } from "express";
import { validateId } from "../middleware/validateId.js";
import { validateQueryId } from "../middleware/validateQueryId.js";

import { JourneyController } from "../controllers/journeysctrl.js";
import type { Journey } from "../../lr/journey.js";

export class JourneyRoutes {
  private readonly config: Config;

  private readonly router: Router;

  private readonly repo: Journey;
  private readonly ctrl: JourneyController;

  constructor(config: Config, repo: Journey) {
    this.config = config;

    this.repo = repo;
    this.router = Router();
    this.ctrl = new JourneyController(this.config, this.repo);

    this.router.get(
      "/",
      validateQueryId("trainid"),
      this.ctrl.getAllJourneysOrByTrain,
    );
    this.router.get("/:id", validateId("id"), this.ctrl.getJourneyById);
  }

  public get Router() {
    return this.router;
  }
}
