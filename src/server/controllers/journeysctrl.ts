/* server/controllers/journeysctrl.ts
 * lrapi
 * akseli@awrinne.fi
 */
import { logi, logw, loge } from "../../logging/log.js";
const tag: string = "server";

import { type Request, type Response } from "express";

import { Journey, type IJourney } from "../../lr/journey.js";
import type { JourneysResponse } from "../models/journeysres.js";

export class JourneyController {
  private readonly repo: Journey;

  constructor(repo: Journey) {
    this.repo = repo;
  }

  getAllJourneysOrByTrain = async (req: Request, res: Response) => {
    //? if trainid specified
    if ((req as any).trainid !== undefined) {
      const repores: IJourney[] = await this.repo.GetJourneysByTrain(
        (req as any).trainid,
      );

      res.json(
        repores.map(
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
      return;
    }

    res.json(
      (await this.repo.GetAllJourneys()).map(
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

  getJourneyById = async (req: Request, res: Response) => {
    const repores: IJourney | null = await this.repo.GetJourney(
      (req as any).id,
    );
    if (repores === null) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.json({
      id: repores?.JourneyID,
      trainid: repores?.TrainID,
      departure: repores?.Departure.toISOString(),
      arrival: repores?.Arrival.toISOString(),
      depart: repores?.DepartFrom,
      arrive: repores?.ArriveTo,
    } as JourneysResponse);
  };
}
