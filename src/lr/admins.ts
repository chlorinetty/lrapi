/* admins.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IAdmin {
  AdminID: number;
  TrainID: number;
  FuckYou: string;
}

export class Admins {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllAdmins = async (): Promise<IAdmin[]> => {
    return this.db.Query<IAdmin>(
      `SELECT 
        AdminID,
        TrainID,
        FuckYou
      FROM 
        Admins;`,
    );
  };

  public GetAdmin = async (id: number): Promise<IAdmin | null> => {
    const result = await this.db.Query<IAdmin>(
      `SELECT 
        AdminID,
        TrainID,
        FuckYou
      FROM 
        Admins;
      WHERE
        AdminID = @AdminID;`,
      [{ Parameter: "AdminID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
