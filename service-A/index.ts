import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/commit", (req, res) => {
  const host = process.env.SERVICE_B_ADDR;
  const port = process.env.SERVICE_B_PORT;
  axios
    .post(`http://${host}:${port}/api/compute`, { a: 30, b: 20 })
    .then((response) => {
      res.send(response.data);
    });
});

app.listen(port, () => {
  console.log(`Service A is listening on port ${port}`);
});
