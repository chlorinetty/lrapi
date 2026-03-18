/* orders.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IOrder {
  OrderID: number;
  TicketID: number;
  OrderedAt: Date;
}

export class Orders {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllOrders = async (): Promise<IOrder[]> => {
    return this.db.Query<IOrder>(
      `SELECT 
        OrderID,
        TicketID,
        OrderedAt
      FROM 
        Orders;`,
    );
  };

  public GetOrder = async (id: number): Promise<IOrder | null> => {
    const result = await this.db.Query<IOrder>(
      `SELECT 
        OrderID,
        TicketID,
        OrderedAt
      FROM 
        Orders
      WHERE
        OrderID = @OrderID;`,
      [{ Parameter: "OrderID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
