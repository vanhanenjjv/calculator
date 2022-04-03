import express from 'express'

import subtractRouter from './routes/subtract.js'

const PORT = 8080

const server = express()

server.use(express.json())

server.use('/subtract', subtractRouter)

server.get('/', (req, res) => {
  res.send('Hello, world!')
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
