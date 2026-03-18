/* journey.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IJourney {
  JourneyID: number;
  TrainID: number;
  Departure: Date;
  Arrival: Date;
  DepartFrom: string;
  ArriveTo: string;
}

export class Journey {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllJourneys = async (): Promise<IJourney[]> => {
    return this.db.Query<IJourney>(
      `SELECT 
        JourneyID, 
        TrainID, 
        Departure, 
        Arrival, 
        DepartFrom, 
        ArriveTo 
      FROM 
        Journey;`,
    );
  };

  public GetJourney = async (id: number): Promise<IJourney | null> => {
    const result = await this.db.Query<IJourney>(
      `SELECT 
        JourneyID, 
        TrainID,
        Departure, 
        Arrival, 
        DepartFrom, 
        ArriveTo 
      FROM 
        Journey
      WHERE
        JourneyID = @JourneyID;`,
      [{ Parameter: "JourneyID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };

  public GetJourneysByTrain = async (trainid: number): Promise<IJourney[]> => {
    return this.db.Query<IJourney>(
      `SELECT 
        JourneyID, 
        TrainID, 
        Departure, 
        Arrival, 
        DepartFrom, 
        ArriveTo 
      FROM 
        Journey
      WHERE
        TrainID = @TrainID`,
      [{ Parameter: "TrainID", Type: TYPES.Int, Value: trainid }],
    );
  };
}
