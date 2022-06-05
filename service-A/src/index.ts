import "dotenv/config";
import 'reflect-metadata';
import express from "express";
import ProducerService from "@services/producer.service";
import axios from "axios";
import container from "@services/container.service";

const app = express();
const port = 3000;

app.use(express.json());

const SERVICE_B_HOST = process.env.SERVICE_B_HOST;
const SERVICE_B_PORT = process.env.SERVICE_B_PORT;

const producerService = container.resolve(ProducerService);

app.post("/api/commit", (req, res) => {
  producerService
    .commitMessage(req.body)
    .then((resolve) => {
      res.send(resolve);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get("/api/retrieve", (req, res) => {
  axios
    .get(
      `http://${SERVICE_B_HOST}:${SERVICE_B_PORT}/api/retrieve?id=${req.query.id}`
    )
    .then((response) => {
      res.send(response.data);
    }).catch(() => {
      res.sendStatus(404);
    });
});

app.listen(port, () => {
  console.log(`Service A is listening on port ${port}`);
});
