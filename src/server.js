import express from "express";

import { addRouter } from "./routes/add/index.js";
import multiply from "./routes/multiply.js";
import divide from './routes/divide.js'
import subtractRouter from './routes/subtract.js'

function defaultOptions() {
  return {
    silent: false
  }
}

function parseOptions(options) {
  if (options === undefined) return defaultOptions()
  return options
}

export default function createServer(port, options) {
  const { silent } = parseOptions(options)

  const server = express()

  server.use(express.json());

  server.use('/subtract', subtractRouter)
  server.use("/add", addRouter);
  server.use("/multiply", multiply);
  server.use('/divide', divide)

  server.listen(port, () => {
    if (!silent) console.log(`Listening on port ${port}`);
  });

  return server
}
