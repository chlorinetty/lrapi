/* delivery.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IDelivery {
  DeliveryID: number;
  OrderID: number;
  TrainID: number;
  Carriage: string;
  Seat: string;
  Status: string;
}

export class Delivery {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllDeliveries = async (): Promise<IDelivery[]> => {
    return this.db.Query<IDelivery>(
      `SELECT 
        DeliveryID,
        OrderID,
        TrainID,
        Carriage,
        Seat,
        OrderStatus
      FROM 
        Delivery;`,
    );
  };

  public GetDelivery = async (id: number): Promise<IDelivery | null> => {
    const result = await this.db.Query<IDelivery>(
      `SELECT 
        DeliveryID,
        OrderID,
        TrainID,
        Carriage,
        Seat,
        OrderStatus
      FROM 
        Delivery
      WHERE
        DeliveryID = @DeliveryID;`,
      [{ Parameter: "DeliveryID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
