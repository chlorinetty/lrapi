/* server/controllers/categoriesctrl.ts
 * lrapi
 * akseli@awrinne.fi
 */
import { logi, logw, loge } from "../../logging/log.js";
const tag: string = "server";

import { type Request, type Response } from "express";
import { type CategoriesResponse } from "../models/categoriesres.js";

import { Categories, type ICategory } from "../../lr/categories.js";
import type { IItem, Items } from "../../lr/items.js";
import type { ItemsResponse } from "../models/itemsres.js";

export class CategoryController {
  private readonly repo: Categories;
  private readonly irepo: Items;

  constructor(repo: Categories, irepo: Items) {
    this.repo = repo;
    this.irepo = irepo;
  }

  getAllCategories = async (req: Request, res: Response) => {
    res.json(
      (await this.repo.GetAllCategories()).map(
        (t): CategoriesResponse => ({
          id: t.CategoryID,
          name: t.CategoryName,
        }),
      ),
    );
  };

  getCategoryById = async (req: Request, res: Response) => {
    const repores: ICategory | null = await this.repo.GetCategory(
      (req as any).id,
    );
    if (repores === null) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.json({
      id: repores?.CategoryID,
      name: repores?.CategoryName,
    } as CategoriesResponse);
  };

  getItemsByCategory = async (req: Request, res: Response) => {
    res.json(
      (await this.irepo.GetItemsByCategory((req as any).id)).map(
        (t): ItemsResponse => ({
          id: t.ItemID,
          categoryid: t.CategoryID,
          name: t.ItemName,
          desc: t.ItemDesc,
          img: t.ItemIMG,
          price: t.Price,
        }),
      ),
    );
  };
}
