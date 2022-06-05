import { Result } from "@models/result";
import { injectable } from "inversify";
import mongoose from "mongoose";

interface IStoreService {
  save(result: Result): void;
  retrieve(id: string): Promise<Result>;
}

const Sum = new mongoose.Schema({
  _id: String,
  sum: Number,
});

const Result = mongoose.model("Sum", Sum);
const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PORT = process.env.MONGODB_PORT;

@injectable()
export class StoreService implements IStoreService {
  private readonly DATABASE_NAME = "onboarding-rabbitmq";

  constructor() {}

  public async retrieve(id: string): Promise<any> {
    mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${this.DATABASE_NAME}?authSource=admin`);
    return await Result.find({ _id: id });
  }

  public async save(result: Result): Promise<void> {
    mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${this.DATABASE_NAME}?authSource=admin`);

    const sum = new Result(result);
    sum.save().then(() => {
      console.info("Successfully saved result...");
    }).catch(() => {
      console.error("Already existing id, do nothing...");
    })
  }
}
