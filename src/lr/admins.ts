/* admins.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { randomBytes } from "crypto";
import { TYPES } from "tedious";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";

import { type Config } from "../config/iconfig.js";

export interface IAdmin {
  AdminID: number;
  TrainID: number;
  Username: string;
  PasswordHash: string;
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
        Username,
        PasswordHash
      FROM 
        Admins;`,
    );
  };

  public GetAdmin = async (id: number): Promise<IAdmin | null> => {
    const result = await this.db.Query<IAdmin>(
      `SELECT 
        AdminID,
        TrainID,
        Username,
        PasswordHash
      FROM 
        Admins
      WHERE
        AdminID = @AdminID;`,
      [{ Parameter: "AdminID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };

  public GetAdminByUsername = async (
    username: string,
  ): Promise<IAdmin | null> => {
    const result = await this.db.Query<IAdmin>(
      `SELECT
        AdminID,
        TrainId,
        Username,
        PasswordHash
      FROM
        Admins
      WHERE
        Username = @Username;`,
      [{ Parameter: "Username", Type: TYPES.Int, Value: username }],
    );

    return result[0] ?? null;
  };
}
