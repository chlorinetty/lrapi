/* main.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "main";

import { exit } from "node:process";
import { readFileSync } from "node:fs";

import { Version } from "./ver.js";
import { logi, logw, loge } from "./logging/log.js";
import { Configuration } from "./config/config.js";

import { Server } from "./server/server.js";

import { PrintAll } from "./debug/printAll.js";

const main = async (): Promise<void> => {
  logi(tag, `${Version.name} ${Version.version}`);
  logi(tag, `${Version.author} | ${Version.license}`);

  const config = new Configuration().Parse();
  if (config === null) process.exit(1);

  //! debug
  //!await new PrintAll(config).printJSON();
  //! end debug

  const serverhandle = new Server(config);
  const server = await serverhandle.Serve();

  process.on("SIGINT", () => {
    logw(tag, "SIGINT recieved - sinking!");

    logi(tag, "Sinking server...");
    server.close();

    logi(tag, "Sinking database...");
    serverhandle.KillDatabase();

    logi(tag, "Sank!");
    process.exit(0);
  });
};

await main();
