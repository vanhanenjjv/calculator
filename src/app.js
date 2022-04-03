import express from "express";

import { addRouter } from "./routes/add/index.js";

const PORT = 8080;

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello, world!");
});

server.use("/add", addRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
