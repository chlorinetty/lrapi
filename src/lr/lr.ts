/* lr.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import type { DataType } from "tedious/lib/data-type.js";
import { logi, logw, loge } from "../logging/log.js";

import {
  Connection,
  Request,
  TYPES,
  type ConnectionConfiguration,
} from "tedious";

interface IParameter {
  Parameter: string;
  Value: unknown;
  Type: DataType;
}

export class Liikkuvaruoka {
  protected readonly config: ConnectionConfiguration;
  protected readonly connector: Connection;

  constructor(config: ConnectionConfiguration) {
    this.config = config;
    this.connector = new Connection(this.config);
  }

  /**
   * Connect to configured TDS server.
   */
  public async Connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const onConnect = (err?: Error) => {
        cleanup();
        if (err) {
          loge(tag, `TDS Error: ${err.message}`);
          return reject(err);
        }
        logi(tag, `Connected.`);
        resolve();
      };

      const onError = (err: Error) => {
        cleanup();
        loge(tag, `TDS Error: ${err.message}`);
        reject(err);
      };

      const cleanup = () => {
        this.connector.removeListener("connect", onConnect);
        this.connector.removeListener("error", onError);
      };

      this.connector.once("connect", onConnect);
      this.connector.once("error", onError);

      logi(tag, `Connecting to server: ${this.config.server}`);
      this.connector.connect();
    });
  }

  public Close = () => {
    logi(tag, `Closing connection with server: ${this.config.server}`);
    this.connector.closeConnection();
  };

  /**
   * Run an SQL query, and deserialize with given type T.
   * @param sql SQL query.
   * @param params Positional parameters - optional.
   * @returns Array of typed results.
   */
  public Query = <T>(
    sql: string,
    params: IParameter[] | null = null,
  ): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      const rows: T[] = [];

      const request = new Request(sql, (err) => {
        if (err) {
          loge(tag, `TDS Error: ${err.message}`);
          return reject(err);
        }

        resolve(rows);
      });

      //? positional parameter handling
      if (params !== null)
        params.forEach((param: IParameter) => {
          request.addParameter(param.Parameter, param.Type, param.Value);
        });

      request.on("row", (columns) => {
        const row = {} as T;

        //? column passes metadata.colName, and value;
        //? treat every column name as a field of the given interface.
        for (const column of columns) {
          const key = column.metadata.colName as keyof T;
          (row as any)[key] = column.value;
        }

        rows.push(row);
      });

      request.on("error", reject);

      this.connector.execSql(request);
    });
  };
}
