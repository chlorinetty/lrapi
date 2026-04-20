/* server/controllers/trainsctrl.ts
 * lrapi
 * akseli@awrinne.fi
 */
import { logi, logw, loge } from "../../logging/log.js";
const tag: string = "server";

import { type Request, type Response } from "express";

import type { Config } from "../../config/iconfig.js";

import { Train, type ITrain } from "../../lr/train.js";
import { type TrainsResponse } from "../models/trainsres.js";

import { Journey, type IJourney } from "../../lr/journey.js";
import { type JourneysResponse } from "../models/journeysres.js";

export class TrainController {
  private readonly config: Config;
  private readonly repo: Train;
  private readonly jrepo: Journey;

  constructor(config: Config, repo: Train, jrepo: Journey) {
    this.config = config;
    this.repo = repo;
    this.jrepo = jrepo;
  }

  getAllTrains = async (req: Request, res: Response) => {
    res.json(
      (await this.repo.GetAllTrains()).map(
        (t): TrainsResponse => ({
          id: t.TrainID,
          name: t.TrainName,
        }),
      ),
    );
  };

  getTrainById = async (req: Request, res: Response) => {
    const repores: ITrain | null = await this.repo.GetTrain((req as any).id);
    if (repores === null) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.json({
      id: repores?.TrainID,
      name: repores?.TrainName,
    } as TrainsResponse);
  };

  getJourneysByTrain = async (req: Request, res: Response) => {
    res.json(
      (await this.jrepo.GetJourneysByTrain((req as any).id)).map(
        (t): JourneysResponse => ({
          id: t.JourneyID,
          trainid: t.TrainID,
          departure: t.Departure.toISOString(),
          arrival: t.Arrival.toISOString(),
          depart: t.DepartFrom,
          arrive: t.ArriveTo,
        }),
      ),
    );
  };
}
