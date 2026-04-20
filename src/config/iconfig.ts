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

interface Serve_Authentication {
  TokenExpirySec: 1800;
}

interface Serve {
  Port: number;
  Authentication: Serve_Authentication;
}

export interface Config {
  TDS: TDS;
  Serve: Serve;
}
