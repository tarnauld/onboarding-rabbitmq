import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post('/api/compute', (request, response) => {
  const {a, b} = request.body;
  response.send({value: a + b});
});

app.listen(port, () => {
  console.log(`Service B is listening on ${port}`);
});
