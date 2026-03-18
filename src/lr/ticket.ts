/* ticket.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "lr";

import { Liikkuvaruoka } from "./lr.js";
import { logi, logw, loge } from "../logging/log.js";
import { TYPES } from "tedious";

export interface ITicket {
  TicketID: number;
  TicketSerial: string;
  JourneyID: number;
  Carriage: string;
  Seat: string;
}

export class Ticket {
  private db: Liikkuvaruoka;

  constructor(database: Liikkuvaruoka) {
    this.db = database;
  }

  public GetAllTickets = async (): Promise<ITicket[]> => {
    return this.db.Query<ITicket>(
      `SELECT 
        TicketID,
        TicketSerial,
        JourneyID,
        Carriage,
        Seat
      FROM 
        Ticket;`,
    );
  };

  public GetTicket = async (id: number): Promise<ITicket | null> => {
    const result = await this.db.Query<ITicket>(
      `SELECT 
        TicketID,
        TicketSerial,
        JourneyID,
        Carriage,
        Seat
      FROM 
        Ticket
      WHERE
        TicketID = @TicketID;`,
      [{ Parameter: "TicketID", Type: TYPES.Int, Value: id }],
    );

    return result[0] ?? null;
  };

  public GetTicketsByJourney = async (
    journeyid: number,
  ): Promise<ITicket[]> => {
    return this.db.Query<ITicket>(
      `SELECT 
        TicketID,
        TicketSerial,
        JourneyID,
        Carriage,
        Seat
      FROM 
        Ticket
      WHERE
        JourneyID = @JourneyID;`,
      [{ Parameter: "JourneyID", Type: TYPES.Int, Value: journeyid }],
    );
  };
}
