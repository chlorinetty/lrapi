/* items.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface IItem {
  ItemID: number;
  CategoryID: number;
  ItemName: string;
  ItemDesc: string;
  ItemIMG: string;
  Price: number;
}

export class Items {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllItems = async (): Promise<IItem[]> => {
    return this.db.Query<IItem>(
      `SELECT 
        ItemID,
        CategoryID,
        ItemName,
        ItemDesc,
        ItemIMG,
        Price
      FROM 
        Items;`,
    );
  };

  public GetItem = async (id: number): Promise<IItem | null> => {
    const result = await this.db.Query<IItem>(
      `SELECT 
        ItemID,
        CategoryID,
        ItemName,
        ItemDesc,
        ItemIMG,
        Price
      FROM 
        Items
      WHERE
        ItemID = @ItemID;`,
      [{ Parameter: "ItemID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };

  public GetItemsByCategory = async (id: number): Promise<IItem[]> => {
    return await this.db.Query<IItem>(
      `SELECT 
        ItemID,
        CategoryID,
        ItemName,
        ItemDesc,
        ItemIMG,
        Price
      FROM 
        Items
      WHERE
        CategoryID = @CategoryID`,
      [{ Parameter: "CategoryID", Type: TYPES.Int, Value: id }],
    );
  };
}
