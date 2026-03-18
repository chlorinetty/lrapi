/* train.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface ITrain {
  TrainID: number;
  TrainName: string;
}

export class Train {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllTrains = async (): Promise<ITrain[]> => {
    return this.db.Query<ITrain>("SELECT TrainID, TrainName FROM Train;");
  };

  public GetTrain = async (id: number): Promise<ITrain | null> => {
    const result = await this.db.Query<ITrain>(
      "SELECT TrainID, TrainName FROM Train WHERE TrainID = @TrainID;",
      [{ Parameter: "TrainID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
