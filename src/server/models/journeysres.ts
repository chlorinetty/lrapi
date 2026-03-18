/* server/models/journeysres.ts
 * lrapi
 * akseli@awrinne.fi
 */

export interface JourneysResponse {
  id: number;
  trainid: number;
  departure: string;
  arrival: string;
  depart: string;
  arrive: string;
}
