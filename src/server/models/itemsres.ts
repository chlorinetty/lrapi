/* server/models/itemsres.ts
 * lrapi
 * akseli@awrinne.fi
 */

export interface ItemsResponse {
  id: number;
  categoryid: number;
  name: string;
  desc: string;
  img: string;
  price: number;
}
