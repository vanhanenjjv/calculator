import express from "express";

import { addRouter } from "./routes/add/index.js";
import multiply from "./routes/multiply.js";
import divide from './routes/divide.js'
import subtractRouter from './routes/subtract.js'

const PORT = 8080;

const server = express();

server.use(express.json());

server.use('/subtract', subtractRouter)

server.get("/", (req, res) => {
  res.send("Hello, world!");
});

server.use("/add", addRouter);
server.use("/multiply", multiply);
server.use('/divide', divide)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
