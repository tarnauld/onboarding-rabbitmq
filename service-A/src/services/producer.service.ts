import "dotenv/config";
import TransactionId from "@models/transaction-id";
import TransactionService from "./transaction.service";
import { injectable } from "inversify";
import { Payload } from "@models/payload";
const amqplib = require('amqplib');

@injectable()
export default class ProducerService {
  private readonly RABBITMQ_HOST = process.env.RABBITMQ_HOST;

  constructor(private readonly transactionService: TransactionService) {}

  public async commitMessage(message: Payload): Promise<TransactionId> {
    try {
      const queue = 'tasks';
      const conn = await amqplib.connect(`amqp://${this.RABBITMQ_HOST}`);
      const ch2 = await conn.createChannel();
      const hash = this.transactionService.digest((message.a + message.b).toString());
      const data = JSON.stringify({
        id: hash,
        ...message
      });
  
      ch2.sendToQueue(queue, Buffer.from(`${data}`));
  
      return {transactionId: hash};
    } catch {
      throw new Error("Failed to send transaction to queue");
    };
  }
}