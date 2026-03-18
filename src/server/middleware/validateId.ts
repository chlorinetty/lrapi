/* server/middleware/validateId.ts
 * lrapi
 * akseli@awrinne.fi
 */

import { type Request, type Response, type NextFunction } from "express";

export const validateId =
  (param: string, min: number = 1, max: number = 2147483647) =>
  (req: Request, res: Response, next: NextFunction) => {
    const raw: string | undefined = Array.isArray(req.params[param])
      ? req.params[param][0]
      : req.params[param];

    if (!raw) {
      res.status(400).json({ message: `missing parameter: ${param}` });
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
