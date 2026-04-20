/* server/routes/trains.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import type { Config } from "../../config/iconfig.js";

import { Router } from "express";
import { validateId } from "../middleware/validateId.js";

import { TrainController } from "../controllers/trainsctrl.js";
import type { Train } from "../../lr/train.js";
import type { Journey } from "../../lr/journey.js";

export class TrainRoutes {
  public readonly config: Config;

  private readonly router: Router;

  private readonly repo: Train;
  private readonly jrepo: Journey;

  private readonly ctrl: TrainController;

  constructor(config: Config, repo: Train, jrepo: Journey) {
    this.config = config;

    this.repo = repo;
    this.jrepo = jrepo;

    this.router = Router();
    this.ctrl = new TrainController(this.config, this.repo, this.jrepo);

    this.router.get("/", this.ctrl.getAllTrains);
    this.router.get("/:id", validateId("id"), this.ctrl.getTrainById);
    this.router.get(
      "/:id/journeys",
      validateId("id"),
      this.ctrl.getJourneysByTrain,
    );
  }

  public get Router() {
    return this.router;
  }
}
