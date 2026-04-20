/* server.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "server";

import express from "express";
import { type Request, type Response, type NextFunction } from "express";
import { Server as httpserver } from "node:http";
import cors, { type CorsOptions } from "cors";

import { logi, logw, loge } from "../logging/log.js";
import { type Config } from "../config/iconfig.js";
import { Liikkuvaruoka } from "../lr/lr.js";

import { Train, type ITrain } from "../lr/train.js";
import { Categories, type ICategory } from "../lr/categories.js";
import { Items, type IItem } from "../lr/items.js";
import { Journey, type IJourney } from "../lr/journey.js";
import { Ticket, type ITicket } from "../lr/ticket.js";
import { Orders, type IOrder } from "../lr/orders.js";
import { OrderItems, type IOrderItem } from "../lr/orderitems.js";
import { Admins, type IAdmin } from "../lr/admins.js";
import { Delivery, type IDelivery } from "../lr/delivery.js";

import { TrainRoutes } from "./routes/trains.js";
import { CategoryRoutes } from "./routes/categories.js";
import { JourneyRoutes } from "./routes/journeys.js";
import { ItemsRoutes } from "./routes/items.js";

export class Server {
  private readonly config: Config;
  private readonly db: Liikkuvaruoka;

  private readonly trainRepo: Train;
  private readonly categoryRepo: Categories;
  private readonly itemRepo: Items;
  private readonly journeyRepo: Journey;
  private readonly ticketRepo: Ticket;
  private readonly orderRepo: Orders;
  private readonly orderItemRepo: OrderItems;
  private readonly adminRepo: Admins;
  private readonly deliveryRepo: Delivery;

  constructor(config: Config) {
    this.config = config;
    this.db = new Liikkuvaruoka(this.config);

    this.trainRepo = new Train(this.db);
    this.categoryRepo = new Categories(this.db);
    this.itemRepo = new Items(this.db);
    this.journeyRepo = new Journey(this.db);
    this.ticketRepo = new Ticket(this.db);
    this.orderRepo = new Orders(this.db);
    this.orderItemRepo = new OrderItems(this.db);
    this.adminRepo = new Admins(this.db);
    this.deliveryRepo = new Delivery(this.db);
  }

  Serve = async (): Promise<httpserver> => {
    await this.db.Connect();

    const app = express();
    app.use(express.json());

    //? cors
    const corsopt: CorsOptions = {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    app.use(cors(corsopt));
    app.options("*", cors(corsopt));

    app.use(
      "/api/trains",
      new TrainRoutes(this.config, this.trainRepo, this.journeyRepo).Router,
    );
    app.use(
      "/api/journeys",
      new JourneyRoutes(this.config, this.journeyRepo).Router,
    );
    app.use(
      "/api/categories",
      new CategoryRoutes(this.config, this.categoryRepo, this.itemRepo).Router,
    );
    app.use("/api/items", new ItemsRoutes(this.config, this.itemRepo).Router);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({ message: err.message });
    });

    return app.listen(this.config.Serve.Port, () => {
      logi(tag, `Serving at :${this.config.Serve.Port}`);
    });
  };

  KillDatabase = () => this.db.Close();
}
