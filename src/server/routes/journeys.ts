/* server/routes/journeys.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import { Router } from "express";
import { validateId } from "../middleware/validateId.js";
import { validateQueryId } from "../middleware/validateQueryId.js";

import { JourneyController } from "../controllers/journeysctrl.js";
import type { Journey } from "../../lr/journey.js";

export class JourneyRoutes {
  public readonly router: Router;

  private readonly repo: Journey;
  private readonly ctrl: JourneyController;

  constructor(repo: Journey) {
    this.repo = repo;
    this.router = Router();
    this.ctrl = new JourneyController(this.repo);

    this.router.get(
      "/",
      validateQueryId("trainid"),
      this.ctrl.getAllJourneysOrByTrain,
    );
    this.router.get("/:id", validateId("id"), this.ctrl.getJourneyById);
  }
}
