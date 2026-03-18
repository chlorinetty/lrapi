/* orderitems.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IOrderItem {
  OrderItemsID: number;
  OrderID: number;
  ItemID: number;
  Quantity: number;
  Price: number;
}

export class OrderItems {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllOrderItems = async (): Promise<IOrderItem[]> => {
    return this.db.Query<IOrderItem>(
      `SELECT 
        OrderItemsID,
        OrderID,
        ItemID,
        Quantity,
        Price
      FROM 
        OrderItems;`,
    );
  };

  public GetOrderItem = async (id: number): Promise<IOrderItem | null> => {
    const result = await this.db.Query<IOrderItem>(
      `SELECT 
        OrderItemsID,
        OrderID,
        ItemID,
        Quantity,
        Price
      FROM 
        OrderItems
      WHERE
        OrderItemsID = @OrderItemsID;`,
      [{ Parameter: "OrderItemsID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
