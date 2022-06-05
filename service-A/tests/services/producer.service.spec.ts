import ProducerService from "@services/producer.service";
import container from "@services/container.service";
const amqplib = require("amqplib");

describe("ProducerService", () => {
  let producerService: ProducerService;

  beforeEach(() => {
    producerService = container.resolve(ProducerService);
  });

  it("should connect to rabbitmq", async () => {
    jest.spyOn(amqplib, "connect").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          createChannel: jest.fn().mockReturnValue(
            new Promise((resolve, reject) => {
              resolve({
                sendToQueue: jest.fn(),
              });
            })
          ),
        });
      })
    );

    const transactionId = await producerService.commitMessage({ a: 5, b: 1 });
    expect(transactionId).toEqual({
      transactionId:
        "e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683",
    });
  });

  it("should not connect to rabbitmq", () => {
    expect.assertions(1);

    jest.spyOn(amqplib, "connect").mockReturnValue(
      new Promise((resolve, reject) => {
        reject();
      })
    );

    return producerService.commitMessage({ a: 5, b: 1 }).catch((e) => {
      expect(e.toString()).toMatch(
        "Error: Failed to send transaction to queue"
      );
    });
  });
});
