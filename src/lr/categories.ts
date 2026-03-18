/* categories.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface ICategory {
  CategoryID: number;
  CategoryName: string;
}

export class Categories {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllCategories = async (): Promise<ICategory[]> => {
    return this.db.Query<ICategory>(
      `SELECT 
        CategoryID,
        CategoryName
      FROM 
        Categories;`,
    );
  };

  public GetCategory = async (id: number): Promise<ICategory | null> => {
    const result = await this.db.Query<ICategory>(
      `SELECT 
        CategoryID,
        CategoryName
      FROM 
        Categories
      WHERE
        CategoryID = @CategoryID;`,
      [{ Parameter: "CategoryID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };
}
