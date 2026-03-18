/* printAll.ts
 * lrapi
 * akseli@awrinne.fi
 */
const tag: string = "dbg/printAll";

import { writeFileSync } from "node:fs";

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

export class PrintAll {
  private readonly config: Config;

  private readonly lr: Liikkuvaruoka;

  private readonly trainRepo: Train;
  private readonly journeyRepo: Journey;
  private readonly ticketRepo: Ticket;
  private readonly orderRepo: Orders;
  private readonly orderItemsRepo: OrderItems;

  private readonly categoryRepo: Categories;
  private readonly itemRepo: Items;

  private readonly deliveryRepo: Delivery;

  private readonly adminRepo: Admins;

  constructor(config: Config) {
    this.config = config;

    this.lr = new Liikkuvaruoka({
      server: this.config.TDS.Server,
      options: {
        port: this.config.TDS.Port,
        database: this.config.TDS.Database,
        encrypt: false,
      },
      authentication: {
        options: {
          userName: this.config.TDS.Username,
          password: this.config.TDS.Password,
        },
        type: "default",
      },
    });

    this.trainRepo = new Train(this.lr);
    this.adminRepo = new Admins(this.lr);
    this.journeyRepo = new Journey(this.lr);
    this.ticketRepo = new Ticket(this.lr);
    this.orderRepo = new Orders(this.lr);
    this.orderItemsRepo = new OrderItems(this.lr);

    this.deliveryRepo = new Delivery(this.lr);

    this.categoryRepo = new Categories(this.lr);
    this.itemRepo = new Items(this.lr);
  }

  public printJSON = async () => {
    let output: any = {};

    //? connect to db
    logi(tag, "Connecting to database...");
    await this.lr.Connect();
    logi(tag, "Connected.");

    //* get data
    logi(tag, "Getting trains...");
    const trains = await this.trainRepo.GetAllTrains();

    logi(tag, "Getting admins...");
    const admins = await this.adminRepo.GetAllAdmins();

    logi(tag, "Getting journeys...");
    const journeys = await this.journeyRepo.GetAllJourneys();

    logi(tag, "Getting tickets...");
    const tickets = await this.ticketRepo.GetAllTickets();

    logi(tag, "Getting orders...");
    const orders = await this.orderRepo.GetAllOrders();

    logi(tag, "Getting order-items...");
    const orderItems = await this.orderItemsRepo.GetAllOrderItems();

    logi(tag, "Getting deliveries...");
    const deliveries = await this.deliveryRepo.GetAllDeliveries();

    logi(tag, "Getting categories...");
    const categories = await this.categoryRepo.GetAllCategories();

    logi(tag, "Getting items...");
    const items = await this.itemRepo.GetAllItems();

    //* manipulate data (i love nesting)
    const result = {
      Trains: trains.map((train) => ({
        ...train,

        Admins: admins.filter((a) => a.TrainID === train.TrainID),

        Journeys: journeys
          .filter((j) => j.TrainID === train.TrainID)
          .map((journey) => ({
            ...journey,

            Tickets: tickets
              .filter((t) => t.JourneyID === journey.JourneyID)
              .map((ticket) => ({
                ...ticket,

                Orders: orders
                  .filter((o) => o.TicketID === ticket.TicketID)
                  .map((order) => ({
                    ...order,

                    OrderItems: orderItems.filter(
                      (oi) => oi.OrderID === order.OrderID,
                    ),
                  })),
              })),
          })),
      })),

      Deliveries: deliveries,

      Categories: categories.map((category) => ({
        ...category,
        Items: items.filter((i) => i.CategoryID === category.CategoryID),
      })),
    };

    const fname = `dbg-printall-${Date.now()}.json`;

    logi(tag, `Writing output: ${fname}`);
    writeFileSync(fname, JSON.stringify(result));

    logi(tag, "Closing!");
    this.lr.Close();
  };
}
