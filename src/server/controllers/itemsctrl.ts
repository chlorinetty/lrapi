/* server/controllers/itemsctrl.ts
 * lrapi
 * akseli@awrinne.fi
 */
import { logi, logw, loge } from "../../logging/log.js";
const tag: string = "server";

import { type Request, type Response } from "express";
import { type ItemsResponse } from "../models/itemsres.js";

import { Items, type IItem } from "../../lr/items.js";

export class ItemsController {
  private readonly repo: Items;

  constructor(repo: Items) {
    this.repo = repo;
  }

  getAllItems = async (req: Request, res: Response) => {
    res.json(
      (await this.repo.GetAllItems()).map(
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

  getItemById = async (req: Request, res: Response) => {
    const repores: IItem | null = await this.repo.GetItem((req as any).id);
    if (repores === null) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.json({
      id: repores.ItemID,
      categoryid: repores.CategoryID,
      name: repores.ItemName,
      desc: repores.ItemDesc,
      img: repores.ItemIMG,
      price: repores.Price,
    } as ItemsResponse);
  };
}
