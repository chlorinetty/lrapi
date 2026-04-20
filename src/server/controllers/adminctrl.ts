/* server/controllers/adminctrl.ts
 * lrapi
 * akseli@awrinne.fi
 */
import { logi, logw, loge } from "../../logging/log.js";
const tag: string = "server";

import { compare } from "bcrypt";
import { type Request, type Response } from "express";

import type { Config } from "../../config/iconfig.js";

import { type ErrorModel, ErrorCode } from "../models/errorres.js";

import { Admins, type IAdmin } from "../../lr/admins.js";

export class AdminController {
  private readonly config: Config;
  private readonly repo: Admins;

  constructor(config: Config, repo: Admins) {
    this.config = config;
    this.repo = repo;
  }

  login = async (req: Request, res: Response) => {
    const sendError = (code: ErrorCode, message: string, status: number) =>
      res.status(status).json({
        error: {
          code: ErrorCode[code],
          message,
        },
      } as ErrorModel);

    if (
      typeof req.body !== "object" ||
      req.body === null ||
      typeof req.body.username !== "string" ||
      typeof req.body.password !== "string"
    )
      return sendError(
        ErrorCode.AUTHORIZATION_MALFORMED_CREDENTIALS,
        "Both username and password must be provided as text.",
        400,
      );
  };
}
