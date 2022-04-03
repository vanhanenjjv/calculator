import express from 'express'

import multiply from "./routes/multiply.js";

const PORT = 8080

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello, world!')
})


server.use("/multiply", multiply);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
