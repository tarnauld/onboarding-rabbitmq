import { Container } from "inversify";
import { ConsumerService } from "@services/consumer.service";
import { LoggerService } from "@services/logger.service";
import { StoreService } from "./store.service";

export class ContainerService {
  private _container = new Container();

  constructor() {
    this.container.bind<ConsumerService>(ConsumerService).to(ConsumerService);
    this.container.bind<LoggerService>(LoggerService).to(LoggerService);
    this.container.bind<StoreService>(StoreService).to(StoreService);
  }

  get container(): Container {
      return this._container;;
  }
}
