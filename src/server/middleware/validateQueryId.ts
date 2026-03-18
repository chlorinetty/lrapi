/* server/middleware/validateQueryId.ts
 * lrapi
 * akseli@awrinne.fi
 */

import { type Request, type Response, type NextFunction } from "express";

export const validateQueryId =
  (param: string, min: number = 1, max: number = 2147483647) =>
  (req: Request, res: Response, next: NextFunction) => {
    const value = req.query[param];

    if (value === undefined) return next(); //? skip validation if not found

    let raw: string | undefined;

    //? crazy type checking omg
    if (typeof value === "string") raw = value;
    else if (Array.isArray(value) && typeof value[0] === "string")
      raw = value[0];
    else raw = undefined;

    if (!raw) {
      res.status(400).json({ message: `invalid parameter: ${param}` });
      return;
    }

    if (Number.isNaN(Number.parseInt(raw))) {
      res.status(400).json({ message: `invalid parameter (NaN): ${param}` });
      return;
    }

    const id: number = Number.parseInt(raw);

    if (id < min || id > max) {
      res.status(400).json({ message: `invalid parameter (OOB): ${param}` });
    }

    (req as any)[param] = id;
    next();
  };
