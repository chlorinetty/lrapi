/* ver.ts
 * lrapi
 * akseli@awrinne.fi
 */

export const Version: VersionInformation = {
  name: "lrapi",
  version: "0.1.0",
  author: "Akseli Rinne<akseli@awrinne.fi>",
  license: "Apache-2.0",
};

interface VersionInformation {
  name: string;
  version: string;
  author: string;
  license: string;
}
