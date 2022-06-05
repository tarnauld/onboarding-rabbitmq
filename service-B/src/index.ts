import "dotenv/config";
import { injectable } from "inversify";
import { ConsumerService } from "@services/consumer.service";
import { ContainerService } from "@services/container.service";
import express from "express";
import { StoreService } from "@services/store.service";

@injectable()
export class App {
  constructor(
    private consumerService: ConsumerService,
    private storeService: StoreService
  ) {}

  run() {
    this.consumerService.consume();

    const app = express();
    const port = process.env.PORT;
    app.use(express.json());

    app.get("/api/retrieve", (req, res) => {
      this.storeService
        .retrieve(req.query.id as string)
        .then((response) => {
          if (response.length > 0) {
            res.send(response[0]);
          } else {
            throw new Error("not found");
          }
        })
        .catch(() => {
          res.sendStatus(404);
        });
    });

    app.listen(port, () => {
      console.log(`Service B is listening on ${port}`);
    });
  }
}

const containerService = new ContainerService();
const app = containerService.container.resolve(App);
app.run();
