/* config.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "config";

import { existsSync, readFile, readFileSync } from "node:fs";
import path from "node:path";
import os from "os";

import { logi, logw, loge } from "../logging/log.js";
import { Version } from "../ver.js";

import type { Config } from "./iconfig.js";

export class Configuration {
  private path: string;

  constructor() {
    this.path = path.join(os.homedir(), Version.name, `${Version.name}.json`);
    logi(tag, `Using configuration path: ${this.path}`);
  }

  public Parse = (): Config | null => {
    if (!existsSync(this.path)) {
      loge(tag, `Configuration file was not found.`);
      return null;
    }

    return JSON.parse(
      readFileSync(this.path, { encoding: "utf-8", flag: "r" }).toString(),
    );
  };
}
