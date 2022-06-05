import "dotenv/config";
import { injectable } from "inversify";
import "reflect-metadata";
import { StoreService } from "./store.service";
const amqplib = require("amqplib");

interface IConsumerService {
  consume(): void;
}

@injectable()
export class ConsumerService implements IConsumerService {
  private readonly RABBITMQ_HOST = process.env.RABBITMQ_HOST;

  constructor(private store: StoreService) {}

  public async consume() {
    const queue = "tasks";
    const conn = await amqplib.connect(`amqp://${this.RABBITMQ_HOST}`);
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    ch1.consume(queue, (msg: any) => {
      if (msg !== null) {
        const { id, a, b } = JSON.parse(msg.content.toString());

        this.store.save({_id: id, sum: (a + b)});
        ch1.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  }
}
