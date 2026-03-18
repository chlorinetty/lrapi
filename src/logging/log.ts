import chalk from "chalk";

const now = (): string => `${new Date().toLocaleString()}`;

/**
 * Print info
 * @param tag Tag of the origin
 * @param data Output
 */
export const logi = (tag: string, data: string): void => {
  console.log(
    chalk.blue("i ") +
      chalk.white(`[${now()}] `) +
      chalk.white(`${tag}: ${data}`),
  );
};

/**
 * Print warning
 * @param tag Tag of the origin
 * @param data Output
 */
export const logw = (tag: string, data: string): void => {
  console.warn(
    chalk.yellow("w ") +
      chalk.white(`[${now()}] `) +
      chalk.white(`${tag}: ${data}`),
  );
};

/**
 * Print error
 * @param tag Tag of the origin
 * @param data Output
 */
export const loge = (tag: string, data: string): void => {
  console.error(
    chalk.red("e ") +
      chalk.white(`[${now()}] `) +
      chalk.white(`${tag}: ${data}`),
  );
};
