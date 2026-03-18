/* iconfig.ts
 * lrapi
 * akseli@awrinne.fi
 */

interface TDS {
  Server: string;
  Port: number;

  Username: string;
  Password: string;

  Database: string;
}

interface Serve {
  Port: number;
}

export interface Config {
  TDS: TDS;
  Serve: Serve;
}
